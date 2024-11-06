import {
  span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { applyClasses } from '../../scripts/scripts.js';

export default function decorate(block) {
  applyClasses(block, 'flex flex-row justify-around w-full gap-4 border-b border-solid border-gray-300 py-4');
  const divs = document.querySelectorAll('div');
  divs.forEach((div) => {
    if (divs.innerHTML === '' || div.textContent === '') {
      div.remove();
    }
  });
  [...block.children].forEach((element) => {
    applyClasses(element, 'w-full flex flex-row gap-x-6 items-center');
    const pEl = element.querySelector('p');
    if (pEl) {
      const docType = pEl.textContent.toLowerCase();
      const icon = span({ class: `icon icon-${docType} size-6` });
      applyClasses(pEl.parentElement, 'flex flex-row-reverse gap-x-3');
      pEl.textContent = '';
      pEl.append(icon);
    }
    const icon = span({ class: 'icon icon-arrow-down-circle' });
    const linkEl = element.querySelector('p > a');
    if (linkEl) {
      linkEl.textContent = '';
      linkEl.append(icon);
    }
  });
  decorateIcons(block);
}
