import { div } from '../../../eds/scripts/dom-builder.js';

export default function decorate(block) {
  const titleCardDiv = document.querySelector('.title-card');
  if (titleCardDiv && titleCardDiv.classList.contains('title-image')) {
    block.classList.add(...'mx-auto items-center xl:max-w-[1120px] xl:px-0 px-[30px] py-12 font-sans text-base flex flex-col justify-center'.split(' '));
    block.querySelector('h1').classList.add(...'text-center lg:text-3xl my-5 text-black-0 text-5xl md:text-6xl font-semibold tracking-normal'.split(' '));
    block.querySelector('p').classList.add('text-2xl', 'font-light', 'text-center', 'tracking-normal');
  } else {
    block.classList.add(...'mx-auto max-w-7xl px-[30px] py-12 font-sans text-base flex flex-col justify-center'.split(' '));
    block.querySelector('h1').classList.add(...'my-5 text-black-0 text-5xl md:text-6xl font-semibold tracking-normal'.split(' '));
    block.querySelector('h1').after(div({ class: 'w-1/6 mb-5 border-t-4 border-[#ff7223]' }));
    block.querySelector('p').classList.add('text-xl', 'tracking-normal');
  }
}
