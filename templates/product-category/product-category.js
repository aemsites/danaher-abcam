import {
  div, h1, p,
} from '../../scripts/dom-builder.js';

import { getMetadata } from '../../scripts/aem.js';

export default function decorate(block) {
  const sectionBlocks = block.querySelector('.section');
  const productCategoryWrapper = div({ class: 'product-category-wrapper my-12' });
  const container = div(
    { class: 'max-w-3xl lg:max-w-7xl mx-auto px-4 md:px-12 flex flex-col justify-center' },
    h1({ class: 'relative pb-5 leading-[3.5rem] text-black font-semibold tracking-normal text-[3.5rem]' }, getMetadata('og:title')),
    div({ class: 'w-1/6 mb-5 border-t-4 border-[#ff7223]' }),
    div({ class: 'tracking-wide' }, getMetadata('subtitle')),
  );
  const border = div({ class: 'border-b border-gray-200 my-10' });
  productCategoryWrapper.appendChild(container);
  productCategoryWrapper.appendChild(border);
  const description = getMetadata('og:description');
  const descriptionWrapper = div({ class: 'max-w-3xl lg:max-w-7xl mx-auto text-lg leading-6 tracking-wide px-4 md:px-12 space-y-6' });
  description.split('\\n,').forEach((descriptionEl) => {
    descriptionWrapper.appendChild(p({ class: '' }, descriptionEl));
  });
  productCategoryWrapper.appendChild(descriptionWrapper);
  sectionBlocks.appendChild(productCategoryWrapper);
  if (sectionBlocks) {
    const section = sectionBlocks.querySelector('.alert-banner-wrapper' || '.product-list-wrapper');
    descriptionWrapper.appendChild(section);
  } else block.appendChild(container);
}
