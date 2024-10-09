import { div, p, span } from '../../scripts/dom-builder.js';
import { getMetadata, decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
    const main = document.querySelector('.sidelinks-container .w-full .default-content-wrapper');
    const pagetags = getMetadata('pagetags');
    if(pagetags.includes('abcam:content-type/podcast')) {
        const container = document.querySelector('.social-media-wrapper');
        console.log(container);
        const iconContainer = div(
            { class: 'flex flex-col lg:flex-row gap-y-2 lg:gap-x-2 justify-between mb-4' },
            div({class: 'text-black text-sm font-normal'},'Also Available on'),
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
        decorateIcons(iconContainer, 202);
        container.prepend(iconContainer);
    }
    const divEl = block.querySelector('div > div');
    divEl.classList.add(...'sidelinks leading-5 text-sm font-bold text-black flex flex-col gap-y-3'.split(' '));
    const allParagraphs = main.querySelectorAll('p a[title="link"]');
    const linkHeading = 'Explore our products'
    if (allParagraphs.length > 0) {
      divEl.append(p(linkHeading));
      allParagraphs.forEach((elPara) => {
        elPara.classList.add(...'border-b border-b-gray-300 py-2 mx-0 w-auto mt-2 pb-3'.split(' '));
        divEl.append(p({ class: 'leading-5 text-base font-medium text-[#378189]' }, elPara));
      });
    }
}
