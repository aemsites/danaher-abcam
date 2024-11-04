import { buildBlock } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const headerSection = div();
  const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
  headerSection.append(breadcrumbBlock);
  main.prepend(headerSection);
  const titleCardBlock = buildBlock('titlecard', { elems: [] });
  main.append(titleCardBlock);
  const ctaContainer = buildBlock('cta', { elems: [] });
  main.append(ctaContainer);
  const sectionMiddle = main.querySelector(':scope > div:nth-child(3)');
  sectionMiddle?.classList.add(...'border-t'.split(' '));
  sectionMiddle?.append(
    buildBlock('guides-hub-links', { elems: [] }),
  );
}
