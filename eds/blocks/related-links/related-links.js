import { ul, p, span } from '../../scripts/dom-builder.js';
import { createCard } from '../../scripts/scripts.js';

export default async function decorate(block) {
  if (block.children.length > 0) {
    const cardList = ul({ class: 'w-full my-3' });
    [...block.children].forEach((article) => {
      if (article.children.length > 0) {
        const obj = {};
        article.classList.add('hidden');
        const linkName = article.querySelector('p:not(a)');
        const linkPath = article.querySelector('p a');
        if (linkName) obj.title = linkName;
        if (linkPath) obj.path = linkPath;
        if (Object.keys(obj).length === 2) {
          cardList.appendChild(createCard({
            path: obj.path?.href,
            bodyEl: span({ class: 'block text-sm leading-6 font-semibold text-[#378189] py-2 border-b border-b-[#D8D8D8] hover:underline' }, obj.title),
            isStoryCard: false,
          }));
        }
      }
    });
    const spanEl = p({ class: 'text-sm leading-6 font-semibold uppercase text-[#65797C]' }, 'RELATED LINKS');
    block.append(spanEl, cardList);
  }
}
