import { p } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const para = p('Hello');
  block.appendChild(para);
}
