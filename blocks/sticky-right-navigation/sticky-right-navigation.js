import {
  ul, li, a, h3,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const sectionHead = h3({ class: 'text-xs leading-normal tracking-[.03125rem] text-[#65797c] pr-3.5 pl-3.5 py-2.5 max-[768px]:hidden' });
  sectionHead.textContent = 'SECTIONS';
  block.appendChild(sectionHead);

  const rightNavLinks = document.querySelectorAll('h2');
  const navLinksUl = ul({ class: 'sticky-ul max-[768px]:hidden' });
  rightNavLinks.forEach((rightNavLink) => {
    const liElement = li({ class: 'w-72 rounded-3xl mb-2 pr-3.5 pl-3.5 py-2.5 hover:bg-[#f2f2f2]' });

    const anchorElement = a({ class: 'text-base text-black font-bold' });

    anchorElement.textContent = rightNavLink.textContent;
    anchorElement.href = `#${rightNavLink.id}`;

    liElement.appendChild(anchorElement);
    navLinksUl.appendChild(liElement);
  });
  block.appendChild(navLinksUl);
}
