import {
  div, article, p, a, img, h1, h4, h3,
} from '../../scripts/dom-builder.js';

import { getMetadata } from '../../scripts/aem.js';
export default function decorate(block) {
  const contentBlocks = block.querySelector('.section');
  const heading = getMetadata('og:title');
  const description = getMetadata('og:description');
  const productCategoryWrapper = div({ class: 'product-category-wrapper' });
  const container = div({ class: 'product-category-container' });
  const title = h1({ class: 'product-category-title' }, heading);
  const boarderline = div({ class: 'mb-5' });
  const description1 = div({ class: 'product-category-description' }, description);
  container.appendChild(title);
  container.appendChild(boarderline);
  container.appendChild(description1);
  if (contentBlocks) {
    productCategoryWrapper.appendChild(container);
    contentBlocks.innerHTML = productCategoryWrapper.outerHTML;
  } else block.appendChild(container);

}