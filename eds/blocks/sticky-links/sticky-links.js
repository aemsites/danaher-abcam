import ffetch from '../../scripts/ffetch.js';
import { ul, p, span } from '../../scripts/dom-builder.js';
import { createCard } from '../../scripts/scripts.js';

export default async function decorate(block) {
  console.log('Sticky Links');
  // let articles = await ffetch('/en-us/stories/query-index.json').all();

  // block.innerHTML = '';
  // if (articles.length > 0) {
  //   articles = articles.sort((item1, item2) => item2.publishDate - item1.publishDate);
  //   const cardList = ul({ class: 'w-full my-3' });
  //   articles.forEach((article) => {
  //     cardList.appendChild(createCard({
  //       path: article.path,
  //       bodyEl: span({ class: 'block text-sm leading-6 font-semibold text-[#378189] py-2 border-b border-b-[#D8D8D8] hover:underline' }, article.title),
  //       isStoryCard: false,
  //     }));
  //   });
  //   const spanEl = p({ class: 'text-sm leading-6 font-semibold uppercase text-[#65797C]' }, 'RELATED LINKS');
  //   block.append(spanEl, cardList);
  // }
}
