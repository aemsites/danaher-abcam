import {
  div, img, p,
} from '../../scripts/dom-builder.js';
import {
  getMetadata, decorateIcons,
} from '../../scripts/aem.js';

export default function decorate(block) {
  block.innerHTML = '';
  const authorName = getMetadata('authorname');
  const authorJobTitle = getMetadata('authortitle');
  const authorDesc = getMetadata('authordecsription');
  const authorImage = getMetadata('authorimage');

  block.append(
    div(
      { class: 'mx-auto' },
      p(
        { class: 'leading-6 text-2xl font-bold text-black pt-10' },
        'Speakers',
      ),
      div(
        { class: 'items-center flex justify-start my-4 w-full col-span-2' },
        div(
          { class: 'space-y-1' },
          div({ class: 'text-normal font-semibold text-[#2A3C3C]' }, authorName),
          div({ class: 'text-sm font-normal leading-6 text-[#65797C] w-full' }, authorJobTitle),
          div({ class: 'text-lg font-normal text-[#071112] leading-7 tracking-normal w-full' }, authorDesc),
        ),
      ),
    ),
  );
  if (authorImage) {
    const items = block.querySelector('.items-center');
    items.insertBefore(img({ class: 'h-16 w-16 rounded-full lg:h-20 lg:w-20 mr-7', src: authorImage, alt: authorName }), items.firstChild);
    const imageEl = block.querySelector('.speakersinfo')?.querySelector('.items-center')?.querySelector('img');
    imageEl.remove();
    block.querySelector('.speakersinfo')?.firstChild?.prepend(imageEl);
  }
  decorateIcons(block);
}
