import ffetch from '../../scripts/ffetch.js';
import { a, div, p, } from '../../scripts/dom-builder.js';
import { makePublicUrl } from '../../scripts/scripts.js';

function renderChapters(navItems) {
  const navElements = div({ class: 'flex flex-col items-start pt-6' });
  navItems.forEach((navItem) => {
    navElements.append(div(
      {
          class: 'w-full',
      },
      div(
          {
            class: 'flex gap-3',
          },
          a({
            class: 'block text-sm leading-6 font-semibold text-[#378189] p-4 border-b border-b-[#D8D8D8] hover:underline',
            href: makePublicUrl(navItem.path),
          }, navItem.title),
      ),
      ));
  });
  return navElements;
}

export default async function decorate(block) {
  let navItems = [];
  let chaptersElements = div();
  navItems = await ffetch('/en-us/stories/query-index.json').all();
  const chapters = navItems.map((element) => {
    return {
      title: element.title,
      description: element.description,
      path: element.path,
    };
  });
  const filteredChapters = chapters.filter((item) => item.title !== undefined);
  const navHeadingDiv = p({ class: 'text-sm leading-6 font-semibold uppercase text-[#65797C] px-4' }, 'CHAPTERS');
  chaptersElements = renderChapters(filteredChapters);
  block.append(navHeadingDiv, chaptersElements);
}