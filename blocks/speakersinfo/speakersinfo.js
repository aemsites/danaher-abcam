import {
  div, img, p,
} from '../../scripts/dom-builder.js';
import {
  createOptimizedPicture, decorateIcons,
} from '../../scripts/aem.js';


export default function decorate(block) {
  console.log('block', block);
  [...block.children].forEach((row, index) => {
    console.log('row', row, index);
    if(index === 0) {
      if(row.querySelectorAll('p').length > 0) {
        row.querySelectorAll('p')?.forEach((p) => {
          console.log('p : ', p);
        });
      }
    } else {
      const picture = row.querySelector('picture');
      const img = picture?.querySelector('img');
      createOptimizedPicture(img.src, 'img-alt', false, [{ width: '750' }]);
      if (img) {
        img.classList.add(...'w-16 h-16'.split(' '));
      }
    }
  });
  // block.querySelectorAll('p')?.forEach((p) => {
  //   console.log('p : ', p);
  // });
  // block.querySelectorAll('div').forEach((row, index) => {
  //   if (!row.textContent.trim() && row.children.length === 0) {
  //     row.remove();
  //   } else {
  //     row.querySelectorAll('p')?.forEach((p) => {
  //       console.log('p : ', p);
  //     });
  //   }
  // });
  // block.innerHTML = '';
  // const authorName = getMetadata('authorname');
  // const authorJobTitle = getMetadata('authortitle');
  // const authorDesc = getMetadata('authordecsription');
  // const authorImage = getMetadata('authorimage');

  // block.append(
  //   div(
  //     { class: 'mx-auto' },
  //     p(
  //       { class: 'leading-6 text-2xl font-bold text-black pt-10' },
  //       'Speakers',
  //     ),
  //     div(
  //       { class: 'items-center flex justify-start my-4 w-full col-span-2' },
  //       div(
  //         { class: 'space-y-1' },
  //         div({ class: 'text-normal font-semibold text-[#2A3C3C]' }, authorName),
  //         div({ class: 'text-sm font-normal leading-6 text-[#65797C] w-full' }, authorJobTitle),
  //         div({ class: 'text-lg font-normal text-[#071112] leading-7 tracking-normal w-full' }, authorDesc),
  //       ),
  //     ),
  //   ),
  // );
  // if (authorImage) {
  //   const items = block.querySelector('.items-center');
  //   items.insertBefore(img({ class: 'h-16 w-16 rounded-full lg:h-20 lg:w-20 mr-7', src: authorImage, alt: authorName }), items.firstChild);
  //   const imageEl = block.querySelector('.speakersinfo')?.querySelector('.items-center')?.querySelector('img');
  //   imageEl.remove();
  //   block.querySelector('.speakersinfo')?.firstChild?.prepend(imageEl);
  // }
  // decorateIcons(block);

}
