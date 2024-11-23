import {
  span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { applyClasses } from '../../scripts/scripts.js';

export default function decorate(block) {
  applyClasses(block, 'grid max-w-7xl w-full mx-auto gap-x-2 gap-y-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-max sm:px-0 mt-3 mb-3 justify-around border-b border-solid border-gray-300');
  const divs = document.querySelectorAll('div');
  divs.forEach((div) => {
    if (divs.innerHTML === '' || div.textContent === '') {
      div.remove();
    }
  });
  [...block.children].forEach((element) => {
    applyClasses(element, 'flex lg:flex-row gap-x-6 items-center');
    const pEl = element.querySelector('p');
    if (pEl) {
      const docType = pEl.textContent.toLowerCase();
      pEl.classList.add('shrink-0');
      const icon = span({ class: `icon icon-${docType} size-6` });
      applyClasses(pEl.parentElement, 'flex flex-row-reverse gap-x-3 mr-1');
      pEl.textContent = '';
      pEl.append(icon);
    }
    const icon = span({ class: 'icon icon-arrow-down-circle' });
    const linkEl = element.querySelector('p > a');
    if (linkEl) {
      applyClasses(linkEl.parentElement?.parentElement, 'ml-auto mr-6 shrink-0');
      if (sessionStorage.getItem('ELOUQA')) {
        applyClasses(linkEl.parentElement, 'block');
      } else {
        applyClasses(linkEl.parentElement, 'hidden');
      }
      linkEl.textContent = '';
      linkEl.append(icon);
      linkEl.addEventListener('click', (event) => {
        if (sessionStorage.getItem('ELOUQA')) {
          return;
        } else {
          event.preventDefault();
        }
      });
    }

  });
  decorateIcons(block, 32, 32);
}
