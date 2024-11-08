import ffetch from '../../scripts/ffetch.js';
import {
  button, div, span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { buildArticleSchema, buildGuidesCollectionSchema } from '../../scripts/schema.js';
import { renderChapters, renderModal, toggleModal } from '../chapter-links/chapter-links.js';

const modal = div({ class: 'w-screen h-full top-0 left-0 fixed block lg:hidden inset-0 z-30 bg-black bg-opacity-80 flex justify-center items-end transition-all translate-y-full' });
const stickyChapterLinks = div({ class: 'sticky-bottom' });

export default async function decorate(block) {
  const currentPage = window.location.pathname.split('/').pop();
  const parentURL = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
  const parentPage = parentURL.split('/').pop();
  const chapterItems = await ffetch('/en-us/technical-resources/guides/query-index.json')
    .filter((item) => {
      if (parentPage === 'topics') return item.parent === currentPage;
      return item.parent === parentPage;
    }).all();
  const chapters = chapterItems.map((element) => ({
    title: element.title.indexOf('| abcam') > -1 ? element.title.split('| abcam')[0] : element.title,
    pageOrder: element.pageOrder,
    path: element.path,
  }));
  const filteredChapters = chapters.filter((item) => item.title !== undefined);
  filteredChapters.sort((chapter1, chapter2) => chapter1.pageOrder - chapter2.pageOrder);
  if (parentPage === 'topics') {
    buildGuidesCollectionSchema(filteredChapters);
  } else {
    buildArticleSchema();
  }

  // Append button and chapters to block
  const { chaptersDesktopEl, chaptersMobileEl } = renderChapters(filteredChapters, 'related Articles');
  renderModal(chaptersMobileEl);
  block.innerHTML = '';
  block.append(chaptersDesktopEl, modal);

  // Create Show/Hide button - bottom of footer
  const footerEl = document.querySelector('footer');
  const toggleButton = button(
    {
      type: 'button',
      class: 'size-full flex items-center gap-x-3 justify-center focus:outline-none bg-black rounded-full text-white px-12 py-4',
      onclick: toggleModal,
    },
    span({ class: 'icon icon-chevron-right size-7 invert' }),
    'Browse Related Articles',
  );
  decorateIcons(toggleButton);
  stickyChapterLinks.append(toggleButton);
  footerEl.after(stickyChapterLinks);
}
