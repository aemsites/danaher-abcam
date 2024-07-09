import { getProductResponse } from '../../scripts/search.js';

export default async function decorate(block) {
  const response = await getProductResponse();
  block.classList.add(...'h-1/4 w-auto bg-teal-100 col-span-4'.split(' '));
  block.textContent = 'Product Buybox Placeholder';
}
