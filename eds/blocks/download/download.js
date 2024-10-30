import {
  div, h6, a, p,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const titleEl = block.querySelector('h6');
  const docTitle = titleEl.textContent;
  const downloadLink = block.querySelector('p > a');
  const linkText = downloadLink.textContent;
  const linkHref = downloadLink.href;
  const docTypeEl = block.querySelector('p');
  const docType = docTypeEl.textContent;
  const downloadDiv = div(
    { class: 'flex flex-col bg-[#f2f2f2] rounded-lg p-6 max-w-[544px] mt-6 mb-2' },
    h6({ class: 'download-title' }, docTitle),
    a({
      class: 'button w-fit my-4 bg-black hover:bg-[#3B3B3B] h-10 whitespace-nowrap rounded-[28px] py-2.5 px-5 text-white text-sm capitalize',
      href: linkHref,
    }, linkText),
    p({ class: 'text-xs text-black-0' }, docType),
  );
  block.innerHTML = '';
  block.append(downloadDiv);
}
