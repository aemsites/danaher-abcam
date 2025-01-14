import { getMetadata } from '../../scripts/aem.js';
import { div, p } from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

export function getContentType(pageTags) {
  const tags = pageTags || getMetadata('pagetags');
  let type = null;
  tags?.split(',').forEach((tag) => {
    if (tag.includes('content-type')) {
      type = tag.split('/').pop();
    }
  });
  return type;
}

export default function decorate(block) {
  block.querySelector('h1').classList.add(...'my-5 text-black-0 !text-3xl md:!text-4xl lg:!text-6xl font-semibold !tracking-wider'.split(' '));
  block.querySelector('h1').after(p({ class: 'w-1/6 mb-5 border-t-4 border-[#ff7223]' }));
  const description = block.querySelector('p:nth-of-type(2)');
  if (description) description.classList.add(...'text-lg tracking-[0.3px] leading-7'.split(' '));
  if (block && block.classList.contains('title-image')) {
    const template = getMetadata('template');
    block.parentElement.parentElement.classList.add('relative');
    block.querySelector('h1').parentElement.parentElement.classList.add(...'xl:min-h-[400px] w-full lg:w-1/2 lg:py-6 lg:pr-6'.split(' '));
    applyClasses(block, 'text-center-align image-full-width font-sans text-base flex flex-col gap-y-6 pb-4 px-6 lg:pr-0 justify-center lg:flex-row xl:container xl:max-w-7xl mx-auto items-center');
    if (getContentType() && template === 'stories') {
      block.firstElementChild?.firstElementChild
        ?.prepend(
          div(
            { class: 'font-[rockwell] text-sm leading-4 text-[#435656] capitalize mb-2' },
            getContentType(),
          ),
        );
    }
    const image = block.querySelector('picture');
    if (image) {
      image.parentElement.parentElement.classList.add(...'w-full lg:w-1/2 my-auto'.split(' '));
      const titleImage = block.querySelector('img');
      if (template === 'cross-sell-detail') {
        applyClasses(titleImage, 'w-full h-48 md:h-[400px] object-cover relative xl:w-1/2 xl:absolute xl:right-0 xl:top-0');
      } else {
        applyClasses(titleImage, 'w-full h-48 md:h-[400px] object-cover relative xl:w-1/2 xl:absolute xl:right-0 xl:top-28');
      }
    } else {
      const video = block.querySelector('a');
      video.parentElement.parentElement.parentElement.classList.add(...'w-full lg:w-1/2 my-auto'.split(' '));
    }
    const subTitleEl = block.querySelector('h4');
    if (subTitleEl) {
      applyClasses(subTitleEl, 'text-xs text-[#378189] bg-[#EDF6F7] font-semibold rounded py-1 px-2');
      const divEl = div({ class: 'flex md:inline-flex text-align-center items-center justify-between w-full' });
      divEl.append(subTitleEl);
      block.querySelector('h1').parentElement.parentElement.prepend(divEl);
    }
    const readingTime = getMetadata('readingtime');
    const expectedPublishFormat = new Date(getMetadata('publishdate'));
    if (readingTime && !Number.isNaN(expectedPublishFormat.getTime())) {
      const formattedDate = `${expectedPublishFormat.toLocaleString('default', { month: 'long' })} ${expectedPublishFormat.getDate()} ${expectedPublishFormat.getFullYear()} | ${readingTime} Mins`;
      const readDateTimeDiv = div(
        {
          class: 'readdatetime font-normal text-sm leading-4 text-[#8B8B8B] capitalize mb-2 pt-4', // Valid class name
        },
        formattedDate, // Correctly pass the formatted date as the content
      );
      block.querySelector('h1').parentElement.parentElement.append(readDateTimeDiv);
    }
    const buttonEl = block.querySelector('.button-container');
    if (buttonEl) {
      applyClasses(buttonEl, 'mt-8 md:mt-12');
      block.querySelector('h1').parentElement.parentElement.append(buttonEl);
    }
  } else {
    applyClasses(block, 'mx-auto max-w-7xl px-4 pb-4 font-sans text-base md:flex flex-col justify-center');
  }
  block.querySelectorAll('div').forEach((divEle) => {
    if (!divEle.textContent.trim() && !divEle.querySelector('picture')) {
      divEle.remove();
    }
  });
}
