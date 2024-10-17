import { ul, p, span } from '../../scripts/dom-builder.js';
import { createCard } from '../../scripts/scripts.js';

export default async function decorate(block) {
  console.log('story');
  const articles = [];
  if (block.children.length > 0) {
    [...block.children].forEach((article) => {
      if (article.children.length > 0) {
        const obj = {
          title: article.querySelector('p:not(a)'),
          path: article.querySelector('p a')?.href,
        };
        console.log(obj);
        articles.push(obj);
      }
    });
    console.log(articles);
    if (articles.length > 0) {
      const cardList = ul({ class: 'w-full my-3' });
      articles.forEach((article) => {
        cardList.appendChild(createCard({
          path: article.path,
          bodyEl: span({ class: 'block text-sm leading-6 font-semibold text-[#378189] py-2 border-b border-b-[#D8D8D8] hover:underline' }, article.title),
          isStoryCard: false,
        }));
      });
      block.innerHTML = '';
      const spanEl = p({ class: 'text-sm leading-6 font-semibold uppercase text-[#65797C]' }, 'RELATED LINKS');
      block.append(spanEl, cardList);
    }
  }
}
