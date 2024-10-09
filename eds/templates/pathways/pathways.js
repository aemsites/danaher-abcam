import { buildBlock } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  const mainEl = document.querySelector('main');
  const section = mainEl.querySelector('div');
  section.classList.add('w-3/4', 'm-auto', 'mb-8');
  const headerSection = div({ class: 'border-b border-b-slate-300/70 mb-10' });
  const titleBlock = buildBlock('title-card', { elems: [] });
  const paginationBlock = buildBlock('pagination', { elems: [] });
  const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
  section.append(paginationBlock);
  headerSection.append(breadcrumbBlock, titleBlock);
  mainEl.insertBefore(headerSection, section);
}
