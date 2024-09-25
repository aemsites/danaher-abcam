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
  { class: 'flex items-center gap-2 mb-4 cursor-pointer [&_*:empty+*]:hidden' },
  ul({ class: 'flex flex-wrap gap-2 empty:hidden' }),
  span(
    {
      class: 'shrink-0 text-xs font-semibold underline',
      onclick: () => {
        Object.keys(filterContainer).forEach((filt) => {
          for (let eachFilt = 0; eachFilt < filterContainer[filt].length; eachFilt += 1) {
            const filterInp = hub.querySelector(`#${filt}-${filterContainer[filt][eachFilt]}`);
            if (filterInp) filterInp.checked = false;
          }
        });
        filterContainer = {};
        // eslint-disable-next-line no-use-before-define
        handleChangeFilter(null, null, 'skip-filter');
      },
    },
    'Clear All',
  ),
);
const cardList = ul({ class: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-stretch' });

function handleRenderTags() {
  const tagsList = allSelectedTags.querySelector('ul');
  tagsList.innerHTML = '';
  if (Object.keys(filterContainer).length > 0) {
    Object.keys(filterContainer).forEach((filterArr) => {
      filterContainer[filterArr].forEach((filt) => {
        tagsList.append(li(
          {
            class: 'flex items-center capitalize gap-x-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded cursor-pointer',
            title: filt,
            onclick: (event) => {
              filterContainer[filterArr] = filterContainer[filterArr].filter((fl) => fl !== filt);
              if (filterContainer[filterArr].length === 0) delete filterContainer[filterArr];
              hub.querySelector(`#${filterArr}-${filt}`).checked = false;
              event.target.remove();
              // eslint-disable-next-line no-use-before-define
              handleChangeFilter(null, null, 'skip-filter');
            },
          },
          filt,
          span({ class: 'icon icon-close size-4 text-emerald-800' }),
        ));
      });
    });
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
    if (key in filterContainer) {
      if (filterContainer[key].includes(value)) {
        filterContainer[key] = filterContainer[key].filter((val) => val !== value);
        if (filterContainer[key].length === 0) delete filterContainer[key];
      } else filterContainer[key].push(value);
    } else if (key !== 'undefined' && value === 'undefined') {
      delete filterContainer[key];
    } else filterContainer[key] = [value];
    // newLists = lists.filter((list) => {
    //   if (Object.keys(filterContainer).length === 0) return true;
    //   return filterContainer[key].includes(list[key]);
    // });
    newLists = lists.filter((list) => {
      const x = Object.keys(filterContainer)
        .filter((item) => filterContainer[item].includes(list[item]));
      return Object.keys(filterContainer).length === x.length;
    });
  }
  handleRenderTags();
  handleRenderContent(newLists);
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
    const response = await ffetch('https://stage.lifesciences.danaher.com/us/en/products-index.json')
      .chunks(500)
      .all();
    lists = [...response];
    const hubFilters = div({ class: 'col-span-2 space-y-4' });
    createFilters({
      lists,
      filterNames,
      element: hubFilters,
      listActionHandler: handleChangeFilter,
    });

    const hubContent = div(
      { class: 'col-span-7' },
      allSelectedTags,
      cardList,
    );

    hub.append(
      div(
        { class: 'flex flex-col' },
        span({ class: 'text-xl leading-6 font-bold mb-4' }, 'Filter'),
        hubFilters,
      ),
      hubContent,
      div({ class: 'paginate' }),
    );
    handleRenderContent();
    main.append(hub);
  }
}
