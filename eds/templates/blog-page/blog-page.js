import { buildBlock } from '../../../eds/scripts/aem.js';
import { div } from '../../../eds/scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const section = main.querySelector('div');
  section.classList.add('mb-8');
  const headerSection = div({ class: 'mb-10' });
  const titleBlock = buildBlock('title-card', { elems: [] });
  headerSection.append(titleBlock);
  main.insertBefore(headerSection, section);
}
