import { getProductResponse } from '../../scripts/search.js';
import { div, button } from '../../scripts/dom-builder.js';
import { fetchPlaceholders } from '../../scripts/aem.js';

const path = window.location.pathname;
const match = path.match(/\/([a-z]{2}-[a-z]{2})\//i);
let languageCode = 'en-us';
if (match) {
  languageCode = match?.at(1);
}
const placeholders = await fetchPlaceholders(`/${languageCode}`);
const { productOverview, productDatasheet, productSupportdownloads } = placeholders;

function toggleTabs(tabId, mmgTabs) {
  const contentSections = document.querySelectorAll('[data-tabname]');
  contentSections.forEach((section) => {
    if (section.dataset.tabname === tabId) {
      section.classList.remove('hide-section');
    } else {
      section.classList.add('hide-section');
    }
  });
  const tabss = mmgTabs.querySelectorAll('.tab');
  tabss.forEach((tab) => {
    if (tab.id === tabId) {
      tab.classList.add('active', 'border-b-8', 'border-[#ff7223]');
    } else {
      tab.classList.remove('active', 'border-b-8', 'border-[#ff7223]');
    }
  });
}

export default async function decorate(block) {
  const response = await getProductResponse();
  const rawData = response?.at(0)?.raw;
  const { title } = rawData;
  if (title !== undefined || title === ' ') {
    document.title = title;
  }
  block.classList.add(...'md:border-b sm:border-b flex flex-col md:flex-col md:relative text-xl text-[#65797C]'.split(' '));
  const mmgTabs = div({ class: 'md:border-none border-b sm:border-none mmg-tabs md:absolute md:right-0 md:top-[-15px] font-semibold text-base text-black md:block flex order-1' });
  const tabs = [
    { name: productOverview, tabId: 'Overview' },
    { name: productDatasheet, tabId: 'Datasheet' },
    { name: productSupportdownloads, tabId: 'Downloads' },
  ];
  tabs.forEach((tab) => {
    const li = button({
      class: 'tab md:py-1.5 pb-4 lg:mx-8 mr-8',
      id: tab.tabId,
    });
    li.innerHTML = tab.name;
    mmgTabs.appendChild(li);
    li.addEventListener('click', () => {
      toggleTabs(tab.tabId, mmgTabs);
    });
  });
  const productTabs = div({ class: 'product-tabs-productID md:mt-0 mt-6 order-2' });
  productTabs.innerHTML = response?.at(0).raw.productslug.split('-').slice(-1);
  block.innerHTML = '';
  block.appendChild(productTabs);
  block.appendChild(mmgTabs);

  toggleTabs(tabs[0].tabId, mmgTabs);
}
