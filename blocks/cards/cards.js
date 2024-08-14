import { ul, li, div } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  block.classList.add(...'w-4/5 m-auto mb-8'.split(' '));
  const cardsUl = ul({ class: 'cards-ul grid grid-cols-3 gap-11 max-[799px]:grid-cols-1' });

  [...block.children].forEach((row) => {
    const pictureTag = row.querySelector('picture');
    const cardHeading = row.querySelector('h3');
    //cardHeading.classList.add(...'card-heading text-2xl tracking-[-0.03em]'.split(' '));

    const cardDescription = row.querySelector('p');
    if (cardDescription) {
      cardDescription.classList.add(...'card-description h-full mt-2.5 mb-3 text-base tracking-wide'.split(' '));
    }

    const cardLink = row.querySelector('p a');
    if (cardLink) {
      cardLink.classList.add(...'card-link w-fit text-sm text-white bg-[#2A5F65] hover:bg-[#255159] py-2.5 px-5 rounded-[28px]'.split(' '));
    }


      const cardsLi = li({ class: 'cards-li flex flex-col bg-[#e5e7eb]' });

      const cardContentDiv = div({ class: 'cards-card-body py-9 px-8 flex flex-col grow' });

      cardContentDiv.append(cardHeading);
      cardContentDiv.append(cardDescription);
      cardContentDiv.append(cardLink);

      // const imgTag = pictureTag.querySelector('img');
      // if (imgTag) {
      //   imgTag.classList.add('max-[799px]:w-full');
      // }

      cardsLi.append(pictureTag);
      cardsLi.append(cardContentDiv);
      cardsUl.append(cardsLi);
  });

  block.append(cardsUl);
  // parentDiv.append(cardsUl);
}
