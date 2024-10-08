import {
  buildBlock, getMetadata,
} from '../../scripts/aem.js';
import {
  div,
} from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const mainEl = main.querySelector(':scope > div');
  console.log('mainEl :', mainEl);
  const columnsEl = mainEl.querySelector('div.columns');
  const subTitleEl = mainEl.querySelector('h4');
  applyClasses(subTitleEl, 'text-xs text-[#378189] bg-[#EDF6F7] font-semibold rounded capitalize py-1 px-2');
  const divEl = div({class: 'flex md:inline-flex text-align-center items-center justify-between w-full'});
  divEl.append(subTitleEl);
  columnsEl?.firstElementChild?.firstElementChild?.firstElementChild.prepend(divEl);
  const readingTime = getMetadata('readingtime');
  const expectedPublishFormat = new Date(getMetadata('published-time'));
  const readDateTimeDiv = div({ class: 'readdatetime font-normal text-sm leading-4 text-[#8B8B8B] capitalize mb-2 pt-4' }, `${expectedPublishFormat.getDate()} ${expectedPublishFormat.toLocaleString('default', { month: 'long' })}, ${expectedPublishFormat.getFullYear()} | ${readingTime} Mins`);
  columnsEl?.firstElementChild?.firstElementChild.append(readDateTimeDiv);
  const buttonEl = mainEl.querySelector('div.abcam-button');
  applyClasses(buttonEl, 'mt-32');
  columnsEl?.firstElementChild?.firstElementChild.append(buttonEl);
  mainEl.append(buildBlock('back-navigation', { elems: [] }));
}
