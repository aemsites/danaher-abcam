import { buildBlock, getMetadata } from '../../scripts/aem.js';
import { div, span } from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  console.log('Stories');
  const main = document.querySelector('main');
  const sectionColumns = main.querySelector(':scope > div > div.columns')?.parentElement;
  const sectionMiddle = getMetadata('pagetags').includes('podcast') ? main.querySelector(':scope > div:nth-child(3)')
    : main.querySelector(':scope > div:nth-child(2)');
  sectionColumns.prepend(
    buildBlock('back-navigation', { elems: [] }),
  );
  sectionMiddle.classList.add(...'story-middle-container w-full'.split(' '));
  const sideLinksDiv = div({ class: 'sidelinks leading-5 text-sm font-bold text-black pb-4' }, 'Explore Our Products');
  main.querySelectorAll('p')?.forEach((paragraph) => {
    if (paragraph.querySelector('a[title="link"]')) {
      paragraph.classList.add(...'border-b border-b-gray-300 py-2 mx-0 w-auto mt-2'.split(' '));
      sideLinksDiv.append(span({ class: 'leading-5 text-normal font-medium text-[#378189]' }, paragraph));
    }
  });
  sectionMiddle.prepend(
    buildBlock('story-info', { elems: [] }),
    buildBlock('social-media', { elems: [] }),
    sideLinksDiv,
  );
}
