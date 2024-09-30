import { buildBlock, getMetadata } from '../../scripts/aem.js';
import { div, p } from '../../scripts/dom-builder.js';
import { buildArticleSchema, buildPodcastEpisodeSchema } from '../../scripts/schema.js';

function sideLinksDiv(linkHeading) {
  const main = document.querySelector('main');
  const divEl = div({ class: 'sidelinks leading-5 text-sm font-bold text-black pb-4' });
  const allParagraphs = main.querySelectorAll('p a[title="link"]');
  if (allParagraphs.length > 0) {
    divEl.append(p(linkHeading));
    allParagraphs.forEach((elPara) => {
      elPara.classList.add(...'border-b border-b-gray-300 py-2 mx-0 w-auto mt-2'.split(' '));
      divEl.append(p({ class: 'leading-5 text-normal font-medium text-[#378189]' }, elPara));
    });
  }
  return divEl;
}

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const sectionColumns = main.querySelector(':scope > div > div.columns')?.parentElement;
  const sectionMiddle = getMetadata('pagetags').includes('podcast')
    ? main.querySelector(':scope > div:nth-child(3)')
    : main.querySelector(':scope > div:nth-child(2)');
  sectionColumns.prepend(
    buildBlock('back-navigation', { elems: [] }),
  );
  sectionMiddle.classList.add(...'story-middle-container w-full'.split(' '));
  sectionMiddle.prepend(
    buildBlock('story-info', { elems: [] }),
    buildBlock('social-media', { elems: [] }),
    sideLinksDiv('Explore our products'),
  );
}

if (getMetadata('pagetags').includes('article')) {
  buildArticleSchema();
}
if (getMetadata('pagetags').includes('podcast')) {
  buildPodcastEpisodeSchema('', '', '', '', 'listening');
}
