import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  const imageAspectRatio = 1.7778;

  [...block.children].forEach((row) => {
    block.classList.add(...'h-full lg:h-[475px] flex flex-col md:flex-row gap-y-6 px-6 md:px-0'.split(' '));
    row.classList.add(...'flex flex-col lg:flex-row'.split(' '));

    if (block.classList.contains('text-center-align')
        || block.classList.contains('image-full-width')) {
      row.classList.add(...'container max-w-7xl mx-auto'.split(' '));
      const pageTags = getMetadata('pagetags');
      const tagName = pageTags?.split('/');
      const tag = tagName.pop();
      block.firstElementChild?.firstElementChild?.prepend(div({ class: 'font-normal text-sm leading-4 text-[#8B8B8B] capitalize mb-2' }, tag));
    }

    [...row.children].forEach((col, index, arr) => {
      col.classList.add('pb-10');
      if (index !== arr.length - 1) col.classList.add('lg:pr-16');
      if (block.className.includes('columns-2-cols')) col.classList.add('lg:w-1/2');
      if (block.classList.contains('text-center-align') && col.querySelector('iframe') === null) {
        col.classList.add('my-auto');
      } else {
        col.classList.add('h-full');
      }
      
      const pic = col.querySelector('picture');
      if (pic) {
        const img = pic.querySelector('img');
        createOptimizedPicture(img.src, 'img-alt', false, [{ width: '750' }]);
        if (img && block.classList.contains('image-full-width')) {
          img.classList.add(...'relative lg:absolute w-full lg:w-1/2 h-full object-cover lg:right-0 lg:bottom-6'.split(' '));
          // eslint-disable-next-line func-names
          img.onerror = function () {
            img.width = this.width;
            img.height = Math.floor(this.width / imageAspectRatio);
          };
        }
      } else {
        col.classList.add('mx-auto');
      }
    });
  });
}
