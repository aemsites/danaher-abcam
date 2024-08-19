import { createOptimizedPicture } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  block.classList.add(...'w-full bg-black'.split(' '));
  const divEl = div({class: "flex flex-col lg:flex-row mx-auto py-12 xl:w-3/4 space-x-0 lg:space-x-8"});
  [...block.children].forEach((teaser) => {
      teaser.classList.add(...'text-white w-full lg:w-3/4 py-8 px-8'.split(' '));
      teaser.querySelectorAll('img').forEach((img) => {
        img.closest('picture').replaceWith(createOptimizedPicture(img.src, 'img-alt', false, [{ width: '750' }]));
      });

      teaser.querySelector('h3').classList.add(...'my-4 text-lg font-semibold'.split(' '));
      divEl.appendChild(teaser);
  });
  block.appendChild(divEl);
}
