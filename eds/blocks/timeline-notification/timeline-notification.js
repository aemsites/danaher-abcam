import { applyClasses } from '../../scripts/scripts.js';

export default function decorate(block) {
  if (block && block.classList.contains('knowledge')) {
    applyClasses(block.querySelector('div:nth-of-type(2)'), 'py-0.5 px-1 bg-gray-300');
  } else if (block && block.classList.contains('warning')) {
    applyClasses(block.querySelector('div:nth-of-type(2)'), ' py-0.5 px-1 bg-orange-50');
  } else if (block && block.classList.contains('help')) {
    applyClasses(block.querySelector('div:nth-of-type(2)'), ' py-0.5 px-1 bg-green-200');
  }
  const description = block.querySelector('p:nth-of-type(2)');
  if (description) description.classList.add(...'text-lg tracking-[0.3px] leading-7'.split(' '));
}
