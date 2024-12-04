import {
  div, ul, li, a,
} from '../../scripts/dom-builder.js';
import ffetch from '../../scripts/ffetch.js';
import { buildCollectionSchema } from '../../scripts/schema.js';

export default async function decorate(block) {
  // const currentPage = window.location.pathname.split('/').pop();
  let appGuides = await ffetch('/en-us/technical-resources/protocols/query-index.json').all();

  appGuides = appGuides.sort((item1, item2) => item1.title.localeCompare(item2.title));
  const applicationGuidesDiv = div({ class: 'pt-6 basis-1/2' }, ul());
  appGuides.forEach((element) => {
    applicationGuidesDiv.querySelector('ul').appendChild(
      li(
        { class: 'mb-4 font-semibold text-lg text-[#378189] hover:underline' },
        a({ href: element.path }, element.title.replace(/\s*\|\s*abcam$/i, '')),
      ),
    );
  });
  block.innerText = '';
  block.appendChild(div({ class: '' }, applicationGuidesDiv));

  let allGuides = await ffetch('/en-us/technical-resources/protocols/query-index.json')
    // .filter((item) => item.parent === currentPage)
    .all();
  allGuides = allGuides.sort((item1, item2) => item1.title.localeCompare(item2.title));
  buildCollectionSchema(allGuides);
}
