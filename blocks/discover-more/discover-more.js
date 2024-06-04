import { div } from '../../scripts/dom-builder.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

function createDiscoverMoreDOM(block) {
  const blockMainDiv = div({ class: 'flex flex-col gap-5' });
  [...block.children].forEach((elements) => {
    if (elements.children.length === 1) {
      elements.querySelector('h2').classList.add(...'font-bold text-3xl'.split(' '));
      blockMainDiv.append(elements.querySelector('h2'));
    }
    if (elements.children.length === 2) {
      elements.classList.add(...'flex flex-col md:grid md:grid-cols-2 gap-8'.split(' '));
      elements.firstElementChild?.classList.add(...'order-2 md:order-none'.split(' '));
      const moreStoriesImg = elements.firstElementChild?.querySelector('img');
      moreStoriesImg.closest('picture').replaceWith(createOptimizedPicture(moreStoriesImg.src, 'img-alt', false, [{ width: '750' }]));
      const moreStoriesDiv = div({ class: 'more-stories rounded-3xl bg-[#378189] px-5 py-2.5 w-72 text-white' });
      moreStoriesDiv.append(elements.children[1]?.querySelector('em').querySelector('a'));
      elements.children[1].append(moreStoriesDiv);
      elements.children[1]?.classList.add(...'flex flex-col gap-[18px]'.split(' '));
      elements.children[1]?.querySelectorAll('.button-container').forEach((anchorTag) => {
        anchorTag.classList.add(...'text-[#378189] underline'.split(' '));
      });
      blockMainDiv.append(elements);
    }
  });
  return blockMainDiv;
}

/**
 * loads and decorates the Discover More block
 * @param {Element} block The Discover More block element
 */
export default async function decorate(block) {
  const createdDom = createDiscoverMoreDOM(block);
  block.firstElementChild.remove();
  block.append(createdDom);
}
