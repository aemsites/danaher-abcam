import { p } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  console.log('search-results');
  const para = p('Hello');
  block.appendChild(para);
}
