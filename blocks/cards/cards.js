import { createOptimizedPicture } from '../../scripts/aem.js';
import {
  a, div,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
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
  block.classList.add(...'w-4/5 m-auto mb-8'.split(' '));
  block.querySelectorAll('img').forEach((img) => {
    const picture = img.closest('picture');
    const pTag = picture.closest('p');
    pTag.classList.add('cards-card-image');
    const cardImage = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    const imgTag = cardImage.querySelector('img');
    imgTag.classList.add('max-[799px]:w-full');
    if (picture) picture.replaceWith(cardImage);
  });
  [...block.children].forEach((row, index) => {
    if (index === 0) {
          const heading = row.querySelector('h2');
        if (heading) heading.className = 'card-title text-5xl mb-8 mt-[72px]';
        } else {
          const cardWrapper = row.querySelector('div');
          cardWrapper.className = 'cards-li flex flex-col bg-[#e5e7eb]';
          [...row.children].forEach((elem) => {
            //cardWrapper.append(elem);
            // if (elem.querySelector('.cards-card-image')) {
            //   elem.className = '';
            // } else {
            //   elem.className = 'cards-card-body py-9 px-8 flex flex-col grow';
            // }
            if (row?.querySelector('h3')) row.querySelector('h3').className = 'card-heading text-2xl tracking-[-0.03em]';
            if (row?.querySelector('p')) row.querySelector('p').className = 'card-description h-full mt-2.5 mb-3 text-base tracking-wide';
            if (row?.querySelector('p a')) row.querySelector('p a').className = 'card-link w-fit text-sm text-white bg-[#2A5F65] hover:bg-[#255159] py-2.5 px-5 rounded-[28px]';
            row.append(cardWrapper);
          });
        }
  });
}
