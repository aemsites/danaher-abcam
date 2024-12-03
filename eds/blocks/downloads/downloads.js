import {
  span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { applyClasses } from '../../scripts/scripts.js';

export default function decorate(block) {
  applyClasses(block, 'grid max-w-7xl w-full mx-auto gap-x-2 gap-y-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-max sm:px-0 mt-3 mb-3 justify-around border-b border-solid border-gray-300');
  [...block.children].forEach((element) => {
    applyClasses(element, 'flex lg:flex-row');
    const pEl = element.querySelector('p');
    if (pEl) {
      const docType = pEl.textContent.toLowerCase();
      pEl.classList.add('shrink-0');
      const docTypeIcon = span({ class: `icon icon-${docType} size-6` });
      applyClasses(pEl.parentElement, 'flex flex-row-reverse w-full gap-x-3 mr-1 items-center');
      pEl.textContent = '';
      pEl.append(docTypeIcon);
    }
    const icon = span({ class: 'icon icon-arrow-down-circle' });
    const linkEl = element.querySelector('p > a');
    const tempLinkEl = element.querySelector('p');
    if (linkEl) {
      applyClasses(linkEl.parentElement?.parentElement, 'ml-auto mr-6 shrink-0');
      if (sessionStorage.getItem('ELOUQA')) {
        applyClasses(linkEl.parentElement, 'block');
      } else {
        applyClasses(linkEl.parentElement, 'hidden');
      }
      linkEl.classList.add('ml-auto', 'mr-2');
      linkEl.textContent = '';
      linkEl.append(icon);
      tempLinkEl.parentElement.prepend(linkEl);
      linkEl.addEventListener('click', (event) => {
        if (!sessionStorage.getItem('ELOUQA')) {
          event.preventDefault();
        }
      });
    }
  });
  block.querySelectorAll('div').forEach((divEle) => {
    if (!divEle.textContent.trim()) {
      divEle.remove();
    }
  });
  decorateIcons(block, 32, 32);
}
