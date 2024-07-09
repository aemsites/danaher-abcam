import { getProductResponse } from '../../scripts/search.js';
import { div, button } from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const response = await getProductResponse();
  block.classList.add(...'md:border-b sm:border-b flex flex-col md:flex-col md:relative text-xl text-[#65797C]'.split(' '));
  const mmgTabs = div({ class: 'md:border-none border-b sm:border-none mmg-tabs md:absolute md:right-0 md:top-[-15px] font-semibold text-base text-black md:block flex order-1' });
  const tabs = [
    { name: 'Overview', tabId: 'Overview' },
    { name: 'Datasheet', tabId: 'Datasheet' },
    { name: 'Support & Download', tabId: 'Support & Download' },
  ];
  tabs.forEach((tab) => {
    const li = button({
      class: 'tab md:py-1.5 pb-4 lg:mx-8 mr-8',
    });
    li.innerHTML = tab.name;
    mmgTabs.appendChild(li);
    li.addEventListener('click', () => {
      toggleTabs(tab.tabId);
    });
  });
  const productTabs = div({ class: 'product-tabs-productID md:mt-0 mt-6 order-2' });
  productTabs.innerHTML = response?.at(0).raw.productslug;
  block.innerHTML = '';
  block.appendChild(productTabs);
  block.appendChild(mmgTabs);
  function toggleTabs(tabId) {
    const contentSections = document.querySelectorAll('[data-tabname]');
    contentSections.forEach((section) => {
      if (section.dataset.tabname === tabId) {
        section.classList.remove('hide-section');
      } else {
        section.classList.add('hide-section');
      }
    });
    const tabs = mmgTabs.querySelectorAll('.tab');
    tabs.forEach((tab) => {
      if (tab.textContent.trim() === tabId) {
        tab.classList.add('active', 'border-b-8', 'border-[#ff7223]');
      } else {
        tab.classList.remove('active', 'border-b-8', 'border-[#ff7223]');
      }
    });
  }
  toggleTabs(tabs[0].tabId);
}
