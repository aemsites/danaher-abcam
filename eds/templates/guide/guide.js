import { buildBlock } from '../../scripts/aem.js';
import { div, p } from '../../scripts/dom-builder.js';

function getCookie(name) {
  const cookieArr = document.cookie.split(";");
  console.log(cookieArr);
  for (let i = 0; i < cookieArr.length; i++) {
      let cookie = cookieArr[i].trim();

      if (cookie.startsWith(name + "=")) {
          return decodeURIComponent(cookie.substring(name.length + 1));
      }
  }
  return null;
}

async function buildRelatedLinks(main) {
  const allLinks = [];
  const fragmentBlock = main.querySelector('div.fragment');
  const fragmentPath = fragmentBlock?.querySelector('a')?.getAttribute('href');
  console.log(getCookie('cq-authoring-mode'));
  fragmentBlock?.remove();
  const resp = await fetch(`${fragmentPath}.plain.html`);
  if (resp.ok) {
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
  const sectionMiddle = main.querySelector(':scope > div:nth-child(2)');
  sectionMiddle.classList.add(...'guides-middle-container w-full pt-4'.split(' '));
  sectionMiddle.prepend(
    buildBlock('chapter-links', { elems: [] }),
    buildBlock('sidelinks', { elems: allLinks }),
  );
  sectionMiddle.prepend(
    buildBlock('sticky-sections-list', { elems: [] }),
  );
  const headerSection = div();
  const breadcrumbBlock = buildBlock('breadcrumb', { elems: [] });
  headerSection.append(breadcrumbBlock);
  main.insertBefore(headerSection, mainEl);
}
