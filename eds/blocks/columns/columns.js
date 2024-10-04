import { createOptimizedPicture } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';
import { applyClasses, getStoryType } from '../../scripts/scripts.js';

const widthRatios = [
  { value: '2-col-width-1-2', first: 'lg:w-1/2', second: 'lg:w-1/2' },
  { value: '2-col-width-3-4', first: 'lg:w-3/4', second: 'lg:w-1/4' },
  { value: '2-col-width-1-4', first: 'lg:w-1/4', second: 'lg:w-3/4' },
  { value: '2-col-width-3-5', first: 'lg:w-3/5', second: 'lg:w-2/5' },
  { value: '2-col-width-2-5', first: 'lg:w-2/5', second: 'lg:w-3/5' },
];

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  const imageAspectRatio = 1.7778;

  applyClasses(block, 'h-full flex flex-col md:flex-row gap-y-6 px-6 md:px-0');

  [...block.children].forEach((row) => {
    applyClasses(row, 'flex flex-col lg:flex-row');

    if (block.classList.contains('text-center-align') || block.classList.contains('image-full-width')) {
      applyClasses(row, 'container max-w-7xl mx-auto');
      if (getStoryType()) {
        block.firstElementChild?.firstElementChild
          ?.prepend(
            div(
              { class: 'font-normal text-sm leading-4 text-[#435656] capitalize mb-2' },
              getStoryType(),
            ),
          );
      }
    }

    if (block.classList.contains('columns-2-cols')) {
      const [firstCol, secondCol] = row.children;
      applyClasses(firstCol, 'w-full lg:w-1/2');
      applyClasses(secondCol, 'w-full lg:w-1/2');

      widthRatios.forEach(({ value, first, second }) => {
        if (block.classList.contains(value)) {
          firstCol.classList.replace('lg:w-1/2', first);
          secondCol.classList.replace('lg:w-1/2', second);
        }
      });
    }

    [...row.children].forEach((col) => {
      col.classList.add('lg:py-6', 'lg:pr-6', block.classList.contains('text-center-align') && !col.querySelector('iframe') ? 'my-auto' : 'h-full');

      const pic = col.querySelector('picture');

      if (pic) {
        const clonedCol = col.cloneNode(true);
        applyClasses(col, 'hidden lg:block');
        applyClasses(clonedCol, 'block lg:hidden');
        row.querySelector('h1')?.after(clonedCol);
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
