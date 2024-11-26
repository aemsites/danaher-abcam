// import { buildBlock } from '../../scripts/aem.js';
// import { div } from '../../scripts/dom-builder.js';

// export default async function buildAutoBlocks() {
//   const mainEl = document.querySelector('main');
//   const section = mainEl.querySelector('div');
//   section.classList.add('w-3/4', 'm-auto', 'mb-8');
//   const headerSection = div({ class: 'border-b border-b-slate-300/70 mb-10' });
//   const titleBlock = buildBlock('title-card', { elems: [] });
//   const paginationBlock = buildBlock('pagination', { elems: [] });
//   const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
//   section.append(paginationBlock);
//   headerSection.append(breadcrumbBlock, titleBlock);
//   mainEl.insertBefore(headerSection, section);
// }

import { buildBlock } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const headerSection = div();
  const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
  headerSection.append(breadcrumbBlock);
  main.prepend(headerSection);
  const paginationBlock = buildBlock('pagination', { elems: [] });
  const sectionMiddle = main.querySelector(':scope > div:nth-child(3)');
  sectionMiddle.classList.add(...'border-t'.split(' '));
  sectionMiddle.append(
    buildBlock('guides-hub-links', { elems: [] }),
  );
  sectionMiddle.append(paginationBlock);
}
