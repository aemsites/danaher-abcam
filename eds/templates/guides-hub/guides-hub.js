import { buildBlock } from '../../scripts/aem.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const sectionMiddle = main.querySelector(':scope > div:nth-child(2)');
  sectionMiddle.classList.add(...'border-t'.split(' '));
  sectionMiddle.append(
    buildBlock('guides-hub-links', { elems: [] }),
  );
}
