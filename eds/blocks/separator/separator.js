import {
  hr
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const separator = hr({class:'mt-8 border-t border-[#07111233]'})
  block.appendChild(separator);
}
