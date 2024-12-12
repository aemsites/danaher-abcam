import {
  pagerController, searchResultListController,
  sortController, sourceFacetController,
} from '../../scripts/coveo/controller.js';
import coveoEngines from '../../scripts/coveo/engine.js';
import {
  a, button, div, img, input,
  label, p, span, select, option,
} from '../../scripts/dom-builder.js';
import { createNewFilters } from '../../scripts/scripts.js';

const { searchEngine } = coveoEngines;

function renderSearchContent() {
  const wrapper = div(
    { class: 'grid grid-cols-7 space-x-8' },
    div(
      { class: 'md:col-span-2 w-full h-screen md:h-auto fixed md:relative flex flex-col-reverse justify-end top-0 left-0 z-50 md:z-auto transition-all duration-150 -translate-y-full md:translate-y-0 [&_*:has(input:checked)~*_.clear-all]:block' },
      p({ class: 'h-5/6 mb-3 overflow-scroll md:overflow-visible z-[1]' }),
      p(
        { class: 'w-full fixed block md:hidden bottom-0 px-4 py-2 my-0 border-t z-[2]' },
        button({ class: 'w-full text-sm text-white font-semibold bg-[#378189] p-3 rounded-full' }, 'View Results'),
      ),
      p(
        { class: 'relative flex flex-row justify-between items-center gap-x-2 px-4 md:px-0 py-2 md:py-0 my-0 text-black' },
        span({ class: 'text-lg md:text-xl leading-5 md:leading-5 font-normal md:font-bold mb-0 md:mb-4' }, 'Filters'),
        p(
          { class: 'flex md:hidden flex-row items-center gap-x-2 my-0' },
          span({ class: 'clear-all hidden shrink-0 text-xs font-semibold underline cursor-pointer' }, 'Clear All'),
          span({ class: 'icon icon-close size-8 invert p-1' }),
        ),
      ),
    ),
    div(
      { id: 'search-results', class: 'col-span-5' },
      div({ class: 'flex justify-between mb-2' }),
      div({ class: 'space-y-4' }),
    ),
    div({ class: 'col-span-12 flex justify-between mt-10 pt-6 border-t border-[#DBDBDB]' }),
  );
  return wrapper;
}

function handleSearchResults(element) {
  const { results } = searchResultListController.state;
  const contentEl = element.querySelector('#search-results > div + div');
  contentEl.innerHTML = '';
  results.forEach((item) => {
    const itemEl = div(
      { class: 'flex md:flex-row gap-x-2 border rounded cursor-pointer' },
      div(
        { class: 'flex md:flex-row m-4 gap-x-6' },
        p(
          img({ class: 'w-20 h-full mb-2', src: '' }),
          label(
            { class: 'text-sm font-medium' },
            input({ type: 'checkbox', class: 'rounded' }),
            'Compare',
          ),
        ),
        div(
          { class: 'flex flex-col gap-y-1' },
          span({ class: 'text-xs font-semibold text-[#65797C]' }, item.raw.urihash),
          span({ class: 'text-xl font-semibold' }, item.title),
          p(
            { class: 'space-x-4' },
            span({ class: 'text-xs font-semibold text-[#378189] bg-[#EDF6F7] p-2' }, item.raw.source),
            a({ class: 'text-[10px] font-medium text-black underline underline-offset-1' }, 'What is this?'),
          ),
          p(
            { class: 'flex flex-row' },
          ),
        ),
      ),
    );
    contentEl.appendChild(itemEl);
  });
}

function handlePagination(element) {
  const {
    currentPage, currentPages, hasNextPage, hasPreviousPage,
  } = pagerController.state;
  const paginationEl = element.children[element.children.length - 1];
  paginationEl.innerHTML = '';

  const prevEl = button({
    class: `px-4 py-2 rounded-full tracking-wide hover:bg-gray-300/70 ${hasPreviousPage ? 'text-[#65797C] cursor-pointer' : 'text-[#65697C] cursor-not-allowed'}`,
    disabled: hasPreviousPage,
    onclick: () => {
      if (hasPreviousPage) pagerController.previousPage();
    },
  }, 'Previous');
  if (!hasPreviousPage) prevEl.disabled = true;
  paginationEl.appendChild(prevEl);

  const pages = div({ class: 'space-x-1' });
  currentPages.forEach((page) => {
    const pageEl = button({
      class: `px-4 py-2 rounded-full hover:bg-gray-300/70 cursor-pointer ${currentPage === page ? 'bg-gray-200' : ''}`,
      onclick: () => {
        if (currentPage !== page) pagerController.selectPage(page);
      },
    }, page.toString());
    if (page === pagerController.state.currentPage) pageEl.disabled = true;
    pages.appendChild(pageEl);
  });
  paginationEl.appendChild(pages);

  const nextEl = button({
    class: `px-4 py-2 rounded-full tracking-wide hover:bg-gray-300/70 ${hasNextPage ? 'text-[#65797C] cursor-pointer' : 'text-[#65697C] cursor-not-allowed'}`,
    onclick: () => {
      if (hasNextPage) pagerController.nextPage();
    },
  }, 'Next');
  if (!hasNextPage) nextEl.disabled = true;
  paginationEl.appendChild(nextEl);
}

function handleFilters(element) {
  const filtersEl = element.querySelector('div:first-child > p');
  filtersEl.innerHTML = '';
  const { facetId, values } = sourceFacetController.state;
  const tempArr = [{
    name: facetId,
    values: [...values],
    type: 'checkbox',
    search: true,
    clearFilter: false,
    collapse: true,
  }];
  // console.log(sourceFacetController.state, tempArr);
  // console.log(createFilters({ lists: filters, filterNames: [] }));
  createNewFilters({
    lists: tempArr,
    element: filtersEl,
    listActionHandler: (name, item, el) => {
      sourceFacetController.toggleSelect(item);
      el.checked = !el.checked;
    },
  });
}

function renderSort(element) {
  const sortEl = element.querySelector('#search-results > div');
  sortEl.innerHTML = '';

  const sortOptions = [
    { label: 'Relevancy', criterion: { by: 'relevancy' } },
    {
      label: 'Title',
      criterion: { by: 'field', field: 'title', order: 'ascending' },
    },
  ];

  const selectEl = select({
    class: 'text-sm font-medium text-[#071112] bg-[#273F3F0D] border border-[#273F3F0D] rounded-full px-4 py-2',
    onchange: (event) => {
      const selectedCriterion = JSON.parse(event.target.value);
      sortController.sortBy(selectedCriterion);
    },
  });
  sortOptions.forEach((list) => {
    const optionElement = option({ value: JSON.stringify(list.criterion) }, list.label);
    selectEl.appendChild(optionElement);
  });

  sortEl.appendChild(
    div(
      { class: 'flex items-center gap-x-2 ml-auto' },
      span({ class: 'text-xs font-semibold text-[#07111299]' }, 'Sort By:'),
      selectEl,
    ),
  );
}

export default function decorate(block) {
  const el = renderSearchContent();
  block.append(el);
  searchEngine.subscribe(() => {
    handleSearchResults(el);
    handlePagination(el);
    handleFilters(el);
    renderSort(el);
  });
}
