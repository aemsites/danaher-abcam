import { div } from '../../scripts/dom-builder.js';

export default function buildAutoBlocks(block) {
  const contentBlocks = block.querySelectorAll('.section');

  // Creating the default template wrapper
  const defaultTemplate = div({ id: 'content-wrapper' });

  // Creating content wrapper
  const content = div({ id: 'main' });

  // Creating outer element
  const outerElement = div({ class: 'w-4/5 m-auto' });

  // Creating main and sidebar elements
  const main = div({ class: 'mt-[72px] pb-[66px]' });

  // Iterate over each section
  contentBlocks.forEach((blocks) => {
    // Appending Hero banner from each section
    const heroBanner = blocks.querySelector('.hero-wrapper');

    if (heroBanner) {
      defaultTemplate.appendChild(heroBanner); // Clone to avoid removing the original
    }
    main.appendChild(blocks);
    blocks.style.display = null;
    outerElement.appendChild(main);
    content.appendChild(outerElement);
    defaultTemplate.appendChild(content);
    const alternating = blocks.querySelector('.alternating-wrapper');
    const miniTeaser = blocks.querySelector('.mini-teasers-wrapper');
    if (miniTeaser) {
      content.appendChild(miniTeaser);
    }
    if (alternating) {
      content.appendChild(alternating);
    }
  });
  block.appendChild(defaultTemplate);
}
