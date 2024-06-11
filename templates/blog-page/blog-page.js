import { getMetadata } from '../../scripts/aem.js';
import { div, h1, p } from '../../scripts/dom-builder.js';
export default function buildAutoBlocks(block) {
    const contentBlocks = block.querySelectorAll('.section');
    const defaultTemplate = div({ id: 'content-wrapper' });
    
    const content = div({ class:'main lg:px-16 sm:px-10 px-5' });
    const title = getMetadata('og:title');
    const description = getMetadata('og:description');

    const headTitle = div(
    { class: 'text-center m-auto lg:pt-14 lg:pb-10 sm:pb-[40px]' },
    div(
        { class: 'py-16 font-sans text-base flex flex-col text-center m-auto max-w-[800px] md:px-5' },
        h1({ class: 'my-5 text-black-0 lg:text-7xl sm:text-5xl mb-8 font-semibold tracking-normal text-3xl' }, title),
        p({ class: 'tracking-normal lg:text-[27px] font-light text-slate-800 text-xl md:max-w-[800px] w-full' }, description),

    )
  );
  content.append(headTitle);
  
  contentBlocks.forEach((blocks) => {
    content.appendChild(blocks);
    blocks.style.display = null;
    const alternating = blocks.querySelector('.alternating-wrapper');
    if (alternating) {
        content.appendChild(alternating);
      }
  })

  defaultTemplate.appendChild(content);
  block.appendChild(defaultTemplate);
  defaultTemplate.appendChild(contentBlocks);
}
