import { getMetadata } from '../../scripts/aem.js';
import { div, p } from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

export default function decorate(block) {
  const description = block.querySelector('p:nth-of-type(2)');
  if (description) description.classList.add(...'text-lg tracking-[0.3px] leading-7'.split(' '));
 }
