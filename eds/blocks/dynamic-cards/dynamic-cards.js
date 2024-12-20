import ffetch from '../../scripts/ffetch.js';
import {
  ul, a, div, span,
} from '../../scripts/dom-builder.js';

import { getMetadata, toClassName } from '../../scripts/aem.js';
import createArticleCard from './articleCard.js';
import { applyClasses } from '../../scripts/scripts.js';
import { buildCollectionSchema } from '../../scripts/schema.js';

let title;

const getSelectionFromUrl = () => (window.location.pathname.indexOf(`/${title}/`) > -1 ? toClassName(window.location.pathname.replace('.html', '').split('/').pop()) : '');
export const getPageFromUrl = () => toClassName(new URLSearchParams(window.location.search).get('page')) || '';

const createTopicUrl = (currentUrl, keyword = '') => {
  if (currentUrl.indexOf(`/${title}/`) > -1) {
    return currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1) + toClassName(keyword).toLowerCase();
  }
  return `${currentUrl.replace('.html', '')}/${toClassName(keyword).toLowerCase()}`;
};

const patchBannerHeading = () => {
  document.querySelector('body .title-card h1').textContent = getMetadata('heading');
  document.querySelector('body .title-card p:last-child').textContent = getMetadata('description');
  document.title = `${getMetadata('heading')} | ${getMetadata('title')}`;
};

const createPaginationLink = (page, label, current = false) => {
  const newUrl = new URL(window.location);
  newUrl.searchParams.set('page', page);
  const link = a(
    {
      href: newUrl.toString(),
      class:
        'font-medium text-sm leading-5 pt-4 px-4 items-center inline-flex hover:border-t-2 hover:border-gray-300 hover:text-gray-700',
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

export const createPagination = (entries, page, limit) => {
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

export function createFilters(articles, viewAll = false) {
  // collect tag filters
  const allKeywords = articles.map((item) => {
    const category = item?.tags?.split(',');
    const allTags = category.map((cat) => cat?.split('/')?.pop()?.replace(/-/g, ' '));
    return allTags;
  });

  const keywords = new Set([].concat(...allKeywords));
  keywords.delete('');

  // render tag cloud
  const newUrl = new URL(window.location);
  newUrl.searchParams.delete('page');

  const index = window.location.pathname.indexOf(title);
  if (index > -1) {
    newUrl.pathname = window.location.pathname.substring(0, index + title.length);
  }

  const tags = viewAll ? div(
    { class: 'flex flex-wrap gap-2 gap-y-0 mb-4' },
    a(
      {
        class:
          'text-center my-2 inline-block border-[1px] rounded-full border-black px-4 py-0.5 font-semibold text-black bg-white hover:text-white hover:bg-black',
        href: newUrl.toString(),
      },
      'View All',
    ),
  ) : div({ class: 'flex flex-wrap gap-2 gap-y-0 mb-4' });

  [...keywords].sort().forEach((keyword) => {
    let currentUrl;
    if (viewAll) {
      currentUrl = window.location.pathname;
    } else {
      currentUrl = window.location.pathname.split('/');
      currentUrl.pop();
      currentUrl = currentUrl.join('/');
    }
    newUrl.pathname = createTopicUrl(currentUrl, keyword);
    const tagAnchor = a(
      {
        class:
          'text-center my-2 inline-block border-[1px] rounded-full border-black px-4 py-0.5 font-semibold text-black bg-white hover:text-white hover:bg-black capitalize',
        href: newUrl.toString(),
      },
      keyword,
    );
    tags.append(tagAnchor);
  });
  [...tags.children].forEach((tag) => {
    const url = new URL(tag.href);
    if (url.pathname === window.location.pathname) {
      tag.classList.add('!bg-black', '!text-white');
      tag.setAttribute('aria-current', 'tag');
    } else {
      tag.classList.add('text-black', 'bg-white');
    }
  });

  // patch banner heading with selected tag only on topics pages
  if (getMetadata('heading') && window.location.pathname.split('/')?.pop() !== 'knowledge-center') {
    patchBannerHeading();
  }

  return tags;
}

export default async function decorate(block) {
  title = block.querySelector('div:first-child')?.textContent?.trim();
  // fetch and sort all articles
  const articles = await ffetch(`/en-us/${title}/query-index.json`)
    .filter((item) => item.tags !== '')
    .chunks(500)
    .all();
  let filteredArticles = articles;
  const activeTagFilter = getSelectionFromUrl();
  if (activeTagFilter) {
    filteredArticles = articles.filter(
      (item) => toClassName(item.tags).toLowerCase().indexOf(activeTagFilter) > -1,
    );
  }
  // render cards application style
  filteredArticles.sort((card1, card2) => card2.publishDate - card1.publishDate);
  buildCollectionSchema(filteredArticles);

  let page = parseInt(getPageFromUrl(), 10);
  page = Number.isNaN(page) ? 1 : page;
  const limitPerPage = 9;
  const start = (page - 1) * limitPerPage;
  const articlesToDisplay = filteredArticles.slice(start, start + limitPerPage);

  const cardList = ul({
    class:
        'container grid max-w-7xl w-full mx-auto gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0 justify-items-center mt-3 mb-3',
  });
  articlesToDisplay.forEach((article, index) => {
    cardList.appendChild(createArticleCard(article, index === 0, 'topic'));
  });

  // render pagination and filters
  const filterTags = createFilters(articles, true);
  const paginationElements = createPagination(filteredArticles, page, limitPerPage);
  block.innerHTML = '';
  applyClasses(block, 'mx-auto pt-8');
  block.append(filterTags, cardList, paginationElements);
}
