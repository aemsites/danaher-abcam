import ffetch from '../../scripts/ffetch.js';
import { ul, p } from '../../scripts/dom-builder.js';
import { createCard } from '../../scripts/scripts.js';

export default async function decorate(block) {
  let articles = await ffetch('/en-us/stories/query-index.json').all();

  block.innerHTML = '';
  if (articles.length <= 0) {
    articles = articles.sort((item1, item2) => item2.publishDate - item1.publishDate);
    const cardList = ul({ class: 'w-full my-3' });
    articles.forEach((article) => {
      cardList.appendChild(createCard({
        title: article.title,
        path: article.path,
        isStoryCard: true,
      }));
    });
    const spanEl = p({ class: 'text-sm leading-6 font-semibold uppercase' }, 'RELATED LINKS');
    block.append(spanEl, cardList);
  }
}
