import {
  div, span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function decorate(block) {
  [...block.children].forEach((el) => {
    applyClasses(el, 'border-b border-b-[#D8D8D8] py-6 px-0');
    const contentDiv = el.querySelector('div');
    applyClasses(contentDiv, 'hidden text-base leading-[23px] tracking-[0.3px] font-normal pt-2');
    const accHeading = contentDiv.querySelector('h2');
    const titleDiv = div();
    applyClasses(titleDiv, 'acc-title flex items-center cursor-pointer gap-6 justify-between');
    titleDiv.append(accHeading);
    const icon = span({ class: 'accordion-arrow icon icon-chevron-down shrink-0 ml-auto transition' });
    titleDiv.append(icon);
    applyClasses(accHeading, 'text-[#378189] font-sans !text-xl md:!text-2xl m-0 !font-semibold md:!leading-8 md:!tracking-[-0.5px]');
    el.prepend(titleDiv);
    titleDiv.addEventListener('click', () => {
      contentDiv.classList.toggle('hidden');
      if (contentDiv.classList.contains('hidden')) titleDiv.querySelector('.accordion-arrow').style.transform = 'rotate(0deg)';
      else titleDiv.querySelector('.accordion-arrow').style.transform = 'rotate(180deg)';
    });
  });
  decorateIcons(block, 24, 24);
}
