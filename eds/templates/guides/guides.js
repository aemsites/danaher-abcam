import { buildBlock, getMetadata } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  console.log('Guides');
  const main = document.querySelector('main');
  const mainEl = main.querySelector('div');
  const sectionMiddle = getMetadata('template').includes('guides')
    ? main.querySelector(':scope > div:nth-child(2)')
    : main.querySelector(':scope > div:nth-child(3)');

  sectionMiddle?.classList.add(...'guides-middle-container w-full'.split(' '));
  sectionMiddle.prepend(
    buildBlock('chapters', { elems: [] }),
    buildBlock('sidelinks', { elems: [] }),
  );
  const headerSection = div();
  const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
  headerSection.append(breadcrumbBlock);
  main.insertBefore(headerSection, mainEl);
}
