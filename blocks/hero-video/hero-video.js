import { decorateIcons } from '../../scripts/aem.js';
import {
  div, iframe, span,
} from '../../scripts/dom-builder.js';

function toggleModalPopUp(parentDiv) {
  parentDiv.querySelector('.modal').classList.toggle('hidden');
}

function toggleModalPopUp1(modalPopUp) {
  modalPopUp.classList.toggle('hidden');
  const iframe1 = modalPopUp.querySelector('iframe');
  if (iframe1) {
    iframe1.src = '';
  }
}

function createModalPopUp(videoLink) {
  const modalPopUp = div(
    { class: 'modal hidden fixed z-30 m-0 p-0 w-full h-full' },
    div(
      { class: 'modal-content bg-black m-auto p-10 max-[576px]:px-2.5 max-[767px]:px-3.5 h-full w-full left-0 text-center' },
      div(
        { class: 'youtube-frame h-3/4 md:h-full' },
        span({ class: 'bg-black close-btn float-right icon icon-close absolute right-[0px] top-[-30px] cursor-pointer p-[10px]', onclick: () => toggleModalPopUp1(modalPopUp) }),
        iframe({
          class: 'm-0 p-0 w-full h-full',
          src: videoLink,
          loading: 'lazy',
          style: 'border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;',
          allow: 'autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture',
          allowfullscreen: '',
          scrolling: 'no',
          title: 'Content from Youtube',
        }),
      ),

    ),
  );
  decorateIcons(modalPopUp);
  return modalPopUp;
}

function loadVideo(parentDiv, link) {
  const linkDiv = div({ class: 'md:basis-1/2' });
  link.classList.add('relative', 'hover:scale-125');
  link.textContent = '';
  parentDiv.querySelector('img[alt="thumbnail"]')?.classList.add(...'max-[767px]:h-[457px] max-[767px]:w-auto object-cover h-full'.split(' '));
  const thumbnailImage = parentDiv.querySelector('img[alt="thumbnail"]')?.closest('p');
  const playButton = parentDiv.querySelector('img[alt="play button"]')?.closest('p');
  playButton.addEventListener('click', (e) => {
    e.preventDefault();
    toggleModalPopUp(parentDiv);
  });
  thumbnailImage?.classList.add('relative', 'h-full');
  thumbnailImage?.querySelector('a')?.remove();
  playButton?.closest('p')?.classList.add('absolute');
  const divCenter = div({ class: 'flex flex-col items-center justify-center max-[767px]:h-[28.563rem] max-[767px]:w-full h-full' });
  divCenter.append(thumbnailImage, playButton);
  link.append(divCenter);
  linkDiv.append(link);
  parentDiv.append(linkDiv);
}

function loadContent(divEl) {
  divEl.querySelector('img[alt="top image"]')?.classList.add(...'w-[500px] h-[220px] object-contain max-[767px]:w-[8.438rem] max-[767px]:h-[4.375rem] max-[1199px]:w-[300px] max-[767px]:h-[200px]'.split(' '));
  divEl.querySelector('img[alt="bottom image"]')?.classList.add(...'w-[500px] h-[220px] object-contain max-[767px]:w-[8.438rem] max-[767px]:h-[4.375rem] max-[1199px]:w-[300px] max-[767px]:h-[200px]'.split(' '));
  divEl.querySelector('img[alt="top image"]')?.closest('p')?.classList.add(...'flex flex-row justify-start max-[767px]:justify-center'.split(' '));
  divEl.querySelector('img[alt="bottom image"]')?.closest('p')?.classList.add(...'flex flex-row justify-end max-[767px]:justify-center'.split(' '));
}

export default function decorate(block) {
  const parentDiv = block;
  block.classList.add('main-container');
  block.classList.add(...'max-w-full flex md:flex-row md:justify-between flex-col'.split(' '));
  const firstDiv = block.querySelector('div');
  firstDiv.classList.add(...'p-8 md:basis-1/2'.split(' '));
  const h2 = block.querySelector('h2');
  const h2Div = h2.closest('div');
  const description = h2Div.querySelector('p:not(:first-child)');
  description.classList.add(...'font-light text-[24px] leading-[1.9rem] max-[480px]:text-[20px] max-[480px]:leading-[27px] max-[767px]:text-[24px] max-[767px]:leading-[31px] max-[991px]:text-3xl max-[1200px]:text-[30px] max-[1200px]:leading-[1.9rem]'.split(' '));
  const divCenter = div({ class: 'py-6 px-24 max-[1024px]:px-0 text-center' });
  firstDiv.querySelector('img[alt="top image"]')?.closest('p').after(divCenter);
  divCenter.append(h2, description);
  const divEl = parentDiv.querySelectorAll('div');
  divEl.forEach((divElement) => {
    const link = parentDiv.querySelector('div p a');
    if (link) {
      loadVideo(parentDiv, link);
      parentDiv.append(createModalPopUp(link.href));
    } else {
      loadContent(divElement);
    }
  });

  if (block.classList.contains('left-video')) {
    block.classList.add('flex-col', 'md:flex-row-reverse');
  }
}
