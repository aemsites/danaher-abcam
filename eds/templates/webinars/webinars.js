import {
  buildBlock, getMetadata,
} from '../../scripts/aem.js';
import {
  div,
} from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const sectionColumns = main.querySelector(':scope > div > div.columns')?.parentElement;
  const headingDiv = div({ class: 'webinar leading-6 text-2xl font-bold text-black px-6 lg:px-80 mb-0' }, 'Abcam webinar');
  const readingTime = getMetadata('readingtime');
  const expectedPublishFormat = new Date(getMetadata('published-time'));
  const readDateTimeDiv = div({ class: 'readdatetime font-normal text-sm leading-4 text-[#8B8B8B] capitalize mb-2 pt-4' }, `${expectedPublishFormat.getDate()} ${expectedPublishFormat.toLocaleString('default', { month: 'long' })}, ${expectedPublishFormat.getFullYear()} | ${readingTime} Mins`);
  sectionColumns.prepend(
    headingDiv,
    buildBlock('back-navigation', { elems: [] }),
    readDateTimeDiv,
  );
}
