import { buildBlock } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const section = main.querySelector('div');
  section.classList.add('w-3/4', 'm-auto', 'mb-8');
  const headerSection = div({ class: 'border border-b-slate-400 mb-10' });
  const titleBlock = buildBlock('title-card', { elems: [] });
  const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
  headerSection.append(breadcrumbBlock, titleBlock);
  main.insertBefore(headerSection, section);
}
