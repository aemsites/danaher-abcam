import ffetch from '../../scripts/ffetch.js';
import { a, div, p } from '../../scripts/dom-builder.js';
import { makePublicUrl } from '../../scripts/scripts.js';

function renderChapters(chapterItems) {
  const chaptersDiv = div({ class: 'flex flex-col items-start pt-6' });
  chapterItems.forEach((item) => {
    chaptersDiv.append(div(
      {
        class: 'w-full border-b border-b-[#D8D8D8]',
      },
      div(
        {
          class: 'flex gap-3',
        },
        a({
          class: 'block text-sm leading-6 font-semibold text-[#378189] p-2 hover:underline',
          href: makePublicUrl(item.path),
        }, item.title),
      ),
    ));
  });
  return chaptersDiv;
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
    description: element.description,
    path: element.path,
  }));
  const filteredChapters = chapters.filter((item) => item.title !== undefined);
  const navHeadingDiv = p({ class: 'text-sm leading-6 font-semibold uppercase text-[#65797C] p-2' }, 'CHAPTERS');
  if (chapters.length > 0) block.append(navHeadingDiv, renderChapters(filteredChapters));
}
