import {
  ul, li, a, h3,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const sectionHead = h3({ class: 'text-xs leading-normal tracking-[.03125rem] text-[#65797c] pr-3.5 pl-3.5 py-2.5 border-t border-gray-300' });
  sectionHead.textContent = 'SECTIONS';
  block.appendChild(sectionHead);
  const rightNavLinks = document.querySelectorAll('h2');
  const navLinksUl = ul({ class: 'flex flex-row flex-wrap sticky-ul mt-4 items-center' });
  const items = [];
  rightNavLinks.forEach((rightNavLink, index) => {
    const liElement = li({ class: 'w-50 pr-3.5 pl-3.5 py-2.5 border-r border-gray-200' });
    const anchorElement = a({ class: 'text-base text-blue-500 block w-full hover:underline' });
    anchorElement.textContent = rightNavLink.textContent;
    anchorElement.href = `#${rightNavLink.id}`;
    liElement.appendChild(anchorElement);
    navLinksUl.appendChild(liElement);
    items.push(liElement);
  });
  items.forEach((item, index) => {
    if (index > 3) {
      item.style.display = 'none';
    }
  });
  const showMoreBtn = document.createElement('div');
  showMoreBtn.textContent = 'See All';
  showMoreBtn.className = 'cursor-pointer underline mt-2 ml-3';
  let showingAll = false;
  showMoreBtn.addEventListener('click', () => {
    showingAll = !showingAll;
    items.forEach((item, index) => {
      item.style.display = showingAll || index < 4 ? 'block' : 'none';
    });
    navLinksUl.style.display = 'flex';
    showMoreBtn.textContent = showingAll ? 'Show Less' : 'See All';
  });
  navLinksUl.appendChild(showMoreBtn);
  block.appendChild(navLinksUl);
}
