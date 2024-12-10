import { pagerController, searchResultListController, sourceFacetController } from '../../scripts/coveo/controller.js';
import coveoEngines from '../../scripts/coveo/engine.js';
import { a, button, div, img, input, label, p, span } from '../../scripts/dom-builder.js';

const { searchEngine } = coveoEngines;

function renderSearchContent() {
  const wrapper = div(
    { class: 'grid grid-cols-7 gap-x-2' },
    div({ class: 'col-span-2' }, 'Facets'),
    div(
      { id: 'search-results', class: 'col-span-5' },
      div({ class: 'space-y-4' }),
    ),
    div({ class: 'col-span-12 flex justify-between mt-10 pt-6 border-t border-[#DBDBDB]' }),
  );
  return wrapper;
}

function handleSearchResults(element) {
  const results = searchResultListController.state.results;
  const contentEl = element.querySelector('#search-results > div');
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
            'Compare'
          ),
        ),
        div(
          { class: 'flex flex-col gap-y-1' },
          span({ class: 'text-xs font-semibold text-[#65797C]' }, item.raw.urihash),
          span({ class: 'text-xl font-semibold' }, item.title),
          p(
            { class: 'space-x-4' },
            span({ class: 'text-xs font-semibold text-[#378189] bg-[#EDF6F7] p-2' }, item.raw.source),
            a({ class: 'text-[10px] font-medium text-black underline underline-offset-1' }, 'What is this?')
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
  const { currentPage, currentPages, hasNextPage, hasPreviousPage } = pagerController.state;
  const paginationEl = element.children[element.children.length - 1];
  paginationEl.innerHTML = '';

  const prevEl = button({
    class: `px-4 py-2 rounded-full tracking-wide hover:bg-gray-300/70 ${hasPreviousPage ? 'text-[#65797C] cursor-pointer': 'text-[#65697C] cursor-not-allowed'}`,
    disabled: hasPreviousPage,
    onclick: () => {
      if (hasPreviousPage) pagerController.previousPage();
    }
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
    class: `px-4 py-2 rounded-full tracking-wide hover:bg-gray-300/70 ${hasNextPage ? 'text-[#65797C] cursor-pointer': 'text-[#65697C] cursor-not-allowed'}`,
    onclick: () => {
      if (hasNextPage) pagerController.nextPage();
    }
  }, 'Next');
  if (!hasNextPage) nextEl.disabled = true;
  paginationEl.appendChild(nextEl);
}

function handleFilters(element) {
  const values = sourceFacetController.state.values;
  console.log(values);
}

export default function decorate(block) {
  const el = renderSearchContent();
  block.append(el);
  searchEngine.subscribe(() => {
    handleSearchResults(el);
    handlePagination(el);
    handleFilters(el);
  });
}
