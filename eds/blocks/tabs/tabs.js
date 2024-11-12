import { getProductResponse } from '../../scripts/search.js';
import { div, button } from '../../scripts/dom-builder.js';
import { fetchPlaceholders } from '../../scripts/aem.js';
import { toolTip } from '../../scripts/scripts.js';

const placeholders = await fetchPlaceholders();
const { productOverview, productDatasheet, productSupportdownloads } = placeholders;

function toggleTabs(tabId, mmgTabs) {
  const contentSections = document.querySelectorAll('[data-tabname]');
  contentSections.forEach((section) => {
    if (section.dataset.tabname?.toLowerCase() === tabId) {
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

async function decorateProductTabs(block) {
  const response = await getProductResponse();
  const rawData = response?.at(0)?.raw;
  const { title } = rawData;
  if (title !== undefined || title === ' ') {
    document.title = title;
  }
  block.classList.add(...'md:border-b sm:border-b flex-col md:flex-col md:relative text-xl text-[#65797C]'.split(' '));
  const mmgTabs = div({ class: 'md:border-none border-b sm:border-none mmg-tabs md:absolute md:right-0 md:top-[-15px] font-semibold text-base text-black md:block flex order-1' });
  const contentSections = document.querySelectorAll('[data-tabname]');
  const tabName = new Set();
  contentSections.forEach((section) => {
    tabName.add(section.dataset.tabname?.toLowerCase());
  });
  const tabs = [...tabName];
  tabs.forEach((tab) => {
    const li = button({
      class: 'tab md:py-1.5 pb-4 lg:mx-8 mr-8 capitalize',
      id: tab,
    });
    li.innerHTML = tab;
    mmgTabs.appendChild(li);
    li.addEventListener('click', () => {
      toggleTabs(tab, mmgTabs);
    });
  });
  const skuItem = toolTip('skuitem', 'skutooltip', response?.at(0).raw.productslug.split('-').slice(-1), true);
  block.innerHTML = '';
  block.appendChild(skuItem);
  block.appendChild(mmgTabs);

  toggleTabs(tabs[0], mmgTabs);
}

export default async function decorate(block) {
  if(block.classList.contains('product-tabs')) decorateProductTabs(block);
}
