import {
  div,
  span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {

  console.log('decorate downloads block: ', block);
  block.classList.add(...'flex flex-row justify-between w-full gap-4 border-b border-solid border-gray-300 py-8'.split(' '));
  const documentIcon = span({ class: 'icon icon-document' });
  const divs = document.querySelectorAll('div');
  divs.forEach((div) => {
    if (divs.innerHTML === '' || div.textContent === '') {
      div.remove();
    }
  });
  [...block.children].forEach((element) => {
    element.classList.add(...'w-full items-center flex flex-row'.split(' '));
    // const titleEl = block.querySelector('h6');
    // const docTitle = titleEl.textContent;
    const pEl = element.querySelector('p');
    if (pEl) {
      pEl.parentElement.classList.add(...'w-1/2'.split(' '));
      console.log('pEl: ', pEl);
      if (pEl.textContent.includes('Doc')) {
        pEl.textContent = pEl.textContent.replace('Doc', '');
        pEl.append(span({ class: 'icon icon-document' }));
      } else if (pEl.textContent.includes('PDF')) {
        pEl.textContent = pEl.textContent.replace('PDF', '');
        pEl.append(span({ class: 'icon icon-document' }));
      } else if (pEl.textContent.includes('PPT')) {
        pEl.textContent = pEl.textContent.replace('PPT', '');
        pEl.append(span({ class: 'icon icon-document' }));
      }
    }
    const icon = span({ class: 'icon icon-arrow-down-circle' });
    const link = element.querySelector('p > a');
    if (link) {
      link.parentElement.parentElement.classList.add(...'w-1/2'.split(' '));
      link.textContent = '';
      link.append(icon);
    }
  });
  decorateIcons(block);
}
