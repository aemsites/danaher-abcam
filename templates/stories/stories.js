import ffetch from '../../scripts/ffetch.js';
import {
  div, li, span, ul,
} from '../../scripts/dom-builder.js';
import { buildBlock, decorateIcons, getMetadata } from '../../scripts/aem.js';
import { createCard, createFilters, imageHelper } from '../../scripts/scripts.js';
import { createPagination, getPageFromUrl } from '../../blocks/dynamic-cards/dynamic-cards.js';

let lists = [];
let filterContainer = {};
const hub = div({ class: 'hub grid grid-cols-12 gap-6' });
const allSelectedTags = div(
  { class: 'filter-content flex items-start md:items-center gap-2 mb-4 cursor-pointer' },
  span({ class: 'text-xs font-semibold text-[#07111299]' }, 'Filters:'),
  ul(
    { class: 'flex flex-wrap gap-2 [&_*:empty+*]:hidden' },
  ),
);
const clearAllEl = li(span(
  {
    class: 'shrink-0 text-xs font-semibold underline',
    // eslint-disable-next-line no-use-before-define
    onclick: () => handleResetFilters(),
  },
  'Clear All',
));
const cardList = ul({ class: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-stretch' });

function handleRenderTags() {
  const tagsList = allSelectedTags.querySelector('ul');
  tagsList.innerHTML = '';
  if (Object.keys(filterContainer).length > 0) {
    Object.keys(filterContainer).forEach((filterArr) => {
      filterContainer[filterArr].forEach((filt) => {
        tagsList.append(li(
          {
            class: 'flex items-center capitalize gap-x-1 text-xs text-[#378189] bg-[#EDF6F7] px-2 py-1 rounded cursor-pointer',
            title: filt,
            onclick: (event) => {
              const target = event.target.title ? event.target : event.target?.closest('li');
              hub.querySelector(`#${filterArr}-${filt}`).checked = false;
              // eslint-disable-next-line no-use-before-define
              handleChangeFilter(filterArr, target?.title);
              document.querySelector('.filter-content').remove();
            },
          },
          filt,
          span({ class: 'icon icon-close size-4 text-emerald-800' }),
        ));
      });
    });
    tagsList.append(clearAllEl);
    document.querySelector('.hub-center-content').prepend(allSelectedTags);
    decorateIcons(tagsList);
  }
}

function handleRenderContent(newLists = lists) {
  newLists.sort((card1, card2) => card2.publishDate - card1.publishDate);

  let page = parseInt(getPageFromUrl(), 10);
  page = Number.isNaN(page) ? 1 : page;
  const limitPerPage = 12;
  const start = (page - 1) * limitPerPage;
  const listsToDisplay = newLists.slice(start, start + limitPerPage);
  cardList.innerHTML = '';

  listsToDisplay.forEach((article, index) => {
    cardList.appendChild(createCard({
      titleImage: imageHelper(article.image, article.title, (index === 0)),
      title: article.title,
      description: article.description,
      footerLink: 'Watch Film',
      path: article.path,
    }));
  });
  const paginationElements = createPagination(newLists, page, limitPerPage);
  const paginateEl = hub.querySelector('.paginate');
  if (paginateEl) {
    paginateEl.innerHTML = '';
    paginateEl.append(paginationElements);
  }
}

function handleChangeFilter(key, value, mode) {
  let newLists = lists;
  if (mode !== 'skip-filter') {
    if (key !== 'undefined' && (value === 'undefined' || value === null)) {
      delete filterContainer[key];
    } else if (key in filterContainer) {
      if (filterContainer[key].includes(value)) {
        filterContainer[key] = filterContainer[key].filter((val) => val !== value);
        if (filterContainer[key].length === 0) delete filterContainer[key];
      } else filterContainer[key].push(value);
    } else filterContainer[key] = [value];
    newLists = lists.filter((list) => {
      return filterContainer[key] ? list.tags.includes(filterContainer[key]) : true;
    });
  }
  handleRenderTags();
  handleRenderContent(newLists);
}

function handleResetFilters() {
  Object.keys(filterContainer).forEach((filt) => {
    for (let eachFilt = 0; eachFilt < filterContainer[filt].length; eachFilt += 1) {
      const filterInp = hub.querySelector(`#${filt}-${filterContainer[filt][eachFilt]}`);
      if (filterInp) filterInp.checked = false;
    }
  });
  document.querySelector('.filter-content').remove();
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

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const sectionColumns = main.querySelector(':scope > div > div.columns')?.parentElement;
  if (sectionColumns) {
    const sectionMiddle = getMetadata('pagetags').includes('podcast')
      ? main.querySelector(':scope > div:nth-child(3)')
      : main.querySelector(':scope > div:nth-child(2)');
    sectionColumns.prepend(
      buildBlock('back-navigation', { elems: [] }),
    );
    sectionMiddle.classList.add(...'story-middle-container w-full'.split(' '));
    const sideLinksDiv = div({ class: 'sidelinks leading-5 text-sm font-bold text-black pb-4' }, 'Explore Our Products');
    main.querySelectorAll('p')?.forEach((paragraph) => {
      if (paragraph.querySelector('a[title="link"]')) {
        paragraph.classList.add(...'border-b border-b-gray-300 py-2 mx-0 w-auto mt-2'.split(' '));
        sideLinksDiv.append(span({ class: 'leading-5 text-normal font-medium text-[#378189]' }, paragraph));
      }
    });
    sectionMiddle.prepend(
      buildBlock('story-info', { elems: [] }),
      buildBlock('social-media', { elems: [] }),
      sideLinksDiv,
    );
  } else if (getMetadata('keywords').includes('all-stories')) {
    const filterNames = ['type', 'fullCategory'];
    let response = await ffetch('/en-us/stories/query-index.json')
      .chunks(500)
      .all();

    response = response.sort((item1, item2) => item1.title.localeCompare(item2.title));

    lists = [...response];
    const hubFilters = div({ class: 'col-span-2 space-y-4' });
    createFilters({
      lists,
      filterNames,
      element: hubFilters,
      listActionHandler: handleChangeFilter,
      clearFilterHandler: handleClearCategoryFilter,
    });

    const hubContent = div(
      { class: 'hub-center-content col-span-7' },
      cardList,
    );

    hub.append(
      div(
        { class: 'flex flex-col' },
        span({ class: 'w-full block md:hidden text-sm text-center font-semibold tracking-wide mb-4 p-3 border border-black rounded-full' }, 'Filter'),
        span({ class: 'hidden md:block text-xl leading-6 font-bold mb-4' }, 'Filter'),
        hubFilters,
      ),
      hubContent,
      div({ class: 'paginate' }),
    );
    handleRenderContent();
    main.append(hub);
  }
}
