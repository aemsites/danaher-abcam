import {
  hr, h2, div,
} from '../../scripts/dom-builder.js';
import { getProductResponse } from '../../scripts/search.js';

export default async function decorate(block) {
  const response = await getProductResponse();
  // block.classList.add('border-t-4');
  // block.textContent = 'Product Download Placeholder';
  const buttonsList = ['Datasheet', 'Safety Datasheet', 'COC'];
  const downloadButtons = div({ class: 'flex flex-row flex-wrap mb-11 gap-4' });
  buttonsList.forEach((item) => {
    const button = document.createElement('button');
    button.classList.add(...'flex flex-col justify-between w-32 h-32 pt-4 pl-4 text-[#2a3c3c] text-xs font-semibold border rounded-4px border-grey-0 hover:no-underline'.split(' '));
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#49a8b2" viewBox="0 0 24 24" aria-hidden="true" class="fill-blue-0" data-di-rand="1720416331286"><path d="M13 12.586l3.293-3.293c.39-.39 1.024-.39 1.414 0 .39.39.39 1.024 0 1.414l-5 5M13 12.586V3c0-.552-.448-1-1-1s-1 .448-1 1v9.586L7.707 9.293c-.39-.39-1.024-.39-1.414 0-.39.39-.39 1.024 0 1.414l5 5c.096.096.206.168.324.217.118.049.247.076.383.076.274 0 .522-.11.703-.289"></path><path d="M20 15c0-.552.448-1 1-1s1 .448 1 1v4c0 1.657-1.343 3-3 3H5c-1.657 0-3-1.343-3-3v-4c0-.552.448-1 1-1s1 .448 1 1v4c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-4z"></path></svg><span class="mb-2">${item}</span>`;
    downloadButtons.appendChild(button);
  });

  const downloadEl = div(
    { class: 'pt-0 mt-0' },
    hr({ class: 'h-[1px] my-6 bg-interactive-grey-active mb-10' }),
    h2({ class: 'mt-6 mb-4 text-2xl font-semibold text-[#2a3c3c]' }, 'Downloads'),
    div({ class: 'grid grid-cols-2 gap-x-3 gap-y-10' }, downloadButtons),
  );
  block.append(downloadEl);
}
