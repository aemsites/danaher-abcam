import {
  buildBlock,
} from '../../scripts/aem.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const mainEl = main.querySelector(':scope > div');
  mainEl.prepend(buildBlock('breadcrumb', { elems: [] }));
}
