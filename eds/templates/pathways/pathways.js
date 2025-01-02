import { buildBlock, getMetadata } from '../../scripts/aem.js';
import { div, p } from '../../scripts/dom-builder.js';
import { getCookie } from '../../scripts/scripts.js';

async function buildRelatedLinks(main) {
  const allLinks = [];
  const fragmentBlock = main.querySelector('div.fragment');
  const fragmentPath = fragmentBlock?.querySelector('a')?.getAttribute('href');
  if (getCookie('cq-authoring-mode') !== 'TOUCH') fragmentBlock?.remove();
  const resp = fragmentPath ? await fetch(`${fragmentPath}.plain.html`) : null;
  if (resp && resp.ok) {
    const fragment = div();
    fragment.innerHTML = await resp.text();
    const links = fragment.querySelectorAll('a[title="link"]');
    links.forEach((link) => {
      const pEl = p(link);
      allLinks.push(pEl);
    });
  }
  return allLinks;
}

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const allLinks = await buildRelatedLinks(main);
  const mainEl = main.querySelector('div');
  const modifiedTime = getMetadata('modified-time');
  const formattedDate = new Date(modifiedTime).toUTCString().slice(0, 16);
  const sectionMiddle = main.querySelector(':scope > div:nth-child(2)');
  sectionMiddle.classList.add(...'pathways-middle-container w-full pt-4'.split(' '));
  sectionMiddle.prepend(
    buildBlock('related-articles', { elems: [] }),
    buildBlock('sidelinks', { elems: allLinks }),
  );
  const jumpToSectionDiv = div(
    buildBlock('sticky-sections-list', { elems: [] }),
  );
  const headerTitle = main.querySelector(':scope > div:nth-child(1)');
  headerTitle.parentNode.insertBefore(jumpToSectionDiv, headerTitle.nextSibling);
  const defaultContainer = sectionMiddle.querySelector('div > p:first-of-type');
  const editedTime = p({ class: 'text-[#65797C] !mb-10' }, `Last edited ${formattedDate}`);
  defaultContainer.parentNode.insertBefore(editedTime, defaultContainer);
  const headerSection = div();
  const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
  headerSection.append(breadcrumbBlock);
  main.insertBefore(headerSection, mainEl);
}
