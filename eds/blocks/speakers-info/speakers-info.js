import {
  createOptimizedPicture, decorateIcons,
} from '../../scripts/aem.js';
import {
  div, span,
} from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

export default function decorate(block) {
  const parentBlock = block?.parentElement.parentElement;
  const parentBlockTitle = parentBlock?.firstElementChild?.querySelector('p');
  applyClasses(parentBlockTitle, 'text-black text-2xl font-medium leading-7');

  const pictureEl = block?.querySelector('picture');
  applyClasses(pictureEl, 'shrink-0');
  const img = pictureEl?.querySelector('img');
  createOptimizedPicture(img?.src, 'img-alt', false, [{ width: '750' }]);
  applyClasses(img, 'w-16 h-16 rounded-full');

  const titleEl = block?.querySelector('h5');
  applyClasses(titleEl, 'text-normal font-semibold text-[#071112] m-0');
  const subTitleEl = block?.querySelector('h6');
  applyClasses(subTitleEl, 'text-sm font-normal leading-6 text-[#65797C] w-full m-0');
  const descriptionEl = block?.querySelector('p');
  applyClasses(descriptionEl, 'text-lg font-normal text-[#071112] leading-7 tracking-normal');

  const parentEl = block?.parentElement?.parentElement;
  const divEl = div({ class: 'flex text-base font-normal leading-6 text-[#378189] underline gap-x-2' });
  if (parentEl?.lastElementChild !== null) {
    parentEl?.lastElementChild?.remove();
    const socialLinks = parentEl?.lastElementChild?.querySelectorAll('p > a');
    socialLinks?.forEach((element) => {
      if (element?.textContent?.includes('Linkedin')) {
        divEl.append(span({ class: 'icon icon-linkedin-blue' }), element);
      } else {
        divEl.append(span({ class: 'icon icon-twitter-black' }), element);
      }
    });
  }

  const mainDiv = div(
    { class: 'flex flex-col' },
    div(
      { class: 'flex' },
      pictureEl,
      div({ class: 'my-auto' }, titleEl, subTitleEl),
    ),
    div({ class: 'w-full' }, descriptionEl),
    divEl,
  );

  block.innerHTML = '';
  block.appendChild(mainDiv);
  decorateIcons(block);
}
