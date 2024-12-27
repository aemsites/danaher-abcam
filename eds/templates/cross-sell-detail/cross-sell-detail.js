import { buildBlock } from '../../scripts/aem.js';
import { div, } from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
    const main = document.querySelector('main');
    const headerSection = div();
    const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
    headerSection.append(breadcrumbBlock);
    main.prepend(headerSection);
      const jumpToSectionDiv = div(
        buildBlock('sticky-sections-list', { elems: [] }),
      );
      const headerTitle = main.querySelector(':scope > div:nth-child(1)');
      headerTitle.parentNode.insertBefore(jumpToSectionDiv, headerTitle.nextSibling);   
}
