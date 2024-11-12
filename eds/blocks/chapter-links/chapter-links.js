import ffetch from '../../scripts/ffetch.js';
import {
  a, button, div, p, span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { buildArticleSchema, buildGuidesCollectionSchema } from '../../scripts/schema.js';

const modal = div({ class: 'w-screen h-full top-0 left-0 fixed block lg:hidden inset-0 z-30 bg-black bg-opacity-80 flex justify-center items-end transition-all -translate-y-full' });
const stickyChapterLinks = div({ class: 'sticky-bottom' });

function toggleModal() {
  modal.classList.toggle('-translate-y-full');
  stickyChapterLinks.classList.toggle('hidden');
}

function renderModal(el) {
  const closeButton = button({
    type: 'button',
    class: 'size-full flex items-center gap-x-2 justify-center py-2 focus:outline-none border border-solid border-black rounded-full text-black text-sm font-semibold',
    onclick: () => toggleModal(),
  }, span({ class: 'icon icon-close invert' }), 'Close');

  const modalContent = div({ class: 'bg-white w-96 m-4 rounded lg:hidden' });
  const modalClose = div({ class: 'w-full flex justify-center px-3 py-4' }, closeButton);
  const modalList = div({ class: 'flex flex-col gap-2' }, el);
  modalContent.append(modalList, modalClose);
  modal.append(modalContent);
  decorateIcons(modal);
}

function renderChapters(chapterItems) {
  const chaptersDesktopEl = div({ class: 'hidden lg:flex flex-col items-start' });
  const chaptersMobileEl = div({ class: 'max-h-96 lg:hidden [&_span]:pl-2 overflow-scroll px-4' });
  const url = new URL(window.location.href);
  const currentPage = url.pathname;
  const navHeadingEl = p({ class: 'text-sm leading-6 font-semibold uppercase text-[#65797C] px-3 pt-2 pb-1 my-0' }, 'CHAPTERS');
  chapterItems.forEach((item) => {
    const chaptersEl = div(
      { class: 'w-full border-b border-b-[#D8D8D8]' },
      a(
        {
          href: item.path,
          class: `block text-base lg:text-sm leading-6 font-semibold px-3 py-4 hover:underline ${item.path === currentPage ? 'text-black bg-[#EDF6F7]' : 'text-[#378189]'}`,
        },
        item.title,
      ),
    );
    chaptersMobileEl.append(chaptersEl);
  });
  chaptersMobileEl.prepend(navHeadingEl);
  chaptersDesktopEl.innerHTML = chaptersMobileEl.innerHTML;
  return { chaptersDesktopEl, chaptersMobileEl };
}

export default async function decorate(block) {
  const currentPage = window.location.pathname.split('/').pop();
  const parentURL = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
  const parentPage = parentURL.split('/').pop();
  const chapterItems = await ffetch('/en-us/technical-resources/guides/query-index.json')
    .filter((item) => {
      if (parentPage === 'guides') return item.parent === currentPage;
      return item.parent === parentPage;
    }).all();
  const chapters = chapterItems.map((element) => ({
    title: element.title.indexOf('| Abcam') > -1 ? element.title.toLowerCase().split('| abcam')[0] : element.title,
    pageOrder: element.pageOrder,
    path: element.path,
  }));
  const filteredChapters = chapters.filter((item) => item.title !== undefined);
  filteredChapters.sort((chapter1, chapter2) => chapter1.pageOrder - chapter2.pageOrder);
  if (parentPage === 'guides') {
    buildGuidesCollectionSchema(filteredChapters);
  } else {
    buildArticleSchema();
  }

  // Append button and chapters to block
  const { chaptersDesktopEl, chaptersMobileEl } = renderChapters(filteredChapters);
  renderModal(chaptersMobileEl);
  block.append(chaptersDesktopEl, modal);

  // Create Show/Hide button - bottom of footer
  const footerEl = document.querySelector('footer');
  const toggleButton = button(
    {
      type: 'button',
      class: 'size-full flex items-center gap-x-3 justify-center focus:outline-none bg-black rounded-full text-white px-12 py-4',
      onclick: () => toggleModal(),
    },
    span({ class: 'icon icon-chevron-right size-7 invert' }),
    'Browse Chapters',
  );
  decorateIcons(toggleButton);
  stickyChapterLinks.append(toggleButton);
  footerEl.after(stickyChapterLinks);
}
