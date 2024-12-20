import { div, span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { getProductsListResponse } from '../../scripts/search.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const productFullResponse = await getProductsListResponse(1);
  const parsedJson = JSON.parse(productFullResponse || '{}');
  applyClasses(block, 'cta-container flex md:items-center flex-col md:flex-row justify-between gap-6 md:gap-8 w-full p-6 mt-10 mb-14 rounded-xl bg-[#edf6f7]');
  const title = block.querySelector('h3');
  const totalCountEl = span({ class: 'font-bold text-xl text-[#378189]' }, ` ${parsedJson.totalCount ? `(${parsedJson.totalCount})` : ''}`);
  title.append(totalCountEl);
  const description = block.querySelector('p');
  const descriptionDiv = div();
  if (description && (!description.parentElement || !description.parentElement.classList.contains('button-container'))) {
    applyClasses(descriptionDiv, 'cta-desc flex-grow text-[#378189] text-sm break-words');
    descriptionDiv.appendChild(description);
    applyClasses(description, 'my-0 !text-lg font-semibold');
    title.insertAdjacentElement('afterend', descriptionDiv);
  }
  applyClasses(title, `title mt-0 ${descriptionDiv.classList.contains('cta-desc') ? 'mb-4' : 'mb-0'} !font-bold !text-xl text-[#378189] break-words`);
  block.querySelectorAll('div').forEach((parent) => {
    if ([...parent.children].every((child) => child.tagName === 'DIV' && !child.innerHTML.trim())) {
      parent.remove();
    }
  });
  const ctaBanner = block.querySelector('.button-container');
  const icon = span({ class: 'arrow-icon icon icon-chevron-down-white w-4 rotate-0' });
  applyClasses(ctaBanner, 'flex items-center !px-4 !py-2 gap-2');
  ctaBanner.append(icon);
  decorateIcons(ctaBanner.parentElement);
  ctaBanner.querySelector('img').style.cssText = 'transform: rotate(270deg)';
  ctaBanner.querySelector('img')?.classList.add('w-4');
}
