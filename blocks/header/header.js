import { div } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

function megaMeunu() {
  return div({ class: 'mega-menu w-[360px] z-40 hidden max-w-sm fixed h-full bg-black px-3 py-4 ease-out transition-all' });
}

export default async function decorate(block) {
  const resp = await fetch('/fragments/header.html');
  block.classList.add(...'bg-black py-3 flex justify-center flex-col gradient-border-b after:mb-0 after:h-0.5 py-4'.split(' '));
  if (resp.ok) {
    const html = await resp.text();
    block.innerHTML = html;
  }

  block.append(megaMeunu());
  decorateIcons(block.querySelector('.abcam-logo'));
  decorateIcons(block.querySelector('.logo-home-link'), 120, 25);
  // decorateIcons(block);

  block.querySelectorAll('.mega-menu')?.forEach((item) => {
    const megaMenuItem = item.querySelector('.mega-menu-item');

    item.addEventListener('mouseover', () => {
      megaMenuItem.classList.remove('hidden');
    });
    item.addEventListener('mouseout', (e) => {
      if (!megaMenuItem.contains(e.relatedTarget)) {
        megaMenuItem.classList.add('hidden');
      }
    });
  });
}
