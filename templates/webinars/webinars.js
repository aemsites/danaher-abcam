import {
  buildBlock,
} from '../../scripts/aem.js';
import {
  div,
} from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const sectionColumns = main.querySelector(':scope > div > div.columns')?.parentElement;
  const titleDiv = div({ class: 'webinartitle leading-6 text-2xl font-bold text-black px-6 lg:px-80 mb-6' }, 'Abcam Webinar');
  sectionColumns.prepend(
    titleDiv,
    buildBlock('back-navigation', { elems: [] }),
  );
  const sectionMiddle = main.querySelector(':scope > div:nth-child(2)');
  sectionMiddle.classList.add(...'webinar-middle-container w-full'.split(' '));
  sectionMiddle.prepend(
    buildBlock('speakers-info', { elems: [] }),
  );
}
