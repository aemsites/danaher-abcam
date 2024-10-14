import ffetch from '../../scripts/ffetch.js';
import { imageHelper, getStoryType } from '../../scripts/scripts.js';
import {
  ul, li, p, a, div, h3, span,
} from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';

function createCard(article, firstCard = false) {
  const cardTitle = article.title.indexOf('| Danaher Life Sciences') > -1
    ? article.title.split('| Danaher Life Sciences')[0]
    : article.title;

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

  const tags = '';
  let minRead;
  switch (getStoryType(tags)) {
    case 'podcast':
      minRead = ` | ${article.readingTime} mins listen`;
      break;
    case 'film':
      minRead = ` | ${article.readingTime} mins watch`;
      break;
    default:
      minRead = ` | ${article.readingTime} mins read`;
      break;
  }
  const imageUrl = new URL(article.image, window.location);

  const cardWrapper = a(
    { class: 'group h-full', href: article.path, title: article.title },
    imageHelper(imageUrl.pathname, article.title, firstCard),
    div(
      { class: 'py-2' },
      span({ class: 'capitalize font-[rockwell] text-[#65697C] text-sm' }, `${getStoryType(tags)}`),
      span({ class: 'font-[rockwell] text-[#65697C] text-sm' }, `${minRead}`),
      h3(
        {
          class:
            'text-black font-medium mt-4 line-clamp-3 break-words !h-16',
        },
        cardTitle,
      ),
      p({ class: 'text-sm font-normal line-clamp-3 break-words !h-28' }, article.description),
      div(
        {
          class:
            'mt-auto inline-flex w-full pb-5 text-base text-[#378089] font-semibold',
        },
        `${footerLink} →`,
      ),
    ),
  );

  return li(
    {
      class:
        'w-full h-full article flex flex-col col-span-1 relative mx-auto justify-center overflow-hidden bg-white transform transition duration-500 hover:scale-105',
    },
    cardWrapper,
  );
}

export default async function decorate(block) {
  const pagetags = getMetadata('pagetags').split(',');

  let storyType;
  let contentType;
  pagetags.forEach((tag) => {
    if (tag.includes('stories-type')) {
      storyType = tag.trim();
    }
    if (tag.includes('content-type')) {
      contentType = tag.trim();
    }
  });

  let articles = await ffetch('/en-us/stories/query-index.json')
    .filter((item) => {
      const url = new URL(getMetadata('og:url'));
      return item.path !== url.pathname;
    })
    .filter((item) => item.tags.includes(storyType) && item.tags.includes(contentType))
    .all();

  articles = articles.sort((item1, item2) => item2.publishDate - item1.publishDate).slice(0, 3);

  const cardList = ul({
    class:
          'container grid max-w-7xl w-full mx-auto gap-6 grid-cols-1 sm:grid-cols-1 sm:px-0 lg:grid-cols-3 lg:px-6 xl:px-0  justify-items-center m-3 pt-6',
  });
  articles.forEach((article, index) => {
    cardList.appendChild(createCard(article, index === 0));
  });
  block.append(cardList);
}
