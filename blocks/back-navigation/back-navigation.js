import { a } from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';

function goBack() {
  const backArr = window.location.pathname.split('/');
  const backNavigationPath = backArr.slice(0, (backArr.length - 2)).join('/');
  return `${window.location.origin}${backNavigationPath}`;
}

export default function decorate(block) {
  const articleType = getMetadata('template').toLowerCase();
  const goParentBack = a({ class: 'mx-auto px-80 pb-16 text-base text-danaherpurple-500 font-semibold', href: goBack() }, `← Back to ${articleType}`);
  block.firstElementChild.append(goParentBack);
}
