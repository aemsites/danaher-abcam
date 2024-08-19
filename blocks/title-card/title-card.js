import { div } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  block.classList.add(...'mx-auto py-[72px] px-[30px] sm:px-[61px] w-[60%] font-sans text-base flex flex-col justify-center'.split(' '));
  block.querySelector('h1').classList.add(...'my-5 text-black-0 text-5xl md:text-6xl font-semibold tracking-normal'.split(' '));
  block.querySelector('h1').after(div({ class: 'w-1/6 mb-5 border-t-4 border-[#ff7223]' }));
  block.querySelector('p').classList.add('text-xl', 'tracking-normal');
  // if (template === 'blog-page') {
  //   const headTitle = div(
  //     { class: 'text-center m-auto lg:pt-14' },
  //     div(
  //       { class: 'font-sans text-base flex flex-col text-center m-auto max-w-[800px]' },
  //       h1({ class: 'my-5 text-black-0 lg:text-7xl sm:text-5xl mb-8 font-semibold tracking-normal text-3xl' }, title),
  //       p({ class: 'tracking-normal lg:text-[27px] font-light text-slate-800 text-xl md:max-w-[800px] w-full' }, description),
  //     ),
  //   );
  //   block.append(headTitle);
  // } 
}
