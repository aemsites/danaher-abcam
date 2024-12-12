import ffetch from '../../scripts/ffetch.js';
import {
  button, div, span,
} from '../../scripts/dom-builder.js';
import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import { renderChapters } from '../chapter-links/chapter-links.js';
import { removeAbcamTitle } from '../../scripts/scripts.js';

const modal = div({ class: 'w-screen h-full top-0 left-0 fixed block lg:hidden inset-0 z-30 bg-black bg-opacity-80 flex justify-center items-end transition-all translate-y-full' });
const stickyChapterLinks = div({ class: 'sticky-bottom' });

function toggleModal() {
  modal.classList.toggle('translate-y-full');
  stickyChapterLinks.classList.toggle('hidden');
}

function renderModal(el) {
  const closeButton = button({
    type: 'button',
    class: 'size-full flex items-center gap-x-2 justify-center py-2 focus:outline-none border border-solid border-black rounded-full text-black text-sm font-semibold',
    onclick: toggleModal,
  }, span({ class: 'icon icon-close invert' }), 'Close');

  const modalContent = div({ class: 'relative flex flex-col bg-white w-11/12 max-h-[70%] mb-4 rounded lg:hidden' });
  const modalClose = div({ class: 'w-full bottom-0 flex justify-center px-3 py-4' }, closeButton);
  modalContent.append(el, modalClose);
  modal.append(modalContent);
  decorateIcons(modal);
}

export default async function decorate(block) {
  const kcTags = getMetadata('pagetags')?.split(',');
  const extractedTags = kcTags.map((tag) => tag.split('/').pop());
  const title = getMetadata('og:title');

  const chapterItems = await ffetch('/en-us/related-articles-index.json')
    .filter((item) => item.title && item.title !== title)
    .filter((item) => item.tags && extractedTags.some((tag) => item.tags.includes(tag)))
    .all();
  const chapters = chapterItems.map((element) => ({
    title: removeAbcamTitle(element.title),
    description: element.description,
    pageOrder: element.pageOrder,
    path: element.path,
  }));
  const filteredChapters = chapters.filter((item) => item.title !== undefined);
  filteredChapters.sort((chapter1, chapter2) => chapter1.pageOrder - chapter2.pageOrder);

  // Append button and chapters to block
  const { chaptersDesktopEl, chaptersMobileEl } = renderChapters(filteredChapters, 'Related Articles', true);
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
