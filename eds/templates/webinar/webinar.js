import {
  buildBlock,
} from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';
import { buildOndemandWebinarSchema } from '../../scripts/schema.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const mainEl = main.querySelector('div');
  const headerSection = div();
  const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
  headerSection.append(breadcrumbBlock);
  headerSection.querySelector('nav')?.classList.add('');
  main.insertBefore(headerSection, mainEl);
  buildOndemandWebinarSchema([]);
}
