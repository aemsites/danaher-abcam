import { span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { getProductsListResponse } from '../../scripts/search.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const productFullResponse = await getProductsListResponse(1);
  const parsedJson = JSON.parse(productFullResponse || '{}');
  block.classList.add(...'cta-container flex md:items-center flex-col md:flex-row justify-between gap-8 md:gap-8 w-full p-6 mt-10 mb-14 rounded-xl bg-[#edf6f7]'.split(' '));
  const title = block.querySelector('h3');
  applyClasses(title, 'title mt-0 mb-4 !leading-[22px] !font-bold text-xl text-[#378189] break-words');
  const totalCountEl = span({ class: 'font-bold text-xl text-[#378189]' }, ` ${parsedJson.totalCount ? `(${parsedJson.totalCount})` : ''}`);
  title.append(totalCountEl);
  const description = block.querySelector('p');
  if (description && (!description.parentElement || !description.parentElement.classList.contains('button-container'))) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('flex-grow', 'text-[#378189]', 'text-sm', 'break-words');
    descriptionDiv.appendChild(description);
    description.classList.add('my-0', '!text-lg', 'font-semibold');
    title.insertAdjacentElement('afterend', descriptionDiv);

    block.querySelectorAll('div').forEach((parent) => {
      if ([...parent.children].every((child) => child.tagName === 'DIV' && !child.innerHTML.trim())) {
        parent.remove();
      }
    });
  }
  const ctaBanner = block.querySelector('.button-container');
  const icon = span({ class: 'arrow-icon icon icon-chevron-down-white w-4 rotate-0' });
  applyClasses(ctaBanner, 'flex items-center !px-4 !py-2 gap-2');
  ctaBanner.append(icon);
  decorateIcons(ctaBanner.parentElement);
  ctaBanner.querySelector('img').style.cssText = 'transform: rotate(270deg)';
  ctaBanner.querySelector('img')?.classList.add('w-4');
}
