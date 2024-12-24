import {
  a,
  div,
  hr,
  li,
  span,
  ul,
} from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';
import { decorateIcons } from '../../scripts/aem.js';

export default async function decorate(block) {
  block.innerHTML = `<div class="product-protocols-block protocols">
    <div><h2>Product protocols</h2></div>
      <div>
        <p>For this product, it's our understanding that no specific protocols are required. You can:</p>
        <ul>
          <li><a href="/en-us/technical-resources/protocols">General protocols</a></li>            
          <li><a href="/en-us/technical-resources/troubleshooting">Troubleshooting</a></li>
        </ul>
      </div>
    </div>`;
  const protocolsContainer = div({ class: 'py-2 flex flex-col' });
  const h2El = block.querySelector('h2');
  protocolsContainer.appendChild(h2El);
  const protocolsPEl = block.querySelectorAll('p');
  protocolsPEl.forEach((para) => {
    applyClasses(para, 'font-normal');
    protocolsContainer.appendChild(para);
  });
  const liEle = block.querySelectorAll('li');
  const ulEle = ul({ class: 'list-disc list-inside' });
  liEle.forEach((listItem) => {
    const href = listItem.querySelector('a').getAttribute('href');
    const hrefText = listItem.querySelector('a').textContent;
    ulEle.append(
      li(a(
        { class: 'w-fit inline-flex items-center underline text-[#378189]', href },
        `${hrefText}`,
        span({ class: 'icon icon-arrow-right-green size-4 ml-2 mt-2 text-bold' }),
      )),
    );
    protocolsContainer.append(ulEle);
  });
  decorateIcons(protocolsContainer);
  block.querySelector('.product-protocols-block').remove();
  block.append(protocolsContainer);
  block.prepend(hr({
    class: 'h-px my-2 bg-interactive-grey-active mb-4',
  }));
}
