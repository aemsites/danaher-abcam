import ffetch from '../../scripts/ffetch.js';
import {
  a, button, div, p, span,
} from '../../scripts/dom-builder.js';
import { makePublicUrl } from '../../scripts/scripts.js';
import { decorateIcons } from '../../scripts/aem.js';
import { buildArticleSchema, buildGuidesCollectionSchema } from '../../scripts/schema.js';

function renderModal(el) {
  const modal = div({ class: 'w-screen h-full top-0 left-0 fixed block lg:hidden inset-0 z-30 bg-black bg-opacity-80 flex justify-center items-center transition-all -translate-y-full' });
  const closeButton = button(
    {
      type: 'button',
      class: 'size-full flex items-center gap-x-2 justify-center focus:outline-none border border-solid border-black rounded-full text-black text-sm font-semibold',
      onclick: () => modal.classList.toggle('-translate-y-full'),
    },
    span({ class: 'icon icon-close invert' }),
    'Close',
  );

  const modalContent = div({ class: 'bg-white w-96 m-4 rounded' });
  const modalClose = div({ class: 'flex w-full h-14 justify-center mt-4 p-1' }, closeButton);
  const modalList = div({ class: 'flex flex-col gap-2' }, el);
  modalContent.append(modalList, modalClose);
  modal.append(modalContent);
  decorateIcons(modal);
  return modal;
}

function renderChapters(chapterItems) {
  const chaptersDesktopDiv = div({ class: 'hidden lg:flex flex-col items-start' });
  const chaptersMobileDiv = div({ class: 'max-h-96 lg:hidden [&_span]:pl-2 overflow-scroll pr-6 pl-6' });
  const url = new URL(window.location.href);
  const currentPage = url.pathname;
  const navHeadingDiv = p({ class: 'text-sm leading-6 font-semibold uppercase text-[#65797C] p-2' }, 'CHAPTERS');
  chapterItems.forEach((item) => {
    let chaptersEl;
    if (item.path === currentPage) {
      chaptersEl = div(
        {
          class: 'w-full border-b border-b-[#D8D8D8]',
        },
        div(
          {
            class: 'flex gap-3 text-sm leading-6 font-semibold text-black bg-[#EDF6F7] p-2',
          },
          item.title,
        ),
      );
    } else {
      chaptersEl = div(
        {
          class: 'w-full border-b border-b-[#D8D8D8]',
        },
        a(
          {
            href: makePublicUrl(item.path),
          },
          span({
            class: 'block text-sm leading-6 font-semibold text-[#378189] p-2 hover:underline',
          }, item.title),
        ),
      );
    }
    chaptersMobileDiv.append(chaptersEl);
  });
  chaptersMobileDiv.prepend(navHeadingDiv);
  chaptersDesktopDiv.innerHTML = chaptersMobileDiv.innerHTML;
  return { chaptersDesktopDiv, chaptersMobileDiv };
}

export default async function decorate(block) {
  const currentPage = window.location.pathname.split('/').pop();
  const parentURL = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
  const parentPage = parentURL.split('/').pop();
  const chapterItems = await ffetch('/en-us/technical-resources/guides/query-index.json')
    .filter((item) => {
      if (parentPage === 'guides') {
        return item.parent === currentPage;
      }
      return item.parent === parentPage;
    })
    .all();
  const chapters = chapterItems.map((element) => ({
    title: element.title.indexOf('| abcam') > -1 ? element.title.split('| abcam')[0] : element.title,
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
  const { chaptersDesktopDiv, chaptersMobileDiv } = renderChapters(filteredChapters);
  const modal = renderModal(chaptersMobileDiv);
  block.append(chaptersDesktopDiv, modal);

  // Create Show/Hide button - bottom of footer
  const footerEl = document.querySelector('footer');
  const toggleButton = button(
    {
      type: 'button',
      class: 'size-full flex items-center gap-x-3 justify-center focus:outline-none bg-black rounded-full text-white px-12 py-4',
      onclick: () => {
        modal.classList.toggle('-translate-y-full');
      },
    },
    span({ class: 'icon icon-chevron-right size-7 invert' }),
    'Browse Chapters',
  );
  decorateIcons(toggleButton);
  const stickyChapterLinks = div({ class: 'sticky bottom-0 block lg:hidden bg-transparent py-4 px-6' }, toggleButton);
  footerEl.after(stickyChapterLinks);
}
