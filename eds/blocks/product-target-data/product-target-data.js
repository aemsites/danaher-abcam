import {
  a,
  div,
  hr,
  span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function decorate(block) {
  block.innerHTML = `<div class="product-target-block ">
    <h3>Target Data</h3>
    <div>
      <a href="/en-us/target/rbfox3/27304" target="_blank">See full target information RBFOX3</a>
    </div>
    <div>
      <strong>Function</strong> 
      <div>Pre-mRNA alternative splicing regulator. Regulates alternative splicing of RBFOX2 to enhance the production of mRNA species that are targeted for nonsense-mediated decay (NMD).</div>
    </div>
  </div>`;
  const targetContainer = div({ class: 'py-2 flex flex-col' });
  const h3El = block.querySelector('h3');
  const protocolsPEl = block.querySelectorAll('div > div > div');
  const href = block.querySelector('div > div > a').getAttribute('href');
  const targetData = block.querySelector('div > div > a').textContent;
  block.querySelector('.product-target-block').remove();
  targetContainer.append(h3El);
  applyClasses(protocolsPEl[3], 'mr-0 mb-6 mt-2');
  targetContainer.append(protocolsPEl[3]);
  targetContainer.append(a(
    { class: 'w-fit inline-flex items-center underline text-[#378189]', href },
    `${targetData}`,
    span({ class: 'icon icon-arrow-right size-4 ml-2' }),
  ));
  decorateIcons(targetContainer);
  block.append(targetContainer);
  block.prepend(hr({
    class: 'h-px my-2 bg-interactive-grey-active mb-4',
  }));
}
