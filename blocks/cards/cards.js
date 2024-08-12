import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cardBlocks = document.querySelectorAll('.cards');
  cardBlocks.forEach((parentDiv) => {
    parentDiv.classList.add(...'w-4/5 m-auto mb-8'.split(' '));
  });
  const cardsTitle = document.querySelector('h2');
  cardsTitle.classList.add(...'text-5xl mb-8 mt-[72px]'.split(' '));
  [...block.children].forEach((row) => {

  });
  block.querySelectorAll('img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });
}
