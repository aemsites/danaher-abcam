import {
  hr,
} from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function decorate(block) {
  block.innerHTML = `<div class="product-protocols-block ">
    <div><h2>Product protocols</h2></div>
      <div>
        <p>For this product, it's our understanding that no specific protocols are required. You can:</p>
        <ul>
          <li>Visit the <a href="/en-us/technical-resources/protocols">general protocols</a></li>            
          <li>Visit <a href="/en-us/technical-resources/troubleshooting">troubleshooting</a></li>
        </ul>
      </div>
    </div>`;
  const protocolsPEl = block.querySelectorAll('p');
  protocolsPEl.forEach((para) => {
    applyClasses(para, 'font-normal');
  });
  const protocolsList = block.querySelector('ul');
  protocolsList.querySelectorAll('li').forEach((listItem) => {
    applyClasses(listItem, 'pt-3 ml-3 list-disc list-inside text-[#071112] text-lg');
    listItem.querySelector('a').classList.add('text-[#378189]', 'underline');
  });
  block.prepend(hr({
    class: 'h-px my-2 bg-interactive-grey-active mb-4',
  }));
}
