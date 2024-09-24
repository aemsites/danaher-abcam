import {
  span,
} from '../../../eds/scripts/dom-builder.js';

import { decorateIcons } from '../../../eds/scripts/aem.js';
import { getProductsListResponse } from '../../../eds/scripts/search.js';

export default async function decorate(block) {
  const productFullResponse = await getProductsListResponse(1);
  const parsedJson = JSON.parse(productFullResponse);
  block.classList.add(...'alert-container p-6 mb-6 rounded-xl bg-[#edf6f7]'.split(' '));
  const container = block.querySelector('div');
  container.firstElementChild.classList.add(...'flex flex-col md:flex-row gap-4 justify-between'.split(' '));
  const title = block.querySelector('h3');
  const totalCountEl = span({ class: 'font-bold text-xl text-[#378189]' }, ` (${parsedJson.totalCount})`);
  title.append(totalCountEl);
  title.classList.add(...'title mt-1 font-bold text-xl text-[#378189]'.split(' '));
  const alertBanner = block.querySelector('p a');
  alertBanner.classList.add(...'button flex bg-black hover:bg-[#3B3B3B] h-8 whitespace-nowrap rounded-2xl flex items-center py-2 px-3 text-white text-xs capitalize justify-self-end w-fit'.split(' '));
  const icon = span(
    { class: 'arrow-icon icon icon-chevron-down-white rotate-0' },
  );
  alertBanner.append(icon);
  decorateIcons(alertBanner);
  alertBanner.querySelector('img').style.cssText = 'transform: rotate(270deg)';
  alertBanner.querySelector('img').classList.add('w-4');
}
