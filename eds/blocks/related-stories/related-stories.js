import ffetch from '../../scripts/ffetch.js';
import { ul } from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';
import createArticleCard from '../dynamic-cards/articleCard.js';

export default async function decorate(block) {
  const pagetags = getMetadata('pagetags').split(',');
  const templateName = getMetadata('template');
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
  let articles;
  if (templateName === 'stories') {
    articles = await ffetch('/en-us/stories/query-index.json')
      .filter((item) => {
        const url = new URL(getMetadata('og:url'));
        return item.path !== url.pathname;
      })
      .filter((item) => item.tags.includes(storyType) && item.tags.includes(contentType))
      .all();
  } else {
    // articles = await ffetch(`/en-us/${templateName}/query-index.json`)
    articles = await ffetch('/en-us/stories/query-index.json')
      .filter((item) => {
        const url = new URL(getMetadata('og:url'));
        return item.path !== url.pathname;
      })
      .filter((item) => item.tags.includes(contentType))
      .all();
  }

  articles = articles?.sort((item1, item2) => item2.publishDate - item1.publishDate).slice(0, 3);

  const cardList = ul({
    class:
          'container grid max-w-7xl w-full mx-auto gap-6 grid-cols-1 sm:grid-cols-1 sm:px-0 lg:grid-cols-3 lg:px-6 xl:px-0  justify-items-center mt-3 mb-3',
  });
  articles?.forEach((article, index) => {
    cardList.appendChild(createArticleCard(article, index === 0, 'story'));
  });
  block.append(cardList);
}
