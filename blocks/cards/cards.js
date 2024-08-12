import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cardBlocks = document.querySelectorAll('.cards');
  cardBlocks.forEach((parentDiv) => {
    parentDiv.classList.add(...'w-4/5 m-auto mb-8'.split(' '));
  });
  const cardsTitle = document.querySelector('h2');
  cardsTitle.classList.add(...'text-5xl mb-8 mt-[72px]'.split(' '));
  [...block.children].forEach((row) => {
    let type = '';
    const h3Heading = row.querySelector('h3');
    h3Heading.className = 'card-heading text-2xl tracking-[-0.03em]';
    const typeP = h3Heading?.previousElementSibling;
    if (typeP) {
      type = typeP.textContent;
      typeP.remove();
      block.classList.add(type.toLowerCase());
    }
    const readMoreLink = row.querySelector('a');
    const cardWrapper = (readMoreLink)
      ? a({ href: makePublicUrl(readMoreLink.href), title: readMoreLink.title })
      : div();
    cardWrapper.className = 'card-wrapper flex flex-col col-span-1 mx-auto justify-center max-w-xl overflow-hidden pl-8 pr-2 border-l-[0.5px] border-gray-300 transform transition duration-500 hover:scale-105';
    if (!block.classList.contains('opco')) cardWrapper.classList.remove(...'border-l-[0.5px] border-gray-300 pl-8 pr-2 transform transition duration-500 hover:scale-105'.split(' '));
    if (!type) cardWrapper.classList.add('...cursor-pointer relative transform transition duration-500 border hover:scale-105 shadow-lg rounded-lg'.split(' '));
    row.append((heading) || '');
    [...row.children].forEach((elem) => {
      cardWrapper.append(elem);
      if (elem.querySelector('picture, img')) {
        elem.className = 'cards-card-image h-52 leading-5';
      } else {
        elem.className = 'cards-card-body p-4 bg-white rounded-b px-0 py-2';
      }
      if (elem?.querySelector('h3')) elem.querySelector('h3').className = '!line-clamp-2 !h-16';
      if (elem?.querySelector('h3') && !block.classList.contains('opco')) elem.querySelector('h3').className = 'pl-2 text-lg font-semibold text-danahergray-900 !line-clamp-3 !break-words !h-24';
      if (elem?.querySelector('p')) elem.querySelector('p').className = 'mb-4 text-sm !h-20 !line-clamp-4 !break-words';
      if (elem?.querySelector('p') && !block.classList.contains('opco')) elem.querySelector('p').className = 'pl-2 mb-4 text-sm !h-20 !line-clamp-4 !break-words';
      row.append(cardWrapper);
    });
    if (readMoreLink) {
      readMoreLink.innerHTML += ' &rarr;';
      if (block.classList.contains('opco')) { readMoreLink.className = 'card-link inline-flex w-full pt-5 text-base text-danaherpurple-500 font-semibold'; } else readMoreLink.className = 'pl-2 card-link inline-flex w-full pt-5 text-base text-danaherpurple-500 font-semibold';
      row.querySelector('div.cards-card-body').append(readMoreLink);
    }
  });
}
