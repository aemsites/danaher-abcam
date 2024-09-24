import { buildBlock, getMetadata } from '../../scripts/aem.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const sectionColumns = main.querySelector(':scope > div > div.columns')?.parentElement;
  sectionColumns.prepend(
    buildBlock('back-navigation', { elems: [] }),
  );
  console.log('sectionColumns', sectionColumns);
}
