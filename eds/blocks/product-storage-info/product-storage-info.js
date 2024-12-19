import { div, hr } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  block.innerHTML = `<div class="product-storage-block">
    <div><h2>Storage Information</h2></div>
    <div>
      <h6>Storage information</h6>
      <p>Avoid freeze / thaw cycle</p>
    </div>
    <div>
      <h6>Shipped at conditions</h6>
      <p>Blue Ice</p>
    </div>
    <div>
      <h6>Appropriate short-term storage duration</h6>
      <p>1-2 weeks</p>
    </div>
    <div>
      <h6>Appropriate short-term storage conditions</h6>
      <p>+4°C</p>
    </div>
    <div>
      <h6>Appropriate long-term storage conditions</h6>
      <p>-20°C</p>
    </div>
    <div>
      <h6>Aliquoting information</h6>
      <p>Upon delivery aliquot</p>
    </div>
  </div>`;
  const storageInfo = document.querySelector('h2');
  const storageH6El = document.querySelectorAll('h6');
  const storageH6Div = div({ class: 'text-[#65797C] p-4 pl-0 md:ml-2' });
  storageH6El.forEach((heading) => {
    storageH6Div.appendChild(heading);
  });
  const storagePEl = document.querySelectorAll('p');
  const storagePDiv = div({ class: 'text-black font-normal text-base mr-auto lg:p-4 lg:ml-0' });
  storagePEl.forEach((para) => {
    storagePDiv.appendChild(para);
  });
  const mainContainer = div(
    { class: 'flex flex-col lg:flex-row lg:gap-y-2 justify-between' },
    storageH6Div,
    storagePDiv,
  );
  block.prepend(hr({
    class: 'h-px my-2 bg-interactive-grey-active mb-4',
  }));
  block.append(storageInfo);
  block.append(mainContainer);
  block.append(hr({
    class: 'h-px my-2 bg-interactive-grey-active mb-4',
  }));
  const childDiv = block.querySelectorAll('div');
  childDiv.forEach((divEl) => {
    if (!divEl.innerHTML.trim()) {
      divEl.remove();
    }
  });
}
