import { getMetadata } from '../../scripts/aem.js';
import { div, h1, p } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const title = getMetadata('og:title');
  const description = getMetadata('og:description');
  const template = getMetadata('template');

  if (template === 'blog-page') {
    const headTitle = div(
      { class: 'text-center m-auto lg:pt-14' },
      div(
        { class: 'font-sans text-base flex flex-col text-center m-auto max-w-[800px]' },
        h1({ class: 'my-5 text-black-0 lg:text-7xl sm:text-5xl mb-8 font-semibold tracking-normal text-3xl' }, title),
        p({ class: 'tracking-normal lg:text-[27px] font-light text-slate-800 text-xl md:max-w-[800px] w-full' }, description),

      ),
    );
    block.append(headTitle);
  } else {
    const headTitle = div(
      h1({ class: 'my-5 text-black-0 text-6xl font-semibold tracking-normal' }, title),
      div({ class: 'w-1/6 mb-5 border-t-4 border-[#ff7223]' }),
      div({ class: 'text-xl tracking-normal' }, description),
    );
    block.classList.add(...'w-3/4 m-auto mt-4 mb-12 font-sans text-base flex flex-col justify-center'.split(' '));
    block.append(headTitle);
  }
}
