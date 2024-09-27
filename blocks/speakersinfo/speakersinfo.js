import {
  createOptimizedPicture, decorateIcons,
} from '../../scripts/aem.js';


export default function decorate(block) {
  console.log('block', block);
  block.classList.add(...'flex flex-row-reverse'.split(' '));
  [...block.children].forEach((row, index) => {
    console.log('row', row, index);
    row.classList.add('mx-auto w-[87%] max-[768px]:w-full');
    if(index === 0) {
      row.querySelector('h4')?.classList.add(...'text-normal font-semibold text-[#2A3C3C]'.split(' '));
      row.querySelector('h5')?.classList.add(...'text-sm font-normal leading-6 text-[#65797C] w-full'.split(' '));
      row.querySelector('p')?.classList.add(...'text-lg font-normal text-[#071112] leading-7 tracking-normal w-full'.split(' '));
    } else {
      const picture = row.querySelector('picture');
      const img = picture?.querySelector('img');
      createOptimizedPicture(img.src, 'img-alt', false, [{ width: '750' }]);
      if (img) {
        img.classList.add(...'w-16 h-16'.split(' '));
      }
    }
  });
  decorateIcons(block);
}
