import { buildBlock, getMetadata } from '../../scripts/aem.js';
import { buildArticleSchema, buildPodcastEpisodeSchema } from '../../scripts/schema.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  const firstSection = main.querySelector(':scope > div > div.title-card') ? main.querySelector(':scope > div > div.title-card') : main.querySelector(':scope > div > div.columns');
  const sectionColumns = firstSection?.parentElement;
  const sectionMiddle = main.querySelector(':scope > div:nth-child(2)');
  sectionColumns.prepend(
    buildBlock('back-navigation', { elems: [] }),
  );
  sectionMiddle.classList.add(...'story-middle-container w-full'.split(' '));
  sectionMiddle.prepend(
    buildBlock('story-info', { elems: [] }),
    buildBlock('social-media', { elems: [] }),
    buildBlock('sidelinks', { elems: [] }),
  );
}

if (getMetadata('pagetags').includes('article')) {
  buildArticleSchema();
}
if (getMetadata('pagetags').includes('podcast')) {
  buildPodcastEpisodeSchema('', 1, '', '', 'listening');
}
