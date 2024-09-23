import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

const widthRatios = [
  { value: '2-col-width-1-2', first: 'w-1/2', second: 'w-1/2' },
  { value: '2-col-width-3-4', first: 'w-3/4', second: 'w-1/4' },
  { value: '2-col-width-1-4', first: 'w-1/4', second: 'w-3/4' },
  { value: '2-col-width-3-5', first: 'w-3/5', second: 'w-2/5' },
  { value: '2-col-width-2-5', first: 'w-2/5', second: 'w-3/5' },
  { value: '2-col-width-1-2', first: 'w-1/2', second: 'w-1/2' },
  { value: '2-col-width-3-4', first: 'w-3/4', second: 'w-1/4' },
  { value: '2-col-width-1-4', first: 'w-1/4', second: 'w-3/4' },
  { value: '2-col-width-3-5', first: 'w-3/5', second: 'w-2/5' },
  { value: '2-col-width-2-5', first: 'w-2/5', second: 'w-3/5' },
];

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  const imageAspectRatio = 1.7778;

  applyClasses(block, 'h-full lg:max-h-[475px] flex flex-col md:flex-row gap-y-6 md:px-0');

  [...block.children].forEach((row) => {
    applyClasses(row, 'flex flex-col lg:flex-row');

    if (block.classList.contains('text-center-align') || block.classList.contains('image-full-width')) {
      block.classList.add('px-6');
      applyClasses(row, 'container max-w-7xl mx-auto');
      const pageTags = getMetadata('pagetags');
      const tag = pageTags?.split('/').pop();
      block.firstElementChild?.firstElementChild?.prepend(div({ class: 'font-normal text-sm leading-4 text-[#8B8B8B] capitalize mb-2' }, tag));
    }

    if (block.classList.contains('columns-2-cols')) {
      const [firstCol, secondCol] = row.children;
      firstCol.classList.add('lg:w-1/2');
      secondCol.classList.add('lg:w-1/2');
    
      widthRatios.forEach(({ value, first, second }) => {
        if (block.classList.contains(value)) {
          firstCol.classList.replace('lg:w-1/2', first);
          secondCol.classList.replace('lg:w-1/2', second);
        }
      });
    }

    [...row.children].forEach((col) => {

    [...row.children].forEach((col) => {
      col.classList.add('lg:py-6', 'lg:pr-6', block.classList.contains('text-center-align') && !col.querySelector('iframe') ? 'my-auto' : 'h-full');

      const pic = col.querySelector('picture');
      if (pic) {
        const img = pic.querySelector('img');
        createOptimizedPicture(img.src, 'img-alt', false, [{ width: '750' }]);

        if (img && block.classList.contains('image-full-width')) {
          applyClasses(img, 'relative lg:absolute w-full lg:w-1/2 h-full object-cover lg:right-0 lg:bottom-6');
          img.onerror = () => {
            img.width = this.width;
            img.height = Math.floor(img.width / imageAspectRatio);
          };
        }
      } else {
        col.classList.add('mx-auto');
      }
    });
  });
}
