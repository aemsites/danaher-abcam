import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cardBlocks = document.querySelectorAll('.cards');
  cardBlocks.forEach((parentDiv) => {
    parentDiv.classList.add(...'w-4/5 m-auto mb-8'.split(' '));
  });
  /* change to ul, li */
  const ul = document.createElement('ul');
  ul.classList.add(...'cards-ul grid grid-cols-3 gap-11 max-[799px]:grid-cols-1'.split(' '));
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add(...'cards-li flex flex-col bg-[#e5e7eb]'.split(' '));
    const pictureTag = row.querySelector('picture');
    const imgTag = pictureTag.querySelector('img');
    if (imgTag) {
      imgTag.classList.add('max-[799px]:w-full');
    }
    const cardHeading = row.querySelector('div > h2');
    cardHeading.classList.add(...'card-heading text-2xl tracking-[-0.03em]'.split(' '));

    const cardDescription = row.querySelector('p');
    if (cardDescription) {
      cardDescription.classList.add(...'card-description h-full mt-2.5 mb-3 text-base tracking-wide'.split(' '));
    }
    const cardLink = row.querySelector('p a');
    if (cardLink) {
      cardLink.classList.add(...'card-link w-fit text-sm text-white bg-[#2A5F65] hover:bg-[#255159] py-2.5 px-5 rounded-[28px]'.split(' '));
    }
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body py-9 px-8 flex flex-col grow';
    });
    ul.append(li);
  });
  ul.querySelectorAll('li > picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
