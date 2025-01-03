import {
  div, span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function decorate(block) {
  [...block.children].forEach((el) => {
    applyClasses(el, 'p-4 mt-1 text-black-0 max-w-screen-lg border-b border-b-[#D8D8D8]');
    const contentDiv = el.querySelector('div');
    applyClasses(contentDiv, 'hidden');
    const titleDiv = div(
      { class: 'text-custom-teal text-[#378189] font-sans text-[24px] font-semibold leading-8 tracking-[-0.5px] flex items-center cursor-pointer gap-6' },
      contentDiv.querySelector('h3'),
      span({ class: 'accordion-arrow icon icon-chevron-up' }),
    );
    el.prepend(titleDiv);
    titleDiv.addEventListener('click', () => {
      contentDiv.classList.toggle('hidden');
      if (contentDiv.classList.contains('hidden')) titleDiv.querySelector('.accordion-arrow').style.transform = 'rotate(0deg)';
      else titleDiv.querySelector('.accordion-arrow').style.transform = 'rotate(180deg)';
    });
  });
  decorateIcons(block);
}
