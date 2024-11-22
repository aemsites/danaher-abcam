import { div } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  block.querySelector('h1').classList.add(...'my-5 text-black-0 !text-3xl md:!text-4xl lg:!text-6xl font-semibold !tracking-wider'.split(' '));
  block.querySelector('h1').after(div({ class: 'w-1/6 mb-5 border-t-4 border-[#ff7223]' }));
  block.querySelector('p').classList.add(...'text-lg tracking-[0.3px] leading-7'.split(' '));
  if (block && block.classList.contains('title-image')) {

    block.querySelector('h1').parentElement.parentElement.classList.add(...'2xl:h-[400px] w-full lg:w-1/2 flex lg:py-6 lg:pr-6 items-center'.split(' '));
    block.classList.add(...'text-center-align image-full-width font-sans text-base flex flex-col gap-y-6 px-6 lg:pr-0 justify-center lg:flex-row 2xl:container 2xl:max-w-7xl mx-auto'.split(' '));
    
    const image = block.querySelector('picture');
    image.parentElement.parentElement.classList.add(...'w-full lg:w-1/2 my-auto'.split(' '));

    const titleImage = block.querySelector('img');
    titleImage.classList.add(...'w-full h-48 md:h-[400px] object-cover relative 2xl:w-1/2 2xl:absolute 2xl:right-0 2xl:top-36'.split(' '));

  } else {
    block.classList.add(...'mx-auto max-w-7xl px-4 pb-4 font-sans text-base md:flex flex-col justify-center'.split(' '));
  }
}
