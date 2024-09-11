import { a, span } from '../../scripts/dom-builder.js';
import { getMetadata, decorateIcons } from '../../scripts/aem.js';

function goBack() {
  const backArr = window.location.pathname.split('/');
  const backNavigationPath = backArr.slice(0, (backArr.length - 2)).join('/');
  return `${window.location.origin}${backNavigationPath}`;
}

export default function decorate(block) {
  const articleType = getMetadata('template').toLowerCase();
  const goParentBack = a(
    {
      class: 'flex items-center gap-2 text-base text-[#4CA6B3] font-bold mb-10 md:mb-0',
      href: goBack(),
    },
    span({ class: 'icon icon-arrow-left size-6 items-center' }),
    `Back to ${articleType}`,
  );
  if(document.querySelector('.section.no-section-padding')) {
    goParentBack.classList.add('px-6', 'lg:px-80');
  }
  decorateIcons(goParentBack);
  block.firstElementChild.append(goParentBack);
}
