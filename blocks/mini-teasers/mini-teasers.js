import { createOptimizedPicture } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const divContainer = div({ class: 'mx-auto bg-black w-4/5 py-20 space-y-11 min-[800px]:flex min-[800px]:space-x-11 min-[800px]:space-y-0' });
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
      teaser.children[2].classList.add(...'text-sm font-normal'.split(' '));
    });
  });
  block.append(divContainer);
}
