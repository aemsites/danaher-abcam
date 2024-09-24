import { buildBlock } from '../../scripts/aem.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const section = main.querySelector('div');
  const heroSection = section.querySelector('div.hero-container');
  if (heroSection) {
    const heroBlock = buildBlock('hero', { elems: [] });
    main.insertBefore(heroBlock, section);
  } else {
    main.append(section);
  }
}
