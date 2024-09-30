import ffetch from '../../scripts/ffetch.js';
import { imageHelper } from '../../scripts/scripts.js';
import {
  ul, li, p, a, div, h3,
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
      footerLink = 'Listen to Podcast';
      break;
    case 'films':
      footerLink = 'Watch Film';
      break;
    default:
      footerLink = 'Read Article';
      break;
  }

  const cardWrapper = a(
    { class: 'group h-full', href: article.path, title: article.title },
    imageHelper(article.image, article.title, firstCard),
    div(
      { class: 'py-2' },
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
            'mt-auto inline-flex w-full pb-5 text-base text-danaherpurple-500 font-semibold',
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
      storyType = tag;
    }
    if (tag.includes('content-type')) {
      contentType = tag;
    }
  });

  let articles = await ffetch('/en-us/stories/query-index.json')
    .filter((item) => item.title !== getMetadata('og:title'))
    .filter((item) => item.tags.includes(storyType) && item.tags.includes(contentType))
    .all();

  articles = articles.sort((item1, item2) => item2.publishDate - item1.publishDate).slice(0, 3);

  const cardList = ul({
    class:
          'container grid max-w-7xl w-full mx-auto gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 px-3 sm:px-0 justify-items-center mt-3 mb-3',
  });
  articles.forEach((article, index) => {
    cardList.appendChild(createCard(article, index === 0));
  });
  block.append(cardList);
}
