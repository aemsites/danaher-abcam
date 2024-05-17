import {
  div, h1,
} from '../../scripts/dom-builder.js';

import { getMetadata } from '../../scripts/aem.js';

export default function decorate(block) {
  const sectionBlocks = block.querySelector('.section');
  const productCategoryWrapper = div({ class: 'product-category-wrapper' });
  const container = div({ class: 'product-category-container' });
  const title = h1(getMetadata('og:title'));
  const description = div({ class: 'product-category-description' }, getMetadata('og:description'));
  container.appendChild(title);
  container.appendChild(description);
  if (sectionBlocks) {
    productCategoryWrapper.appendChild(container);
    sectionBlocks.innerHTML = productCategoryWrapper.outerHTML;
  } else block.appendChild(container);
}
