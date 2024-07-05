import {
  div, h6, a, p,
} from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';

export default function decorate(block) {
  const title = getMetadata('og:title');
  const { href } = window.location;
  const downloadBlock = div(
    { class: 'flex flex-col bg-[#f2f2f2] rounded-lg p-6 max-w-[544px] mb-10' },
    h6({ class: 'download-title' }, `${title}`),
    a({
      class: 'button w-fit my-4 bg-black hover:bg-[#3B3B3B] h-10 whitespace-nowrap rounded-[28px] py-2.5 px-5 text-white text-sm capitalize',
      href,
    }, 'Download'),
    p({ class: 'text-xs text-black-0' }, 'PDF'),
  );
  block.append(downloadBlock);
}
