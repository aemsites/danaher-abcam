import { decorateIcons } from '../../scripts/aem.js';
import { div, h5, span } from '../../scripts/dom-builder.js';

let nextElement = [];

function detectNextElements(stepsOl) {
  if (stepsOl.nextElementSibling && ['p', 'ul'].includes(stepsOl.nextElementSibling.localName)) {
    nextElement.push(stepsOl.nextElementSibling);
    return detectNextElements(stepsOl.nextElementSibling);
  }
  return false;
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // eslint-disable-next-line no-console
  console.log(block);
  const timelineWrapper = div(); let title = block.querySelector('h2');
  title = title != null ? title : 'Default Title';
  title.className = 'text-3xl mb-6 font-semibold text-heading-large font-header md:pt-20 md:-mt-20';
  timelineWrapper.append(title); 
    
}
