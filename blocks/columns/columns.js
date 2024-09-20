import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

// export default function decorate(block) {
//   const cols = [...block.firstElementChild.children];
//   block.classList.add(`columns-${cols.length}-cols`);
//   const imageAspectRatio = 1.7778;

//   [...block.children].forEach((row) => {
//     block.classList.add(...'h-full lg:max-h-[475px] flex flex-col md:flex-row gap-y-6 px-6 md:px-0'.split(' '));
//     row.classList.add(...'flex flex-col lg:flex-row'.split(' '));

//     if (block.classList.contains('text-center-align')
//         || block.classList.contains('image-full-width')) {
//       row.classList.add(...'container max-w-7xl mx-auto'.split(' '));
//       const pageTags = getMetadata('pagetags');
//       const tagName = pageTags?.split('/');
//       const tag = tagName.pop();
//       block.firstElementChild?.firstElementChild?.prepend(div({ class: 'font-normal text-sm leading-4 text-[#8B8B8B] capitalize mb-2' }, tag));
//     }

//     [...row.children].forEach((col, colIndex, arr) => {
//       block.classList.forEach((className) => {
//         const width = className.replace(/2-col-width-(\d)-(\d)/, 'lg:w-$1/$2')
//         if (className.includes('2-col-width-') && colIndex === 0) {
//           col.classList.add(width);
//         } else {
//           col.classList.add('lg:w-1/2');
//         }
//       });

//       col.classList.add('pb-10');
//       if (colIndex !== arr.length - 1) col.classList.add('lg:pr-16');
//       if (block.classList.contains('text-center-align') && col.querySelector('iframe') === null) {
//         col.classList.add('my-auto');
//       } else {
//         col.classList.add('h-full');
//       }

//       const pic = col.querySelector('picture');
//       if (pic) {
//         const img = pic.querySelector('img');
//         createOptimizedPicture(img.src, 'img-alt', false, [{ width: '750' }]);
//         if (img && block.classList.contains('image-full-width')) {
//           img.classList.add(...'relative lg:absolute w-full lg:w-1/2 h-full object-cover lg:right-0 lg:bottom-6'.split(' '));
//           // eslint-disable-next-line func-names
//           img.onerror = function () {
//             img.width = this.width;
//             img.height = Math.floor(this.width / imageAspectRatio);
//           };
//         }
//       } else {
//         col.classList.add('mx-auto');
//       }
//     });
//   });
// }

const widthRatios = [
  '2-col-width-2-4', 
  '2-col-width-3-4',
  '2-col-width-1-4',
  '2-col-width-3-5',
  '2-col-width-2-5'
]

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  const imageAspectRatio = 1.7778;

  const applyClasses = (element, classes) => element.classList.add(...classes.split(' '));
  
  applyClasses(block, 'h-full lg:max-h-[475px] flex flex-col md:flex-row gap-y-6 px-6 md:px-0');

  [...block.children].forEach((row) => {
    applyClasses(row, 'flex flex-col lg:flex-row');

    if (block.classList.contains('text-center-align') || block.classList.contains('image-full-width')) {
      applyClasses(row, 'container max-w-7xl mx-auto');
      const pageTags = getMetadata('pagetags');
      const tag = pageTags?.split('/').pop();
      block.firstElementChild?.firstElementChild?.prepend(div({ class: 'font-normal text-sm leading-4 text-[#8B8B8B] capitalize mb-2' }, tag));
    }

    const firstRow = row.querySelector('div:nth-child(1)');
    widthRatios.forEach((widthRatioClass) => {
      if (block.className.includes('columns-2-cols') && block.className.includes(widthRatioClass)) {
        firstRow.classList.add(widthRatioClass.replace(/2-col-width-(\d)-(\d)/, 'lg:w-$1/$2'));
      }
    });

    [...row.children].forEach((col, colIndex) => {

      if(colIndex !== 0 && !block.className.includes('2-col-width-')) col.classList.add('lg:w-1/2');

      col.classList.add('py-6', 'pr-6', block.classList.contains('text-center-align') && !col.querySelector('iframe') ? 'my-auto' : 'h-full');

      const pic = col.querySelector('picture');
      if (pic) {
        const img = pic.querySelector('img');
        createOptimizedPicture(img.src, 'img-alt', false, [{ width: '750' }]);
        
        if (img && block.classList.contains('image-full-width')) {
          applyClasses(img, 'relative lg:absolute w-full lg:w-1/2 h-full object-cover lg:right-0 lg:bottom-6');
          img.onerror = () => {
            img.width = img.width;
            img.height = Math.floor(img.width / imageAspectRatio);
          };
        }
      } else {
        col.classList.add('mx-auto');
      }
    });
  });
}
