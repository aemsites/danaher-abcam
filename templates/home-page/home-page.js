import { buildBlock } from '../../scripts/aem.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const section = main.querySelector('div');
  const heroBlock = buildBlock('hero', { elems: [] });
  main.insertBefore(heroBlock, section);
}
