import {
    div, a, p, h3,
    span,
} from '../../scripts/dom-builder.js';

import { decorateIcons, getMetadata } from '../../scripts/aem.js';

export default function decorate(block) {

    const title = getMetadata('og:title');
    const href = window.location.href;
    const alertBanner = div({ class: 'alert-container p-6 mb-6 rounded bg-[#edf6f7]' });
    const alertSection = div({ class: 'alert-section grid grid-cols-2 items-center justify-between' });
    const alertHead = h3({ class: 'title mt-1 font-bold text-xl text-[#378189]' }, "Search our catalogue of " + title);
    const alertBtn = div({ class: 'alert-button grid ' });
    const alertAnchor = a({ class: 'button bg-black hover:bg-[#3B3B3B] h-8 whitespace-nowrap rounded-2xl flex items-center py-2 px-3 text-white text-xs capitalize justify-self-end w-fit', href: href }, title);
    const spanIcon = span({ class: 'arrow-icon icon icon-chevron-down rotate-0' });
    
    alertBtn.append(alertAnchor);
    alertAnchor.append(spanIcon);
    decorateIcons(alertBtn);
    alertBtn.querySelector('img').style.cssText = 'transform: rotate(270deg);';
    alertBtn.querySelector('img').classList.add('w-4');
    alertSection.append(alertHead);
    alertSection.append(alertBtn);
    alertBanner.appendChild(alertSection);
    block.append(alertBanner);
}
