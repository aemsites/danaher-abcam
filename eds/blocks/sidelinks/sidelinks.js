import { p } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const main = document.querySelector('.sidelinks-container .w-full .default-content-wrapper');
  const divEl = block.querySelector('div > div');
  divEl.classList.add(...'sidelinks leading-5 text-sm font-bold text-black flex flex-col gap-y-3'.split(' '));
  const allParagraphs = main.querySelectorAll('p a[title="link"]');
  const linkHeading = 'Explore our products';
  if (allParagraphs.length > 0) {
    divEl.append(p(linkHeading));
    allParagraphs.forEach((elPara) => {
      elPara.classList.add(...'border-b border-b-gray-300 py-2 mx-0 w-auto mt-2 pb-3'.split(' '));
      divEl.append(p({ class: 'leading-5 text-base font-medium text-[#378189]' }, elPara));
    });
  }
}
