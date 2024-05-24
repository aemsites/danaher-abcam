import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  block.firstElementChild.classList.add(...'mx-auto bg-black py-0.5 space-y-11 md:flex md:space-x-11 md:space-y-0 xl:max-w-[1120px] xl:px-0 px-0.3 md:px-8'.split(' '));
  [...block.children].forEach((teasers) => {
    [...teasers.children].forEach((teaser) => {
      teaser.classList.add('text-white');
      if (teaser.firstChild) {
        teaser.querySelectorAll('img').forEach((img) => {
          img.closest('picture').replaceWith(createOptimizedPicture(img.src, 'img-alt', false, [{ width: '750' }]));
        });
      }
      teaser.firstElementChild.classList.add(...'mb-2 h-[60px] w-[60px]'.split(' '));
      teaser.children[1].classList.add(...'mb-2 text-lg font-semibold'.split(' '));
      teaser.children[2].classList.add(...'text-small font-normal'.split(' '));
    });
  });
  const divEl = document.createElement('div');
  divEl.setAttribute('class', 'mx-auto xl:max-w-[1120px] xl:px-0 px-[30px]');
  block.prepend(divEl);
}
