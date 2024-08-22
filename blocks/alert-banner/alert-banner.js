import {
  span,
} from '../../scripts/dom-builder.js';

import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  block.classList.add(...'alert-container p-6 mb-6 rounded-xl bg-[#edf6f7]'.split(' '));
  const container = block.querySelector('div');
  container.className = 'alert-section flex flex-col md:flex-row gap-4 justify-between';
  const title = block.querySelector('h3');
  title.classList.add(...'title mt-1 font-bold text-xl text-[#378189]'.split(' '));
  const button = block.querySelector('.button-container');
  const divContainer = button.closest('div');
  const alertBanner = block.querySelector('p a');
  alertBanner.classList.add(...'button flex bg-black hover:bg-[#3B3B3B] h-8 whitespace-nowrap rounded-2xl flex items-center py-2 px-3 text-white text-xs capitalize justify-self-end w-fit'.split(' '));
  const icon = span(
    { class: 'arrow-icon icon icon-chevron-down-white rotate-0' },
  );
  alertBanner.append(icon);
  decorateIcons(alertBanner);
  alertBanner.querySelector('img').style.cssText = 'transform: rotate(270deg)';
  alertBanner.querySelector('img').classList.add('w-4');
  container.append(title);
  container.append(divContainer);
}
