import ffetch from '../../scripts/ffetch.js';
import { decorateIcons, toClassName } from '../../scripts/aem.js';
import { buildStoryHubSchema } from '../../scripts/schema.js';
import {
  button, div, p, span, ul, li, select, option
} from '../../scripts/dom-builder.js';
import { createFilters, formatDate } from '../../scripts/scripts.js';
import createCard from '../dynamic-cards/articleCard.js';
import { handleRenderContent } from '../story-hub/story-hub.js';

const getPageFromUrl = () => toClassName(new URLSearchParams(window.location.search).get('page')) || '';

function updateUrlWithParams(key, value, url) {
  const newUrl = new URL(url);
  if (key !== 'page') {  // Only handle filters excluding 'page'
    const values = newUrl.searchParams.get(key)?.split('|') || [];
    if (newUrl.searchParams.has('page')) newUrl.searchParams.set('page', '1');

    if (values.includes(value)) {
      newUrl.searchParams.set(key, values.filter((v) => v !== value).join('|') || '');
    } else {
      newUrl.searchParams.set(key, [...values, value].filter(Boolean).join('|'));
    }
    if (!newUrl.searchParams.get(key)) newUrl.searchParams.delete(key);
  } else {
    newUrl.searchParams.set(key, value);
    newUrl.searchParams.set('page', '1');
  }
  window.history.pushState(null, '', newUrl);
}

let lists = [];
let tempList = [];
let itemsPerPage;
//let sortBy = 'Relevance';  // Default sorting option

const hub = div();
const allSelectedTags = div(
  { class: 'w-fit flex flex-row-reverse items-start gap-2 mb-4 [&_*:empty+span]:hidden [&_*:empty]:mb-8' },
  ul({ class: 'inline-flex items-center flex-wrap gap-2 [&_.showmoretags.active~*:not(.clear-all)]:hidden md:[&_.showmoretags.active~*:not(.clear-all):not(.showlesstags)]:flex md:[&_.showmoretags~*:not(.showlesstags)]:flex' }),
  span({ class: 'text-xs font-semibold text-[#07111299]' }, 'Filters:'),
);
const clearAllEl = span({
  class: 'shrink-0 text-xs font-semibold underline cursor-pointer',
  onclick: async () => {
    // eslint-disable-next-line no-use-before-define
    await initiateRequest();
    // eslint-disable-next-line no-use-before-define
    handleResetFilters();
  },
}, 'Clear All');
const sortByDropdown = div({
  class: 'conatiner ml-auto' },
  select({ class: 'text-xs font-semibold text-[#07111299] bg-transparent border-none cursor-pointer',
    onchange: (e) => {
      handleSortChange(e.target.value);
    }
  },
  option({ value: 'relevance' }, 'Relevance'),
  option({ value: 'date-desc' }, 'Date Descending'),
  option({ value: 'date-asc' }, 'Date Ascending')
  ),
);
const hubDesktopFilters = div(
  { class: 'md:col-span-2 w-full h-screen md:h-auto fixed md:relative flex flex-col-reverse justify-end top-0 left-0 z-50 md:z-auto transition-all duration-150 -translate-y-full md:translate-y-0 [&_*:has(input:checked)~*_.clear-all]:block' },
  p(
    { class: 'relative flex flex-row justify-between items-center gap-x-2 px-4 md:px-0 py-2 md:py-0 my-0 text-black' },
    span({ class: 'text-lg md:text-xl leading-5 md:leading-5 font-normal md:font-bold mb-0 md:mb-4' }, 'Filters'),
    p(
      { class: 'flex md:hidden flex-row items-center gap-x-2 my-0' },
      span({
        class: 'clear-all hidden shrink-0 text-xs font-semibold underline cursor-pointer',
        onclick: async () => {
          // eslint-disable-next-line no-use-before-define
          await initiateRequest();
          // eslint-disable-next-line no-use-before-define
          handleResetFilters();
        },
      }, 'Clear All'),
      span({ class: 'icon icon-close size-8 invert p-1' }),
    ),
  ),
);
const cardList = ul({ class: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-6 md:gap-y-16 justify-items-stretch' });
const filterBackdrop = div({ class: 'h-screen fixed top-0 left-0 bg-white z-40 transition-all -translate-y-full' });

// function createSortByDropdown() {
//   const sortByLabel = span({ class: 'text-xs font-semibold text-[#07111299] ml-4' }, 'Sort By:');
//   const dropdown = select({
//     class: 'ml-2 bg-white text-gray-700 border border-gray-300 rounded-md text-xs',
//     onchange: (e) => {
//       sortBy = e.target.value;
//       console.log("Dropdown Changed, New Sort By:", sortBy);
//       handleSortContent();  // Trigger sorting and content update
//     }
//   });

//   const options = ['Relevance', 'Date Ascending', 'Date Descending'].map((optionText) =>
//     option(
//       { value: optionText, selected: optionText === sortBy },
//       optionText
//     )
//   );

//   dropdown.append(...options);
//   return div({ class: 'flex items-center' }, sortByLabel, dropdown);
// }

// function handleSortContent() {
//   console.log("Sort By:", sortBy);  // Debugging

//   if (sortBy === 'Relevance') {
//     tempList = [...lists];  // Keep the original order
//   } else if (sortBy === 'Date Ascending') {
//     tempList = [...lists].sort((listA, listB) => listA.publishDate - listB.publishDate);
//     console.log(tempList);
//   } else if (sortBy === 'Date Descending') {
//     tempList = [...lists].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
//   }

//   handleRenderContent(tempList);  // Ensure content gets updated
// }

function showMoreOrLessTags(mode) {
  const showmoretags = allSelectedTags.querySelector('.showmoretags');
  const showlesstags = allSelectedTags.querySelector('.showlesstags');
  if (mode === 'show-more-tags') {
    showmoretags.classList.remove('active');
    showmoretags.classList.add('hidden');
    showlesstags.classList.add('active');
    showlesstags.classList.remove('hidden');
  } else if (mode === 'show-less-tags') {
    showlesstags.classList.remove('active');
    showlesstags.classList.add('hidden');
    showmoretags.classList.add('active');
    showmoretags.classList.remove('hidden');
  }
}

const createPaginationLink = (page, label, current = false) => {
  const newUrl = new URL(window.location);
  newUrl.searchParams.set('page', page);
  const link = span(
    {
      onclick: () => {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page || label);
        window.history.pushState(null, '', url.toString());
        // eslint-disable-next-line no-use-before-define
        handleRenderContent(tempList);
      },
      class:
        'cursor-pointer font-medium text-sm leading-5 pt-4 px-4 items-center inline-flex hover:border-t-2 hover:border-gray-300 hover:text-gray-700',
    },
    label || page,
  );
  if (current) {
    link.setAttribute('aria-current', 'page');
    link.classList.add('text-danaherpurple-500', 'border-danaherpurple-500', 'border-t-2');
  } else {
    link.classList.add('text-danahergray-700');
  }
  return link;
};

const createPagination = (entries, page, limit) => {
  const paginationNav = document.createElement('nav');
  paginationNav.className = 'flex items-center justify-between border-t py-4 md:py-0 mt-8 md:mt-12';

  if (entries.length > limit) {
    const maxPages = Math.ceil(entries.length / limit);
    const paginationPrev = div({ class: 'flex flex-1 w-0 -mt-px' });
    const paginationPages = div({ class: 'hidden md:flex grow justify-center w-0 -mt-px' });
    const paginationNext = div({ class: 'flex flex-1 w-0 -mt-px justify-end' });

    if (page > 1) {
      paginationPrev.append(createPaginationLink(page - 1, '← Previous'));
    }
    for (let i = 1; i <= maxPages; i += 1) {
      if (i === 1 || i === maxPages || (i >= page - 2 && i <= page + 2)) {
        paginationPages.append(createPaginationLink(i, i, i === page));
      } else if (
        paginationPages.lastChild && !paginationPages.lastChild.classList.contains('ellipsis')
      ) {
        paginationPages.append(
          span(
            { class: 'ellipsis font-medium text-sm leading-5 pt-4 px-4 items-center inline-flex' },
            '...',
          ),
        );
      }
    }
    if (page < maxPages) {
      paginationNext.append(createPaginationLink(page + 1, 'Next →'));
    }

    paginationNav.append(paginationPrev, paginationPages, paginationNext);
  }
  const listPagination = div({ class: 'mx-auto' }, paginationNav);
  return listPagination;
};

function handleRenderTags() {
  const tagsList = allSelectedTags.querySelector('ul');
  tagsList.innerHTML = '';
  const params = new URLSearchParams(window.location.search);

  if (params.toString()) {
    let filterCount = 0;
    [...params.keys()].forEach((filterArr) => {
      if (filterArr !== 'page') { 
        const filterValues = params.get(filterArr)?.split('|') || [];
        filterValues.forEach((filt) => {
          filterCount += 1;
          tagsList.append(li(
            {
              class: 'flex items-center gap-x-1 text-xs text-[#378189] font-semibold bg-[#EDF6F7] px-2 py-1 rounded cursor-pointer capitalize',
              title: filt,
              onclick: () => {
                const selectedTag = allSelectedTags.querySelector(`ul li[title=${filt}]`);
                selectedTag.outerHTML = '';

                const updatedValues = filterValues.filter((value) => value !== filt).join('|');

                if (updatedValues) {
                  params.set(filterArr, updatedValues);
                } else {
                  params.delete(filterArr);
                }
                hub.querySelector(`#${filterArr}-${filt}`).checked = false;
                handleChangeFilter(filterArr, filt);
                window.history.pushState(null, '', `?${params.toString()}`);
              },
            },
            filt,
            span({ class: 'icon icon-tab-close size-4' }),
          ));
        });
      }
    });

    if (filterCount > 2) {
      tagsList.insertBefore(
        li({
          class: 'showmoretags active md:hidden flex items-center gap-x-1 text-xs text-[#378189] font-semibold bg-[#EDF6F7] px-2 py-1 rounded cursor-pointer capitalize',
          onclick: () => showMoreOrLessTags('show-more-tags'),
        }, `+${filterCount - 2}`),
        tagsList.childNodes[2],
      );
      tagsList.insertBefore(
        li({
          class: 'showlesstags md:hidden flex items-center gap-x-1 text-xs text-[#378189] font-semibold bg-[#EDF6F7] px-2 py-1 rounded cursor-pointer capitalize',
          onclick: () => showMoreOrLessTags('show-less-tags'),
        }, 'Show Less'),
        tagsList.childNodes[tagsList.children.length - 2],
      );
    }

    if (filterCount >= 1) tagsList.append(li({ class: 'clear-all' }, clearAllEl));
    decorateIcons(tagsList);
  }
}


// eslint-disable-next-line default-param-last
// function handleRenderContent(newLists = lists) {
//   newLists.sort((card1, card2) => card2.publishDate - card1.publishDate);
//   cardList.innerHTML = '';
//   let page = parseInt(getPageFromUrl(), 10);
//   page = Number.isNaN(page) ? 1 : page;
//   const start = (page - 1) * itemsPerPage;
//   const storiesToDisplay = newLists.slice(start, start + itemsPerPage);
//   storiesToDisplay.forEach((article, index) => {
//     cardList.appendChild(createCard(article, index === 0, 'webinar'));
//   });

//   const paginationElements = createPagination(newLists, page, itemsPerPage);
//   const paginateEl = hub.querySelector('.paginate');
//   if (paginateEl) {
//     paginateEl.innerHTML = '';
//     paginateEl.append(paginationElements);
//   }
// }

// function handleRenderContent(newLists = lists) {
//   console.log(newLists);
//  // console.log("Rendering Content: ", newLists);  // Debug the new sorted list
//   newLists.sort((card1, card2) => card2.publishDate - card1.publishDate);  // Sorting logic (can be omitted if already sorted in handleSortContent)
//   cardList.innerHTML = '';  // Clear the existing content

//   let page = parseInt(getPageFromUrl(), 10);
//   page = Number.isNaN(page) ? 1 : page;
//   const start = (page - 1) * itemsPerPage;
//   const storiesToDisplay = newLists.slice(start, start + itemsPerPage);
  
//   storiesToDisplay.forEach((article, index) => {
//     cardList.appendChild(createCard(article, index === 0, 'webinar'));
//   });

//   const paginationElements = createPagination(newLists, page, itemsPerPage);
//   const paginateEl = hub.querySelector('.paginate');
//   if (paginateEl) {
//     paginateEl.innerHTML = '';
//     paginateEl.append(paginationElements);
//   }
// }


function handleChangeFilter(key, value) {
  if ((key !== undefined && value !== 'undefined') && (value !== null || value === '') && typeof value === 'string') updateUrlWithParams(key, value, window.location.href);

  let newLists = lists;
  let storiesList = [];
  if (typeof value === 'string') {
    storiesList = lists;
    newLists = storiesList.filter((list) => {
      const params = new URLSearchParams(window.location.search);
      return [...params.keys()].every((filterKey) => {
        if (filterKey !== 'page') {
          const filterValues = params.get(filterKey)?.split('|') || [];
          return filterValues.some((val) => list.tags.includes(val));
        }
        return true;
      });
    });
  } else if (typeof value === 'object' && 'from' in value && 'to' in value) {
    newLists = lists.filter((list) => {
      const publishDate = list.publishDate * 1000;
      if (publishDate >= value.from && publishDate <= value.to) {
        return true;
      }
    });
    console.log(newLists);
  }
  
  handleRenderTags();
  tempList = newLists;
  handleRenderContent(newLists);
}

function handleResetFilters() {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  // Reset all checkboxes or filter inputs based on the current query parameters
  [...params.entries()].forEach(([key, values]) => {
    values.split('|').forEach((value) => {
      const filterInp = hub.querySelector(`#${key}-${value}`);
      if (filterInp) {
        filterInp.checked = false; // Uncheck the checkboxes or reset inputs
      }
    });
  });

  // Remove all query parameters from the URL (this will reset all filters)
  [...params.keys()].forEach((key) => {
    params.delete(key); // Remove each query parameter
  });
  window.history.replaceState(null, '', url.toString());
  handleChangeFilter('', ''); // Passing empty strings to reset all filters
}



function handleClearCategoryFilter(key) {
  const params = new URLSearchParams(window.location.search);

  (params.get(key)?.split('|') || []).forEach((filt) => {
    allSelectedTags.querySelector(`ul li[title="${filt}"]`)?.remove();
    const checkbox = hub.querySelector(`#${key}-${filt}`);
    if (checkbox instanceof HTMLInputElement && checkbox.type === 'checkbox') {
      checkbox.checked = false;
    }
  });

  params.delete(key);
  window.history.pushState(null, '', `?${params.toString()}`);
  handleChangeFilter(key, null);
}

function toggleMobileFilters(mode) {
  if (mode === 'open') {
    hubDesktopFilters.classList.remove('-translate-y-full');
    hubDesktopFilters.classList.add('w-screen');
    filterBackdrop.classList.add('w-screen');
    filterBackdrop.classList.remove('-translate-y-full');
  } else if (mode === 'close') {
    hubDesktopFilters.classList.add('-translate-y-full');
    hubDesktopFilters.classList.remove('w-screen');
    filterBackdrop.classList.remove('w-screen');
    filterBackdrop.classList.add('-translate-y-full');
  }
}

function handleSortChange(sortOption) {
  let sortedList = [...lists];
  // Sort by publish date
  if (sortOption === 'date-desc') {
    // Sort in descending order (most recent first)
    sortedList = sortedList.sort((a, b) => {
      const dateA = a.publishDate; // Convert timestamp (seconds) to milliseconds
      const dateB = b.publishDate; // Convert timestamp (seconds) to milliseconds
      return dateB - dateA; // For descending order
    });
  } else if (sortOption === 'date-asc') {
    // Sort in ascending order (oldest first)
    sortedList = sortedList.sort((a, b) => {
      const dateA = a.publishDate; // Convert timestamp (seconds) to milliseconds
      const dateB = b.publishDate; // Convert timestamp (seconds) to milliseconds
      console.log(dateA, dateB);
      return dateA - dateB; // For ascending order
    });
    console.log(sortedList);
  }
  tempList = sortedList;
  handleRenderContent(tempList);
}

async function initiateRequest() {
  let response = await ffetch('/en-us/webinars/query-index.json')
  .chunks(500)
  .all();
response = [...response].sort((x, y) => new Date(x.publishDate) - new Date(y.publishDate));
lists = [...response];
}

export default async function decorate(block) {
  if (block.children.length > 0) {
    const filterNames = block.querySelector(':scope > div > div > p')?.textContent?.split(',');
    itemsPerPage = block.querySelector(':scope > div:nth-child(2) > div > p')?.textContent;
    itemsPerPage = itemsPerPage ? Number(itemsPerPage) : 12;
    await initiateRequest();
    buildStoryHubSchema(lists);
    const allFilters = p({ class: 'h-5/6 mb-3 overflow-visible' });
    createFilters({
      lists,
      filterNames,
      dateRange: 'listed-within',
      element: allFilters,
      listActionHandler: async (categoryKey, categoryValue) => {
        console.log(categoryKey, categoryValue);
        await initiateRequest();
        handleChangeFilter(categoryKey, categoryValue);
      },
      clearFilterHandler: async (categoryKey) => {
        await initiateRequest();
        handleClearCategoryFilter(categoryKey);
      },
    });
    allSelectedTags.append(sortByDropdown);

    const hubContent = div(
      { class: 'col-span-9' },
      allSelectedTags,
      //createSortByDropdown(), // Add Sort By dropdown here
      cardList,
    );

    hubDesktopFilters.prepend(
      allFilters,
      p(
        { class: 'w-full fixed block md:hidden bottom-0 px-4 py-2 my-0 border-t' },
        button({
          class: 'w-full text-sm text-white font-semibold bg-[#378189] p-3 rounded-full',
          onclick: () => toggleMobileFilters('close'),
        }, 'View Results'),
      ),
    );
    hub.append(
      div(
        { class: 'hub grid grid-col-1 lg:grid-cols-12 gap-6' },
        div(
          { class: 'flex flex-col col-span-9 lg:col-span-3 w-full' },
          span(
            {
              class: 'w-full block md:hidden text-sm text-center font-semibold tracking-wide p-3 border border-black rounded-full',
              onclick: () => toggleMobileFilters('open'),
            },
            'Filter',
          ),
          hubDesktopFilters,
          filterBackdrop,
        ),
        hubContent,
      ),
      div({ class: 'paginate' }),
    );
    hubDesktopFilters.querySelector('.icon.icon-close').addEventListener('click', () => toggleMobileFilters('close'));
    handleRenderContent();
    decorateIcons(hub);

    const horizondalLine = div({ class: 'flex items-center justify-between border-t mb-8 md:py-0' });
    block.innerHTML = '';
    block.append(horizondalLine, hub);
  }
}