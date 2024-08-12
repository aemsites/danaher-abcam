import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cardBlocks = document.querySelectorAll('.cards');
  cardBlocks.forEach((parentDiv) => {
    parentDiv.classList.add(...'w-4/5 m-auto mb-8'.split(' '));
  });
  const cardsTitle = document.querySelector('h2');
  cardsTitle.classList.add(...'text-5xl mb-8 mt-[72px]'.split(' '));
  [...block.children].forEach((row) => {
    const cardWrapper = row.querySelector('div');
    console.log(row);
    cardWrapper.classList.add(...''.split('cards-ul grid grid-cols-3 gap-11 max-[799px]:grid-cols-1'));
    [...row.children].forEach((elem) => {
      cardWrapper.append(elem);
      if (elem.querySelector('picture, img')) {
        elem.className = 'cards-card-image h-52 leading-5';
      } else {
        elem.className = 'cards-card-body p-4 bg-white rounded-b px-0 py-2';
      }
      if (elem?.querySelector('h3')) elem.querySelector('h3').className = '!line-clamp-2 !h-16';
      if (elem?.querySelector('h3') && !block.classList.contains('opco')) elem.querySelector('h3').className = 'pl-2 text-lg font-semibold text-danahergray-900 !line-clamp-3 !break-words !h-24';
      if (elem?.querySelector('p')) elem.querySelector('p').className = 'mb-4 text-sm !h-20 !line-clamp-4 !break-words';
      if (elem?.querySelector('p') && !block.classList.contains('opco')) elem.querySelector('p').className = 'pl-2 mb-4 text-sm !h-20 !line-clamp-4 !break-words';
      row.append(cardWrapper);
    });
  });
  block.querySelectorAll('img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
}
