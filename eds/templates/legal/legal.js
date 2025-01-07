import { buildBlock } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const mainEl = main.querySelector('div');
  const sectionMiddle = main.querySelector(':scope > div:nth-child(2)');
  sectionMiddle.classList.add(...'legal-middle-container w-full pt-4'.split(' '));
  sectionMiddle.prepend(
    buildBlock('chapter-links', { elems: [] }),
  );
  const jumpToSectionDiv = div(
    buildBlock('sticky-sections-list', { elems: [] }),
  );
  const headerTitle = main.querySelector(':scope > div:nth-child(1)');
  headerTitle.parentNode.insertBefore(jumpToSectionDiv, headerTitle.nextSibling);
  const headerSection = div();
  const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
  headerSection.append(breadcrumbBlock);
  main.insertBefore(headerSection, mainEl);
}
