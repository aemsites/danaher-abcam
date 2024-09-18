import { buildBlock, getMetadata } from '../../scripts/aem.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const sectionColumns = main.querySelector(':scope > div > div.columns')?.parentElement;
  const sectionMiddle = getMetadata('pagetags').includes('podcast') ? main.querySelector(':scope > div:nth-child(3)')
    : main.querySelector(':scope > div:nth-child(2)');
  sectionColumns.prepend(
    buildBlock('back-navigation', { elems: [] }),
  );

  sectionMiddle.classList.add(...'story-middle-container w-full'.split(' '));
  sectionMiddle.prepend(
    buildBlock('story-info', { elems: [] }),
    buildBlock('social-media', { elems: [] }),
  );
}
