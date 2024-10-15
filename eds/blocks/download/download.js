import {
  div, h6, a, p,
} from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';

export default function decorate(block) {
  const ogTitle = getMetadata('og:title');
  const title = ogTitle.indexOf('| abcam') > -1 ? ogTitle.split('| abcam')[0] : ogTitle;
  let linkText;
  let linkHref;
  let docType;
  let downloadDiv;
  block.querySelectorAll('p').forEach((element) => {
    if (element.querySelector('a')) {
      linkText = element.textContent;
      linkHref = element.href;
    } else {
      docType = element.textContent;
    }
    downloadDiv = div(
      { class: 'flex flex-col bg-[#f2f2f2] rounded-lg p-6 max-w-[544px] mt-6 mb-2' },
      h6({ class: 'download-title' }, `${title}`),
      a({
        class: 'button w-fit my-4 bg-black hover:bg-[#3B3B3B] h-10 whitespace-nowrap rounded-[28px] py-2.5 px-5 text-white text-sm capitalize',
        href: linkHref,
      }, linkText),
      p({ class: 'text-xs text-black-0' }, docType),
    );
  });
  block.innerHTML = '';
  block.append(downloadDiv);
}
