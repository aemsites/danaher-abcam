import { span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { getProductsListResponse } from '../../scripts/search.js';
  
export default async function decorate(block) {
    const productFullResponse = await getProductsListResponse(1);
    const parsedJson = JSON.parse(productFullResponse || '{}');
    block.classList.add(...'cta-container flex flex-wrap gap-x-32 p-6 mb-6 rounded-xl bg-[#edf6f7]'.split(' '));
    const container = block.querySelector('div');
    container.firstElementChild.classList.add(...'flex flex-col md:flex-row gap-4 justify-between'.split(' '));
    const title = block.querySelector('h3');
    const totalCountEl = span({ class: 'font-bold text-xl text-[#378189]' }, ` ${parsedJson.totalCount ? `(${parsedJson.totalCount})` : ''}`);
    title.append(totalCountEl);
    title.classList.add(...'title mt-1 font-bold text-xl text-[#378189]'.split(' '));
    const ctaBanner = block.querySelector('p');
    const icon = span(
        { class: 'arrow-icon icon icon-chevron-down-white rotate-0' },
    );
    if (parsedJson.totalCount) {
        ctaBanner.classList.add('flex', 'items-center', 'gap-2');
        ctaBanner.append(icon);
        decorateIcons(ctaBanner.parentElement);
        ctaBanner.querySelector('img').style.cssText = 'transform: rotate(270deg)';
        ctaBanner.querySelector('img')?.classList.add('w-4');
    }
}
  