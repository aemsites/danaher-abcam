import { decorateIcons } from '../../scripts/aem.js';
import {
  div, a, iframe, span,
} from '../../scripts/dom-builder.js';

// Adding block children to DOM structure
function assignChildrentToDOM(mainContainer, block) {
  const topImage = block.firstElementChild.firstElementChild.firstElementChild;
  const headingText = block.firstElementChild.firstElementChild.querySelector('h2');
  const text = block.firstElementChild.firstElementChild.children[2];
  const bottomImage = block.firstElementChild.firstElementChild.children[3];
  topImage.querySelector('img')?.classList.add(...'w-[500px] h-[220px] object-contain max-[767px]:w-[8.438rem] max-[767px]:h-[4.375rem] max-[1199px]:w-[300px] max-[767px]:h-[200px]'.split(' '));
  bottomImage.querySelector('img')?.classList.add(...'w-[500px] h-[220px] object-contain max-[767px]:w-[8.438rem] max-[767px]:h-[4.375rem] max-[1199px]:w-[300px] max-[767px]:h-[200px]'.split(' '));
  mainContainer.querySelector('.left-top-container').append(topImage);
  mainContainer.querySelector('.heading-container').append(headingText);
  mainContainer.querySelector('.text-container').append(text);
  mainContainer.querySelector('.left-bottom-container').append(bottomImage);

  const mainImg = block.firstElementChild.children[1].firstElementChild.querySelector('picture');
  const playImg = block.firstElementChild.children[1].children[1].querySelector('picture');

  mainContainer.querySelector('.video-img').append(mainImg);
  mainContainer.querySelector('.video-img').querySelector('img').classList.add(...'max-[767px]:h-[457px] max-[767px]:w-auto object-cover h-full'.split(' '));
  mainContainer.querySelector('.play-video').append(playImg);
  // mainContainer.querySelector('.video-link-img').setAttribute('href', videoLink);
}

function createModalPopUp(videoLink) {
  const modalPopUp = div(
    { class: 'modal hidden fixed z-30 m-0 p-0 w-full h-full' },
    div(
      { class: 'modal-content bg-black m-auto p-10 max-[576px]:px-2.5 max-[767px]:px-3.5 h-full w-full left-0 text-center' },
      div(
        { class: 'youtube-frame h-3/4 md:h-full' },
        span({ class: 'close-btn float-right icon icon-close' }),
        iframe({ class: 'm-0 p-0 w-full h-full', src: videoLink }),
      ),

    ),
  );
  decorateIcons(modalPopUp);
  return modalPopUp;
}

function showModalPopUp(mainContainer) {
  mainContainer.querySelector('.play-video')?.addEventListener('click', () => {
    mainContainer.querySelector('.modal').classList.toggle('hidden');
  });
}
function hideModalPopUp(mainContainer) {
  mainContainer.querySelector('.close-btn, .modal-content')?.addEventListener('click', () => {
    mainContainer.querySelector('.modal').classList.toggle('hidden');
  });
}

function createDOMstructure(block) {
  const mainContainer = div(
    { class: 'main-container max-w-full flex md:flex-row md:justify-between' },
    div(
      { class: 'left-container p-8 md:basis-1/2' },
      div({ class: 'left-top-container flex flex-row justify-start max-[767px]:justify-center' }),
      div(
        { class: 'left-middle-container py-6 px-24 max-[1024px]:px-0 text-center' },
        div({ class: 'heading-container pb-6 text-[83px] leading-[70px] max-[480px]:text-[24px] max-[480px]:leading-[24px] max-[640px]:text-[35px] max-[767px]:text-[45px] max-[767px]:leading-[45px] max-[992px]:text-[55px] max-[992px]:leading-[45px] max-[1199px]:text-[69px] max-[1199px]:leading-[50px]' }),
        div({ class: 'text-container font-light text-[24px] leading-[1.9rem] max-[480px]:text-[20px] max-[480px]:leading-[27px] max-[767px]:text-[24px] max-[767px]:leading-[31px] max-[991px]:text-3xl max-[1200px]:text-[30px] max-[1200px]:leading-[1.9rem]' }),
      ),
      div({ class: 'left-bottom-container flex flex-row justify-end max-[767px]:justify-center' }),
    ),
    div(
      { class: 'right-container md:basis-1/2' },
      a(
        { class: 'video-link-img relative hover:scale-125' },
        div(
          { class: 'video-play flex flex-col items-center justify-center max-[767px]:h-[28.563rem] max-[767px]:w-full h-full' },
          div({ class: 'video-img h-full' }),
          div({ class: 'play-video absolute' }),
        ),
      ),
    ),
  );
  assignChildrentToDOM(mainContainer, block);
  if (block.classList.contains('right-video')) {
    mainContainer.classList.add('flex-col');
  } else if (block.classList.contains('left-video')) {
    mainContainer.classList.add(...'md:flex-row-reverse'.split(' '));
  }
  const videoLink = block.firstElementChild.children[1].firstElementChild.querySelector('a').href;
  mainContainer.append(createModalPopUp(videoLink));
  showModalPopUp(mainContainer);
  hideModalPopUp(mainContainer);
  return mainContainer;
}

export default function decorate(block) {
  block.classList.add(...'bg-black text-white'.split(' '));
  const m = createDOMstructure(block);
  block.innerHTML = '';
  block.append(m);
}
