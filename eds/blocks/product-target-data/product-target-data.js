import { getProductResponse } from '../../scripts/search.js';
import {
  div, h3, a, span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

export default async function decorate(block) {
  const response = await getProductResponse();
  const targetData = response[0].raw.target;
  if (targetData) {
    const { href } = window.location;
    const targetContainer = div(
      { class: 'py-2 flex flex-col' },
      h3({ class: 'text-lg mb-3  text-black-0' }, 'Target data'),
      a(
        { class: 'w-fit inline-flex items-center underline text-[#378189]', href },
        `${targetData}`,
        span({ class: 'icon icon-share-icon size-4 ml-2' }),
      ),
    );
    decorateIcons(targetContainer);
    block.append(targetContainer);
  }
}
