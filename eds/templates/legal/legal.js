import { buildBlock, getMetadata } from '../../scripts/aem.js';
import { div, p } from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const mainEl = main.querySelector('div');
  const modifiedTime = getMetadata('modified-time');
  const formattedDate = new Date(modifiedTime).toUTCString().slice(0, 16);
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
  const defaultContainer = sectionMiddle.querySelector('div > p:first-of-type');
  const editedTime = p({ class: 'text-[#65797C] !mb-10' }, `Last edited ${formattedDate}`);
  defaultContainer.parentNode.insertBefore(editedTime, defaultContainer);
  const headerSection = div();
  const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
  headerSection.append(breadcrumbBlock);
  main.insertBefore(headerSection, mainEl);
}
