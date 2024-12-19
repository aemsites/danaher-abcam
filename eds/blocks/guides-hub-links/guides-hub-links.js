import { getMetadata } from '../../scripts/aem.js';
import {
  div, h3, ul, li, a,
} from '../../scripts/dom-builder.js';
import ffetch from '../../scripts/ffetch.js';
import { buildCollectionSchema } from '../../scripts/schema.js';

export default async function decorate(block) {
  const template = getMetadata('template');
  if (template === 'guides-hub') {
    const currentPage = window.location.pathname.split('/').pop();
    let appGuides = await ffetch('/en-us/technical-resources/guides/query-index.json')
      .filter((item) => item.parent === currentPage)
      .filter((item) => item.tags.includes('application'))
      .all();

    appGuides = appGuides.sort((item1, item2) => item1.title.localeCompare(item2.title));
    const applicationGuidesDiv = div({ class: 'pt-6 basis-1/2' }, h3('By Application'), ul());
    appGuides.forEach((element) => {
      applicationGuidesDiv.querySelector('ul').appendChild(
        li(
          { class: 'mb-4 font-semibold text-lg text-[#378189] hover:underline' },
          a({ href: element.path }, element.title.replace(/\s*\|\s*abcam$/i, '')),
        ),
      );
    });

    let raGuides = await ffetch('/en-us/technical-resources/guides/query-index.json')
      .filter((item) => item.parent === currentPage)
      .filter((item) => item.tags.includes('research-areas'))
      .all();

    raGuides = raGuides.sort((item1, item2) => item1.title.localeCompare(item2.title));
    const raGuidesDiv = div({ class: 'pt-6 basis-1/2' }, h3('By Research area'), ul());
    raGuides.forEach((element) => {
      raGuidesDiv.querySelector('ul').appendChild(li({ class: 'mb-4 font-semibold text-lg text-[#378189] hover:underline' }, a({ href: element.path }, element.title.replace(/\s*\|\s*abcam$/i, ''))));
    });
    block.innerText = '';
    block.appendChild(div({ class: 'flex flex-col md:flex-row lg:gap-x-52' }, applicationGuidesDiv, raGuidesDiv));

    let allGuides = await ffetch('/en-us/technical-resources/guides/query-index.json')
      .filter((item) => item.parent === currentPage)
      .all();
    allGuides = allGuides.sort((item1, item2) => item1.title.localeCompare(item2.title));
    buildCollectionSchema(allGuides);
  } else if (template === 'cross-sell-hub') {
    let appGuides = await ffetch('/en-us/products/product-recommendations/query-index.json').all();

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
    block.appendChild(div({ class: 'flex flex-col md:flex-row lg:gap-x-52' }, applicationGuidesDiv));
  }
}
