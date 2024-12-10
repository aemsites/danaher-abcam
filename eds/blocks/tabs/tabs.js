import { getProductResponse } from '../../scripts/search.js';
import { div, button } from '../../scripts/dom-builder.js';
import { toolTip } from '../../scripts/scripts.js';

/* eslint-disable no-unused-expressions */
function toggleTabs(tabId, mmgTabs, tabType) {
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
      tabType === 'product-tabs'
        ? tab.classList.add('active', 'border-b-8', 'border-[#ff7223]')
        : tab.classList.add('bg-black', 'text-white'); tab.classList.remove('bg-white', 'text-black');
    } else {
      tabType === 'product-tabs'
        ? tab.classList.remove('active', 'border-b-8', 'border-[#ff7223]')
        : tab.classList.remove('bg-black', 'text-white'); tab.classList.add('bg-white', 'text-black');
    }
  });
}

function getTabName() {
  const contentSections = document.querySelectorAll('[data-tabname]');
  const tabName = new Set();
  contentSections.forEach((section) => {
    tabName.add(section.dataset.tabname);
  });
  return [...tabName];
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
  const tabs = getTabName();
  tabs.forEach((tab) => {
    const li = button({
      class: 'tab md:py-1.5 pb-4 lg:mx-8 mr-8 capitalize',
      id: tab,
    });
    li.innerHTML = tab;
    mmgTabs.appendChild(li);
    li.addEventListener('click', () => {
      toggleTabs(tab, mmgTabs, 'product-tabs');
    });
  });
  const skuItem = toolTip('skuitem', 'skutooltip', response?.at(0).raw.productslug.split('-').slice(-1), true);
  block.innerHTML = '';
  block.appendChild(skuItem);
  block.appendChild(mmgTabs);

  toggleTabs(tabs[0], mmgTabs, 'product-tabs');
}

function decorateButtonTabs(block) {
  const mmgTabs = div({ class: 'button-tabs flex flex-wrap gap-6' });
  const tabs = getTabName();
  tabs.forEach((tab) => {
    const buttonTab = button({
      class: 'tab px-6 py-2 border border-black border-solid bg-white text-black font-bold rounded-full',
      id: tab,
    }, tab);
    mmgTabs.appendChild(buttonTab);
    buttonTab.addEventListener('click', () => {
      toggleTabs(tab, mmgTabs, 'button-tabs');
    });
  });
  block.innerHTML = '';
  block.appendChild(mmgTabs);
  toggleTabs(tabs[0], mmgTabs, 'button-tabs');
}

export default async function decorate(block) {
  if (block.classList.contains('product-tabs')) decorateProductTabs(block);
  if (block.classList.contains('button-tabs')) decorateButtonTabs(block);
}
