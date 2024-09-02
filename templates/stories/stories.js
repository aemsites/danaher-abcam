import { buildBlock } from '../../scripts/aem.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const section1 = main.querySelector(':scope > div:nth-child(1)');
  section1.prepend(
    buildBlock('back-navigation', { elems: [] }),
  );
  const section = main.querySelector(':scope > div:nth-child(2)');
  section.classList.add(...'story-middle-container w-full'.split(' '));
  section.prepend(
    buildBlock('story-info', { elems: [] }),
    buildBlock('social-media', { elems: [] }),
  );
}
