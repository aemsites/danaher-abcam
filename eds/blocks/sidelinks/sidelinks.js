import { div, p, span } from '../../scripts/dom-builder.js';
import { getMetadata, decorateIcons } from '../../scripts/aem.js';
import { applyClasses } from '../../scripts/scripts.js';

export default function decorate(block) {
  const main = document.querySelector('.sidelinks-container .w-full .default-content-wrapper');
  const pagetags = getMetadata('pagetags');
  if (pagetags.includes('abcam:content-type/podcast')) {
    const container = document.querySelector('.social-media-wrapper');
    const iconContainer = div(
      { class: 'flex flex-col lg:flex-row gap-y-2 lg:gap-x-2 justify-between mb-4' },
      div({ class: 'text-black text-sm font-normal' }, 'Also Available on'),
      div({ class: 'icon-container flex flex-row sm:flex-col sm:gap-y-2 gap-x-2' }),
    );
    main.querySelectorAll('p a[title]').forEach((link) => {
      if (link.getAttribute('title') === 'spotify-podcast' || link.getAttribute('title') === 'apple-podcast') {
        link.parentElement.remove();
        const icon = span({ class: `icon icon-${link.textContent.toLowerCase()}` });
        link.textContent = '';
        link.append(icon);
        iconContainer.querySelector('.icon-container')?.append(link);
      }
    });
    decorateIcons(iconContainer, 135, 44);
    const imgElement = iconContainer.querySelector('span.icon img[data-icon-name="apple-podcast"]');
    if (imgElement) {
      // Set the width and height for apple-podcast icon
      imgElement.setAttribute('width', '202');
      imgElement.setAttribute('height', '44');
    }
    container.prepend(iconContainer);
  }

  const divEl = block.querySelector('div > div');
  applyClasses(divEl, 'sidelinks leading-5 text-sm font-bold text-black flex flex-col');

  const allParagraphs = divEl.querySelectorAll('p a[title="link"]');
  const linkHeading = getMetadata('template').includes('guide') ? 'Related Links' : 'Explore our products';
  if (allParagraphs.length > 0) {
    divEl.prepend(p({ class: 'text-sm leading-6 font-semibold uppercase text-[#65797C] px-2' }, linkHeading));
    allParagraphs.forEach((elPara) => {
      applyClasses(elPara?.parentElement, 'leading-5 text-base font-medium text-[#378189] my-0');
      applyClasses(elPara, 'block text-sm leading-6 font-semibold text-[#378189] p-2 border-b border-b-[#D8D8D8] hover:underline');
    });
  }
}
