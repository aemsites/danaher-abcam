import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cardBlocks = document.querySelector('.cards');
  cardBlocks.classList.add(...'w-4/5 m-auto mb-8'.split(' '));
}
