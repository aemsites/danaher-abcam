import { getProductResponse } from '../../scripts/search.js';

export default async function decorate(block) {
  const response = await getProductResponse();
  block.classList.add('border-t-4');
  block.textContent = 'Product Download Placeholder';
}
