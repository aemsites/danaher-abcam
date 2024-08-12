import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cardBlocks = document.querySelectorAll('.cards');
  cardBlocks.forEach((parentDiv) => {
    parentDiv.classList.add(...'w-4/5 m-auto mb-8'.split(' '));
  });
  // const cardsTitle = document.querySelector('h2');
  // cardsTitle.classList.add(...'text-5xl mb-8 mt-[72px]'.split(' '));
  [...block.children].forEach((row) => {
    let type = '';
    const heading = row.querySelector('h2');
    if (heading) heading.className = 'card-title text-5xl mb-8 mt-[72px]';
    const h3Heading = row.querySelector('h3');
    const typeP = h3Heading?.previousElementSibling;
    if (typeP) {
      type = typeP.textContent;
      typeP.remove();
      block.classList.add(type.toLowerCase());
    }
    //cardWrapper.classList.add(...''.split('cards-ul grid grid-cols-3 gap-11 max-[799px]:grid-cols-1'));
    [...row.children].forEach((elem) => {
      //cardWrapper.append(elem);
      if (elem.querySelector('picture, img')) {
        elem.className = 'cards-card-image';
      } else {
        elem.className = 'cards-card-body py-9 px-8 flex flex-col grow';
      }
      if (elem?.querySelector('h3')) elem.querySelector('h3').className = 'card-heading text-2xl tracking-[-0.03em]';
      if (elem?.querySelector('div > p')) elem.querySelector('div > p').className = 'card-description h-full mt-2.5 mb-3 text-base tracking-wide';
      //row.append(cardWrapper);
    });
  });
  block.querySelectorAll('img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
}
