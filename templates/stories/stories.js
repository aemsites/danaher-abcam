import { buildBlock } from '../../scripts/aem.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const section = main.querySelector(':scope > div:nth-child(2)');
  section.classList.add(...'story-middle-container w-full'.split(' '));

  section.prepend(
      buildBlock('story-info', { elems: [] }),
      buildBlock('social-media', { elems: [] })
  );

}
