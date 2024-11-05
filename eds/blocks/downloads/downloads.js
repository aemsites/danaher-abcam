import {
  span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  block.parentElement.classList.add('py-8');
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
    const pEl = element.querySelector('p');
    if (pEl) {
      pEl.parentElement.classList.add(...'w-1/2'.split(' '));
      pEl.title = pEl.textContent;
      pEl.textContent = '';
      pEl.parentElement.prepend(documentIcon);
      pEl.append(pEl.title);
    }
    const icon = span({ class: 'icon icon-arrow-down-circle' });
    const link = element.querySelector('p a');
    if (link) {
      link.parentElement.parentElement.classList.add(...'w-1/2'.split(' '));
      link.textContent = '';
      link.append(icon);
    }
  });
  decorateIcons(block);
}
