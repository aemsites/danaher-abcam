import {
  div, h2, ul, li, a,
} from '../../scripts/dom-builder.js';
import ffetch from '../../scripts/ffetch.js';

export default async function decorate(block) {
  const currentPage = window.location.pathname.split('/').pop();
  let appGuides = await ffetch('/en-us/technical-resources/guides/query-index.json')
    .filter((item) => item.parent === currentPage)
    .filter((item) => item.tags.includes('application'))
    .all();

  appGuides = appGuides.sort((item1, item2) => item1.title.localeCompare(item2.title));
  const applicationGuidesDiv = div({ class: 'pt-6 pl-6' }, h2('By Application'), ul());
  appGuides.forEach((element) => {
    applicationGuidesDiv.querySelector('ul').appendChild(
      li(
        { class: 'mb-1 font-semibold text-lg text-[#378189] hover:underline' },
        a({ href: element.path }, element.title.replace(/\s*\|\s*abcam$/i, '')),
      ),
    );
  });

  let raGuides = await ffetch('/en-us/technical-resources/guides/query-index.json')
    .filter((item) => item.parent === currentPage)
    .filter((item) => item.tags.includes('research-areas'))
    .all();

  raGuides = raGuides.sort((item1, item2) => item1.title.localeCompare(item2.title));
  const raGuidesDiv = div({ class: 'pt-6 pl-6' }, h2('By Research area'), ul());
  raGuides.forEach((element) => {
    raGuidesDiv.querySelector('ul').appendChild(li({ class: 'mb-1 font-semibold text-lg text-[#378189]' }, a({ href: element.path }, element.title.replace(/\s*\|\s*abcam$/i, ''))));
  });
  block.innerText = '';
  block.appendChild(div({ class: 'flex flex-col md:flex-row lg:gap-x-52' }, applicationGuidesDiv, raGuidesDiv));
}
