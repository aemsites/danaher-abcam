import ffetch from '../../scripts/ffetch.js';
import { a, div, p } from '../../scripts/dom-builder.js';
import { makePublicUrl } from '../../scripts/scripts.js';

function renderChapters(chapterItems) {
  const chaptersDiv = div({ class: 'flex flex-col items-start pt-6' });
  chapterItems.forEach((item) => {
    chaptersDiv.append(div(
      {
        class: 'w-full',
      },
      div(
        {
          class: 'flex gap-3',
        },
        a({
          class: 'block text-sm leading-6 font-semibold text-[#378189] p-4 border-b border-b-[#D8D8D8] hover:underline',
          href: makePublicUrl(item.path),
        }, item.title),
      ),
    ));
  });
  return chaptersDiv;
}

export default async function decorate(block) {
  let chapterItems = [];
  let chaptersElements = div();
  chapterItems = await ffetch('/en-us/stories/query-index.json').all();
  const chapters = chapterItems.map((element) => ({
    title: element.title, description: element.description, path: element.path,
  }));
  const filteredChapters = chapters.filter((item) => item.title !== undefined);
  const navHeadingDiv = p({ class: 'text-sm leading-6 font-semibold uppercase text-[#65797C] px-4' }, 'CHAPTERS');
  chaptersElements = renderChapters(filteredChapters);
  block.append(navHeadingDiv, chaptersElements);
}
