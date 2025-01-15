import ffetch from '../../scripts/ffetch.js';
import { decorateIcons, toClassName, getMetadata } from '../../scripts/aem.js';
import { buildStoryHubSchema } from '../../scripts/schema.js';
import {
  button, div, p, span, ul, li, select, option,
} from '../../scripts/dom-builder.js';
import { createFilters } from '../../scripts/scripts.js';
import createCard from '../dynamic-cards/articleCard.js';

const getPageFromUrl = () => toClassName(new URLSearchParams(window.location.search).get('page')) || '';

const template = getMetadata('template') || 'stories';

function updateUrlWithParams(key, value, url) {
  const newUrl = new URL(url);
  if (key !== 'stories-type') {
    const values = newUrl.searchParams.get(key)?.split('|') || [];
    if (newUrl.searchParams.has('page')) newUrl.searchParams.set('page', '1');

    if (values.includes(value)) {
      newUrl.searchParams.set(key, values.filter((v) => v !== value).join('|') || '');
    } else {
      newUrl.searchParams.set(key, [...values, value].filter(Boolean).join('|'));
    }
    if (key !== 'stories-type' && !newUrl.searchParams.get(key)) newUrl.searchParams.delete(key);
  } else {
    newUrl.searchParams.set(key, value);
    newUrl.searchParams.set('page', '1');
  }
  window.history.pushState(null, '', newUrl);
}

const excludedPages = [
  '/en-us/stories/films',
  '/en-us/stories/podcasts',
  '/en-us/stories/articles',
];
let lists = [];
let tempList = [];
let itemsPerPage;

const hub = div();
const allSelectedTags = div(
  { class: 'w-fit flex flex-row-reverse items-center gap-2 [&_*:empty+span]:hidden mb-6 md:mb-0' },
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
const sortByContainer = div(
  { class: 'w-full md:w-auto flex items-center ml-auto' },
  span({ class: 'text-xs font-semibold text-[#07111299] mr-2 shrink-0' }, 'Sort By:'),
  select(
    {
      class: 'w-full md:w-auto py-2 px-2 tracking-[0.2px] leading-4 text-sm bg-[#273F3F] bg-opacity-5 rounded-full',
      onchange: (e) => {
        // eslint-disable-next-line no-use-before-define
        handleSortChange(e.target.value);
      },
    },
    option({ value: 'relevance' }, 'Relevance'),
    option({ value: 'date-descending' }, 'Date Descending'),
    option({ value: 'date-ascending' }, 'Date Ascending'),
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

function handleSortChange(sortOption) {
  const newLists = [...lists];
  switch (sortOption) {
    case 'date-descending':
      newLists.sort((a, b) => b.publishDate - a.publishDate);
      break;
    case 'date-ascending':
      newLists.sort((a, b) => a.publishDate - b.publishDate);
      break;
    default:
      break;
  }
  // eslint-disable-next-line no-use-before-define
  handleRenderContent(newLists, false);
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
        handleRenderContent(lists);
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
      if (filterArr !== 'stories-type' && filterArr !== 'page') {
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
                // eslint-disable-next-line no-use-before-define
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
function handleRenderContent(newLists = lists, enableSort = true) {
  if (enableSort) newLists.sort((card1, card2) => card2.publishDate - card1.publishDate);
  cardList.innerHTML = '';
  let page = parseInt(getPageFromUrl(), 10);
  page = Number.isNaN(page) ? 1 : page;
  const start = (page - 1) * itemsPerPage;
  const storiesToDisplay = newLists.slice(start, start + itemsPerPage);
  const isWebinar = template; // Assuming template is already defined

  storiesToDisplay.forEach((article, index) => {
    cardList.appendChild(createCard(article, index === 0, isWebinar ? 'webinar' : ''));
  });

  const paginationElements = createPagination(newLists, page, itemsPerPage);
  const paginateEl = hub.querySelector('.paginate');
  if (paginateEl) {
    paginateEl.innerHTML = '';
    paginateEl.append(paginationElements);
  }
}

function handleChangeFilter(key, value) {
  if ((key !== undefined && value !== 'undefined') && (value !== null || value === '') && typeof value === 'string') { updateUrlWithParams(key, value, window.location.href); }

  let newLists = lists;
  let storiesList = [];
  if (typeof value === 'string') {
    if (key === 'stories-type' && (value !== null || value !== '' || value !== 'undefined')) {
      storiesList = lists.filter((list) => (value
        ? list.tags.includes(value)
        : true));
    } else storiesList = lists;
    newLists = storiesList.filter((list) => {
      const params = new URLSearchParams(window.location.search);
      return [...params.keys()].every((filterKey) => {
        if (filterKey !== 'page') {
          const filterValues = params.get(filterKey)?.split('|') || [];
          return filterValues.some((val) => (filterKey === 'stories-type' && val === '') || list.tags.includes(val));
        }
        return true;
      });
    });
  } else if (typeof value === 'object' && 'from' in value && 'to' in value) {
    newLists = lists.filter((list) => {
      const publishDate = list.publishDate * 1000;
      return publishDate >= value.from && publishDate <= value.to;
    });
  }
  handleRenderTags();
  tempList = newLists;
  handleRenderContent(newLists);
}

function handleResetFilters() {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  [...params.entries()].forEach(([key, values]) => {
    values.split('|').forEach((value) => {
      const filterInp = hub.querySelector(`#${key}-${value}`);
      if (filterInp) filterInp.checked = false;
    });
  });
  if (params.has('stories-type')) {
    [...params.keys()].forEach((k) => {
      if (k !== 'stories-type') {
        params.delete(k);
      }
    });
  }
  window.history.replaceState(null, '', url.toString());
  // eslint-disable-next-line no-use-before-define
  handleChangeFilter('stories-type', params.has('stories-type') ? params.get('stories-type') : '');
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

function toggleTabs(tabId, tabElement) {
  const tabs = tabElement.querySelectorAll('.tab');
  const [key, value] = tabId.split('/');
  handleChangeFilter(key, value);
  tabs.forEach((tab) => {
    if (tab.id === tabId) {
      tab.classList.add('active', 'border-b-8', 'border-[#ff7223]');
    } else {
      tab.classList.remove('active', 'border-b-8', 'border-[#ff7223]');
    }
  });
}

async function initiateRequest() {
  let response = await ffetch(`/en-us/${template}/query-index.json`)
    .filter(({ path }) => !excludedPages.includes(path))
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
    const allFilters = p({ class: 'h-5/6 mb-3 overflow-scroll md:overflow-visible z-[1]' });
    createFilters({
      lists,
      filterNames,
      dateRange: 'listed-within',
      element: allFilters,
      listActionHandler: async (categoryKey, categoryValue) => {
        await initiateRequest();
        handleChangeFilter(categoryKey, categoryValue);
      },
      clearFilterHandler: async (categoryKey) => {
        await initiateRequest();
        handleClearCategoryFilter(categoryKey);
      },
    });

    const hubContent = div(
      { class: 'col-span-9' },
      div({ class: 'w-full flex flex-col md:flex-row mb-4' }, allSelectedTags, (template === 'webinars') ? sortByContainer : ''),
      cardList,
    );

    hubDesktopFilters.prepend(
      allFilters,
      p(
        { class: 'w-full fixed block md:hidden bottom-0 px-4 py-2 my-0 border-t z-[2]' },
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

    if (template === 'stories') {
      const horizondalLine = div({ class: 'flex items-center justify-between border-t mb-8 md:py-0' });
      const tabElement = div({ class: 'font-semibold text-base text-black md:block flex' });
      const tabs = [
        { name: 'All stories', tabId: 'stories-type/' },
        { name: 'Community stories', tabId: 'stories-type/community' },
        { name: 'Product stories', tabId: 'stories-type/products' },
      ];
      tabs.forEach((tab) => {
        const btn = button({
          class: 'tab md:py-1.5 pb-4 mr-8 active border-b-8 border-[#ff7223]',
          id: tab.tabId,
          onclick: async () => {
            await initiateRequest();
            toggleTabs(tab.tabId, tabElement);
          },
        }, tab.name);
        tabElement.appendChild(btn);
      });
      block.innerHTML = '';
      block.append(tabElement, horizondalLine, hub);
      const params = new URLSearchParams(window.location.search);
      if (params.get('stories-type') === '' || params.get('stories-type') === null) toggleTabs(tabs[0].tabId, tabElement);
      [...params.entries()].forEach(([key, values]) => {
        if (key === 'stories-type') {
          toggleTabs(`${key}/${values}`, tabElement);
        }
        if (key !== 'page') {
          values.split('|').forEach((value) => {
            const filterInp = hub.querySelector(`#${key}-${value}`);
            if (filterInp) filterInp.checked = true;
          });
        }
      });
    } else {
      block.innerHTML = '';
      block.append(hub);
    }
  }
}
