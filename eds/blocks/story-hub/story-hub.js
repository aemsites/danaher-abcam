import ffetch from '../../scripts/ffetch.js';
import { decorateIcons } from '../../scripts/aem.js';
import {
  button, div, p, span, ul, li,
} from '../../scripts/dom-builder.js';
import { createCard, createFilters, imageHelper } from '../../scripts/scripts.js';
import { getPageFromUrl } from '../dynamic-cards/dynamic-cards.js';

const excludedPages = [
  '/en-us/stories/films',
  '/en-us/stories/podcasts',
  '/en-us/stories/articles'
];
let lists = [];
let filterContainer = {};
const hub = div();
const allSelectedTags = div(
  { class: 'w-fit flex flex-row-reverse items-start gap-2 mb-4 [&_*:empty+span]:hidden' },
  ul({ class: 'inline-flex items-center flex-wrap gap-2 [&_.showmoretags.active~*:not(.clear-all)]:hidden md:[&_.showmoretags.active~*:not(.clear-all):not(.showlesstags)]:flex md:[&_.showmoretags~*:not(.showlesstags)]:flex' }),
  span({ class: 'text-xs font-semibold text-[#07111299]' }, 'Filters:'),
);
const clearAllEl = span({
  class: 'shrink-0 text-xs font-semibold underline cursor-pointer',
  // eslint-disable-next-line no-use-before-define
  onclick: () => handleResetFilters(),
}, 'Clear All');
const hubDesktopFilters = div(
  { class: 'md:col-span-2 w-full h-screen md:h-auto fixed md:relative flex flex-col-reverse justify-end top-0 left-0 z-50 md:z-auto transition-all duration-150 -translate-y-full md:translate-y-0 [&_*:has(input:checked)~*_.clear-all]:block' },
  p(
    { class: 'relative flex flex-row justify-between items-center gap-x-2 px-4 md:px-0 py-2 md:py-0 my-0 text-black' },
    span({ class: 'text-lg md:text-xl leading-5 md:leading-5 font-normal md:font-bold mb-0 md:mb-4' }, 'Filters'),
    p(
      { class: 'flex md:hidden flex-row items-center gap-x-2 my-0' },
      span({
        class: 'clear-all hidden shrink-0 text-xs font-semibold underline cursor-pointer',
        // eslint-disable-next-line no-use-before-define
        onclick: () => handleResetFilters(),
      }, 'Clear All'),
      span({ class: 'icon icon-close size-8 invert p-1' }),
    ),
  ),
);
const cardList = ul({ class: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-stretch' });
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

function handleRenderTags() {
  const tagsList = allSelectedTags.querySelector('ul');
  tagsList.innerHTML = '';
  if (Object.keys(filterContainer).length > 0) {
    let filterCount = 0;
    Object.keys(filterContainer).forEach((filterArr) => {
      filterContainer[filterArr].forEach((filt) => {
        filterCount += 1;
        tagsList.append(li(
          {
            class: 'flex items-center gap-x-1 text-xs text-[#378189] font-semibold bg-[#EDF6F7] px-2 py-1 rounded cursor-pointer capitalize',
            title: filt,
            onclick: () => {
              const selectedTag = allSelectedTags.querySelector(`ul li[title=${filt}]`);
              selectedTag.outerHTML = '';
              hub.querySelector(`#${filterArr}-${filt}`).checked = false;
              // eslint-disable-next-line no-use-before-define
              handleChangeFilter(filterArr, filt);
            },
          },
          filt,
          span({ class: 'icon icon-close size-4 text-emerald-800' }),
        ));
      });
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
        tagsList.childNodes[tagsList.children - 2],
      );
    }
    tagsList.append(li({ class: 'clear-all' }, clearAllEl));
    decorateIcons(tagsList);
  }
}

// eslint-disable-next-line default-param-last
function handleRenderContent(newLists = lists, page) {
  newLists.sort((card1, card2) => card2.publishDate - card1.publishDate);

  let pageNo = page || parseInt(getPageFromUrl(), 10);
  pageNo = Number.isNaN(pageNo) ? 1 : pageNo;
  const limitPerPage = 12;
  // const start = (pageNo - 1) * limitPerPage;
  // const listsToDisplay = newLists.slice(start, start + limitPerPage);
  cardList.innerHTML = '';

  newLists.forEach((article, index) => {
    let footerLink = '';
    const type = article.path.split('/')[3];
    switch (type) {
      case 'podcasts':
        footerLink = 'Listen to podcast';
        break;
      case 'films':
        footerLink = 'Watch film';
        break;
      default:
        footerLink = 'Read article';
        break;
    }

    cardList.appendChild(createCard({
      titleImage: imageHelper(article.image, article.title, (index === 0)),
      title: article.title,
      description: article.description,
      footerLink,
      path: article.path,
    }));
  });
  // const paginationElements = createPagination(newLists, page, limitPerPage);
  const paginateEl = hub.querySelector('.paginate');
  if (paginateEl) {
    paginateEl.innerHTML = '';
    // paginateEl.append(paginationElements);
  }
}

function handleChangeFilter(key, value, mode) {
  let newLists = lists;
  if (key === 'stories-type') {
    newLists = lists.filter((list) => (value
      ? list.tags.includes(value)
      : true));
    handleRenderContent(newLists, 1);
  } else {
    if (mode !== 'skip-filter') {
      if (key !== 'undefined' && (value === 'undefined' || value === null)) {
        delete filterContainer[key];
      } else if (key in filterContainer) {
        if (filterContainer[key].includes(value)) {
          filterContainer[key] = filterContainer[key].filter((val) => val !== value);
          if (filterContainer[key].length === 0) delete filterContainer[key];
        } else filterContainer[key].push(value);
      } else filterContainer[key] = [value];
      newLists = lists.filter((list) => (filterContainer[key]
        ? list.tags.includes(filterContainer[key])
        : true));
    }
    handleRenderTags();
    handleRenderContent(newLists);
  }
}

function handleResetFilters() {
  Object.keys(filterContainer).forEach((filt) => {
    for (let eachFilt = 0; eachFilt < filterContainer[filt].length; eachFilt += 1) {
      const filterInp = hub.querySelector(`#${filt}-${filterContainer[filt][eachFilt]}`);
      if (filterInp) filterInp.checked = false;
    }
  });
  filterContainer = {};
  // eslint-disable-next-line no-use-before-define
  handleChangeFilter(null, null, 'skip-filter');
}

function handleClearCategoryFilter(key) {
  filterContainer[key].forEach((filt) => {
    const selectedTag = allSelectedTags.querySelector(`ul li[title=${filt}]`);
    selectedTag.outerHTML = '';
    hub.querySelector(`#${key}-${filt}`).checked = false;
  });
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
  tabs.forEach((tab) => {
    if (tab.id === tabId) {
      tab.classList.add('active', 'border-b-8', 'border-[#ff7223]');
      handleChangeFilter(key, value);
    } else {
      tab.classList.remove('active', 'border-b-8', 'border-[#ff7223]');
    }
  });
}

export default async function decorate(block) {
  if (block.children.length > 0) {
    const filterNames = block.querySelector(':scope > div > div > p')?.textContent?.split(',');
    const response = await ffetch('/en-us/stories/query-index.json')
      .filter(({ path }) => {
        return !excludedPages.includes(path);
      })
      .chunks(500)
      .all();
    lists = [...response];
    const allFilters = p({ class: 'h-5/6 mb-3 overflow-visible' });
    createFilters({
      lists,
      filterNames,
      element: allFilters,
      listActionHandler: handleChangeFilter,
      clearFilterHandler: handleClearCategoryFilter,
    });

    const hubContent = div(
      { class: 'col-span-9' },
      allSelectedTags,
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
      });
      btn.innerHTML = tab.name;
      tabElement.appendChild(btn);
      btn.addEventListener('click', () => {
        toggleTabs(tab.tabId, tabElement);
      });
    });
    toggleTabs(tabs[0].tabId, tabElement);
    block.innerHTML = '';
    block.append(tabElement, horizondalLine, hub);
  }
}
