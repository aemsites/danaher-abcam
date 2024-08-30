import { div } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  block.classList.add(...'mx-auto xl:max-w-7xl xl:px-0 px-[30px] py-12 font-sans text-base flex flex-col justify-center'.split(' '));
  block.querySelector('h1').classList.add(...'my-5 text-black-0 text-5xl md:text-6xl font-semibold tracking-normal'.split(' '));
  block.querySelector('h1').after(div({ class: 'w-1/6 mb-5 border-t-4 border-[#ff7223]' }));
  block.querySelector('p').classList.add('text-xl', 'tracking-normal');
}
