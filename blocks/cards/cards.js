import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cardBlocks = document.querySelectorAll('.cards');
  cardBlocks.forEach((parentDiv) => {
    parentDiv.classList.add(...'w-4/5 m-auto mb-8'.split(' '));
  });
  // const cardsTitle = document.querySelector('h2');
  // cardsTitle.classList.add(...'text-5xl mb-8 mt-[72px]'.split(' '));
  //cardWrapper.className = 'cards-ul grid grid-cols-3 gap-11 max-[799px]:grid-cols-1';
  // [...block.children].forEach((row, index) => {
  //   if (index === 0) {
  //     const heading = row.querySelector('h2');
  //   if (heading) heading.className = 'card-title text-5xl mb-8 mt-[72px]';
  //   } else {
  //     const cardWrapper = row.querySelector('div');
  //     cardWrapper.className = 'cards-li flex flex-col bg-[#e5e7eb]';
  //     [...row.children].forEach((elem) => {
  //       cardWrapper.append(elem);
  //       if (elem.querySelector('picture, img')) {
  //         elem.className = 'cards-card-image';
  //       } else {
  //         elem.className = 'cards-card-body py-9 px-8 flex flex-col grow';
  //       }
  //       if (row?.querySelector('h3')) row.querySelector('h3').className = 'card-heading text-2xl tracking-[-0.03em]';
  //       if (row?.querySelector('p')) row.querySelector('div > div > div change> p').className = 'card-description h-full mt-2.5 mb-3 text-base tracking-wide';
  //       if (row?.querySelector('p a')) row.querySelector('p a').className = 'card-link w-fit text-sm text-white bg-[#2A5F65] hover:bg-[#255159] py-2.5 px-5 rounded-[28px]';
  //       row.append(cardWrapper);
  //     });
  //   }
  //   //   const cardContainer = document.createElement('div');
  //   //   cardContainer.className = '';
  //   //   cardWrapper.append(cardContainer);
  //   //   const image = row.querySelector('picture, img')
  //   //   if(image) {
  //   //     image.className = 'cards-card-image';
  //   //   } else {
  //   //       row.className = 'cards-card-body py-9 px-8 flex flex-col grow';
  //   //     }
  //   //     if (row?.querySelector('h3')) row.querySelector('h3').className = 'card-heading text-2xl tracking-[-0.03em]';
  //   //     //if (row?.querySelector('div > div > div > p')) row.querySelector('div > div > div change> p').className = 'card-description h-full mt-2.5 mb-3 text-base tracking-wide';
  //   //     if (row?.querySelector('div > p')) row.querySelector('p a').className = 'card-link w-fit text-sm text-white bg-[#2A5F65] hover:bg-[#255159] py-2.5 px-5 rounded-[28px]';
  //   //   }
  //    });
  // block.querySelectorAll('img').forEach((img) => {
  //   img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  // });

  [...block.children].forEach((row) => {
    let type = '';
    const heading = row.querySelector('h2');
    if (heading) heading.className = 'card-title text-gray-900 my-2 font-extrabold text-3xl py-2';
    const h3Heading = row.querySelector('h3');
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
  block.querySelectorAll('img').forEach((img) => {
    const picture = img.closest('picture');
    const cardImage = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    if (block.classList.contains('opco')) { cardImage.querySelector('img').className = 'h-48 w-full rounded-t !object-contain'; }
    if (picture) picture.replaceWith(cardImage);
  });
}
