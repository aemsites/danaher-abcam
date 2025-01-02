import {
  pagerController, searchResultListController,
  sortController, sourceFacetController,
} from '../../scripts/coveo/controller.js';
import coveoEngines from '../../scripts/coveo/engine.js';
import {
  a, button, div, img, input, label, p, span, h3,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
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
      div({ class: 'flex items-center justify-end mb-6' }),
      div({ class: 'space-y-4' }),
    ),
    div({ class: 'col-span-12 flex justify-center gap-2 mt-10 pt-6 border-t border-[#DBDBDB]' }),
  );
  decorateIcons(wrapper);
  return wrapper;
}

function getStarRating(rating, starParent, size = 'size-4') {
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 5; i++) {
    const spanEl = span();
    if (i <= rating) {
      spanEl.classList.add('icon', 'icon-star-rating', size, 'h-auto');
    } else {
      spanEl.classList.add('icon', 'icon-star-rating-empty', size, 'h-auto');
    }
    decorateIcons(spanEl);
    starParent.append(spanEl);
  }
  return starParent;
}

function handleSearchResults(element) {
  const { results } = searchResultListController.state;
  const contentEl = element.querySelector('#search-results > div + div');
  contentEl.innerHTML = '';

  results.forEach((item) => {
    const imgsJson = JSON.parse(item.raw.imagesjson);

    const reviewsSummaryJson = JSON.parse(item.raw.reviewssummaryjson);

    imgsJson.find((imge) => {
      const fullImageUrl = `https://content.abcam.com/${imge.seoUrl}`;

      const itemEl = div(
        { class: 'flex md:flex-row border rounded' },
        div(
          { class: 'flex md:flex-row py-4 pl-6 pr-8 gap-x-6 w-3/4' },
          p(
            { class: 'm-0 relative' },
            img({ class: 'w-28 h-32 mb-6 object-cover', src: fullImageUrl }),
            span({ class: 'text-xs bg-black px-2 py-1 rounded-tl rounded-br text-white absolute right-0 top-28' }, imgsJson.length, ' ', 'Images'),
            label(
              { class: 'flex gap-3.5 items-center text-sm font-medium' },
              input({ type: 'checkbox', class: 'w-5 h-5 rounded font-bold border-4' }),
              'Compare',
            ),
          ),
          div(
            { class: 'flex flex-col gap-y-1' },
            span({ class: 'text-xs lowercase font-bold text-[#65797C]' }, item.raw.productcode),
            span({ class: 'text-xl font-semibold' }, item.title),
            p(
              { class: 'space-x-4' },
              item.raw.producttags && (
                (Array.isArray(item.raw.producttags) && item.raw.producttags.length > 0)
                || (typeof item.raw.producttags === 'string'
                  && item.raw.producttags.trim().length > 0)
              ) ? span(
                  { class: 'text-xs font-semibold text-[#378189] bg-[#EDF6F7] p-2' },
                  (() => {
                    if (Array.isArray(item.raw.producttags)) {
                      return item.raw.producttags.join(', ');
                    } if (typeof item.raw.producttags === 'string') {
                      return item.raw.producttags.split(',').join(', ');
                    }
                    return '';
                  })(),
                ) : '',
              a({ class: 'text-[10px] font-medium text-black underline underline-offset-1' }, 'What is this?'),
            ),
            p(
              { class: 'flex items-center space-x-4' },
              span(
                { class: 'flex text-xs items-center' },
                span({ class: 'text-sm text-black font-medium mr-2' }, reviewsSummaryJson.aggregatedRating),
                getStarRating(reviewsSummaryJson.aggregatedRating, span({ class: 'flex gap-1' })),
                span(
                  { class: 'text-[13px] text-[#378089] underline font-normal ml-2' },
                  `(${reviewsSummaryJson.numberOfReviews} Reviews)`,
                ),
              ),
              span({ class: 'text-[#D8D8D8]' }, '|'),
              span({ class: 'text-[13px] text-[#378089] underline font-normal' }, item.raw.numpublications, ' ', 'Publications'),
              span({ class: 'text-[#D8D8D8]' }, '|'),
              a({ class: 'text-[13px] text-[#378089] underline', href: '#' }, 'Quick View'),
            ),

            div(
              { class: 'flex gap-3.5 items-center' },
              p({ class: 'text-[#65797C] text-xs font-medium m-0 w-24 flex-shrink-0' }, 'Target'),
              p({ class: 'text-sm font-medium m-0' }, item.raw.target),
            ),

            div(
              { class: 'flex gap-3.5 items-center mt-1' },
              p({ class: 'text-[#65797C] text-xs font-medium m-0 w-24 flex-shrink-0' }, 'Applications'),
              p(
                { class: 'text-sm font-medium m-0' },
                (() => {
                  if (Array.isArray(item.raw.reactivityapplications)) {
                    return item.raw.reactivityapplications.join(', ');
                  } if (typeof item.raw.reactivityapplications === 'string') {
                    return item.raw.reactivityapplications.split(',').join(', ');
                  }
                  return '';
                })(),
              ),
            ),
            div(
              { class: 'flex gap-3.5 mt-1' },
              p({ class: 'text-[#65797C] text-xs font-medium m-0 !w-24 flex-shrink-0' }, 'Reactivity'),
              p(
                { class: 'text-sm font-medium m-0 w-full' },
                (() => {
                  if (Array.isArray(item.raw.reactivityspecies)) {
                    return item.raw.reactivityspecies.join(', ');
                  } if (typeof item.raw.reactivityspecies === 'string') {
                    return item.raw.reactivityspecies.split(',').join(', ');
                  }
                  return '';
                })(),
              ),
            ),
            div(
              { class: 'flex gap-3.5 items-center mt-1' },
              p({ class: 'text-[#65797C] text-xs font-medium m-0 w-24 flex-shrink-0' }, 'Host Species'),
              p({ class: 'text-sm font-medium m-0' }, item.raw.hostspecies),
            ),
          ),
        ),
        div(
          { class: 'bg-[#edf6f7] p-6 w-1/4' },
          h3({ class: 'text-2xl font-bold m-0' }, 'US$ 530.00'),
          p({ class: 'text-xs font-normal m-0' }, '(excl. VAT)'),
          p({ class: 'text-xs font-normal mt-4 mb-0' }, '100mL'),
          p(
            { class: 'mt-4 mb-0' },
            span({ class: 'text-xs font-bold' }, 'In Stock'),
            span({}, ' | '),
            span({ class: 'text-xs font-normal' }, 'Next Day Delivery'),
          ),
          p(
            { class: 'mt-4 mb-0' },
            a(
              { class: 'flex gap-2 items-center text-sm text-[#378089] font-bold mt-4', href: '#' },
              'View Product',
              span({ class: 'icon icon-arrow-right text-[#378089]' }),
            ),
          ),
        ),
      );
      contentEl.appendChild(itemEl);
      decorateIcons(itemEl);
      return true;
    });
  });
}

function handlePagination(element) {
  const {
    currentPage, currentPages, hasNextPage, hasPreviousPage,
  } = pagerController.state;
  const paginationEl = element.children[element.children.length - 1];
  paginationEl.innerHTML = '';

  const prevEl = button(
    {
      class: `flex items-center justify-center text-base w-12 h-12 rounded-full tracking-wide hover:bg-gray-300/70 ${hasPreviousPage ? 'text-[#65797C] cursor-pointer' : 'text-[#65697C] cursor-not-allowed'}`,
      // disabled: hasPreviousPage,
      onclick: () => {
        if (hasPreviousPage) pagerController.previousPage();
      },
    },
    span({ class: 'icon icon-chevron-right rotate-180' }),
  );
  if (!hasPreviousPage) prevEl.disabled = true;
  paginationEl.appendChild(prevEl);
  decorateIcons(prevEl);
  const pages = div({ class: 'flex gap-2 space-x-1' });
  currentPages.forEach((page) => {
    const pageEl = button({
      class: `w-12 h-12 rounded-full hover:bg-gray-300/70 cursor-pointer ${currentPage === page ? 'bg-gray-200' : ''}`,
      onclick: () => {
        if (currentPage !== page) pagerController.selectPage(page);
      },
    }, page.toString());
    if (page === pagerController.state.currentPage) pageEl.disabled = true;
    pages.appendChild(pageEl);
  });
  paginationEl.appendChild(pages);

  const nextEl = button(
    {
      class: `flex items-center justify-center text-base w-12 h-12 rounded-full tracking-wide hover:bg-gray-300/70 ${hasNextPage ? 'text-[#65797C] cursor-pointer' : 'text-[#65697C] cursor-not-allowed'}`,
      onclick: () => {
        if (hasNextPage) pagerController.nextPage();
      },
    },
    span({ class: 'icon icon-chevron-right' }),
  );
  if (!hasNextPage) nextEl.disabled = true;
  paginationEl.appendChild(nextEl);
  decorateIcons(nextEl);
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
  createNewFilters({
    lists: tempArr,
    element: filtersEl,
    listActionHandler: (item) => sourceFacetController.toggleSelect(item),
  });
}

function renderSort(element) {
  const sortElement = element.querySelector('#search-results > div');
  const sortTitle = p({ class: 'text-xs text-[#07111299] mr-4 !my-0' }, 'Sort By:');
  sortElement.innerHTML = '';
  const sortOptions = [
    { label: 'Relevance', criterion: { by: 'relevance' } },
    {
      label: 'Title',
      criterion: { by: 'field', field: 'title', order: 'ascending' },
    },
    {
      label: 'Most Publications',
      criterion: { by: 'field', field: 'target', order: 'ascending' },
    },
    {
      label: 'Most Images',
      criterion: { by: 'field', field: 'title', order: 'ascending' },
    },
    {
      label: 'Top Rated',
      criterion: { by: 'field', field: 'title', order: 'ascending' },
    },
    {
      label: 'Price: High to Low',
      criterion: { by: 'field', field: 'title', order: 'ascending' },
    },
    {
      label: 'Price: Low to High',
      criterion: { by: 'field', field: 'title', order: 'ascending' },
    },
  ];
  const dropdownContainer = div({ class: 'relative inline-block text-left' });

  const dropdownButton = button(
    { class: 'w-36 h-10 font-semibold text-[#071112] text-sm flex item-center justify-between gap-2 py-2.5 px-6 bg-[#273F3F0D] rounded-3xl outline-none' },
    'Relevance',
  );
  dropdownContainer.appendChild(dropdownButton);
  const dropdownMenu = div({ class: 'absolute w-36 rounded-lg py-4 right-0 z-10 mt-1 bg-white border border-gray-300 shadow-lg' });
  dropdownMenu.style.display = 'none';
  let selectedName = 'Relevance';
  sortOptions.forEach((option) => {
    const optionElement = div({ class: 'text-black cursor-pointer font-semibold px-4 py-3 text-xs text-[#071112] hover:bg-[#273F3F0D]' });
    optionElement.innerText = option.label;
    if (
      sortController.state.sortCriteria.includes(option.label.toLowerCase())
    ) {
      selectedName = option.label;
    }
    optionElement.addEventListener('click', () => {
      dropdownMenu.style.display = 'none';
      const selectedCriterion = option.criterion;
      sortController.sortBy(selectedCriterion);
    });
    dropdownMenu.appendChild(optionElement);
  });

  dropdownButton.innerText = selectedName;
  dropdownButton.append(span({ class: 'icon icon-chevron-down' }));
  dropdownButton.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
  });

  dropdownContainer.appendChild(dropdownMenu);
  sortElement.append(sortTitle);
  sortElement.appendChild(dropdownContainer);
  decorateIcons(dropdownContainer);
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
