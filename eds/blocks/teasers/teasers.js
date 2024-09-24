import { decorateIcons } from '../../../eds/scripts/aem.js';
import {
  div, span, a,
} from '../../../eds/scripts/dom-builder.js';

/**
* loads and decorates the header, mainly the nav
* @param {Element} block The header block element
*/
export default async function decorate(block) {
  [...block.children].forEach((el) => {
    el.classList.add(...'p-4 mt-1 border rounded-2xl box-border text-black-0 max-w-screen-lg'.split(' '));
    el.classList.add(...'teaser-item group relative bg-gray-400/10 rounded-2xl box-border text-black-0 max-w-screen-lg [&:has(:focus-visible)]:shadow-interactiveElement cursor-pointer'.split(' '));
    el.classList.add(...'flex items-center justify-between w-full text-left font-semibold px-8 py-10'.split(' '));

    const link = el.querySelector('p > a');
    link.textContent = '';
    link.classList.add('pb-12');

    link.append(
      div(
        { class: 'items-center p-3 rounded-full absolute right-12 bg-teal-700/80 group-hover:bg-teal-700 max-[767px]:right-8' },
        span({ class: 'arrow-icon icon icon-chevron-down-white block -rotate-90 text-gray-400 fill-current size-6 group-hover:translate-x-0.5 transform transition-all' }),
      ),
    );
    el.append(link);
    decorateIcons(el);
    el.firstElementChild.classList.add('w-full');

    const heading = el.querySelector('h3');
    heading?.classList.add(...'w-[90%] text-2xl leading-5 group-hover:underline text-teal-800/70 font-bold tracking-wider mb-5 max-[767px]:w-[75%] max-[375px]:break-words'.split(' '));
    el.querySelector('h6')?.classList.add(...'w-[90%] text-black font-normal tracking-wide max-[767px]:w-[75%]'.split(' '));

    el.firstElementChild.prepend(
      a({
        href: link.href,
        class: 'flex items-center justify-between w-full text-left font-semibold px-0 py-6',
      }, heading),
    );
  });
  block.classList.add(...'space-y-6'.split(' '));
}
