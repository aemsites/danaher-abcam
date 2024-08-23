import {
  div, a, h3,
  span,
} from '../../scripts/dom-builder.js';

import { decorateIcons, getMetadata } from '../../scripts/aem.js';

export default function decorate(block) {
  const title = getMetadata('og:title');
  const { href } = window.location;
  const alertBanner = div(
    { class: 'alert-container p-6 mb-6 rounded-xl bg-[#edf6f7]' },
    div(
      { class: 'alert-section flex flex-col md:flex-row gap-4 justify-between' },
      h3({ class: 'title mt-1 font-bold text-xl text-[#378189]' }, `Search our catalogue of ${title}`),
      div(
        { class: 'alert-button' },
        a(
          { class: 'button bg-black hover:bg-[#3B3B3B] h-8 whitespace-nowrap rounded-2xl flex items-center py-2 px-3 text-white text-xs capitalize justify-self-end w-fit', href },
          title,
          span({ class: 'arrow-icon icon icon-chevron-down-white rotate-0' }),
        ),
      ),
    ),
  );
  decorateIcons(alertBanner);
  alertBanner.querySelector('img').style.cssText = 'transform: rotate(270deg)';
  alertBanner.querySelector('img').classList.add('w-4');
  block.append(alertBanner);
}
