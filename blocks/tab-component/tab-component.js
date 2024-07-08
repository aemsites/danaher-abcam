import { div, button } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const tabComponent = div({ class: 'mmg-tabs lg:w-2/5 w-full' });
  const ul = div({ class: 'tablist text-center inline-flex border-b' });
  const tabContent = div({ class: 'tabpanels p-5' });
  let activeTabIndex = 0;
  const updateTabStyles = () => {
    ul.querySelectorAll('button.tab').forEach((tab, index) => {
      if (index === activeTabIndex) {
        tab.classList.add('active', 'border-b-4', 'border-[#ff7223]');
        tab.classList.remove(...'hover:border-b-4 shadow-slate-300'.split(' '));
      } else {
        tab.classList.remove('active', 'border-b-4', 'border-[#ff7223]');
        tab.classList.add(...'hover:border-b-4 shadow-slate-300'.split(' '));
      }
    });
  };
  [...block.children].forEach((row, index) => {
    const itemContent = row.children[1];
    itemContent.classList.add('tabpanel', 'hidden');
    const li = button({ class: 'tab py-2 lg:mx-10 mx-3.5' }, row.children[0]);
    li.addEventListener('click', () => {
      if (activeTabIndex !== index) {
        tabContent.children[activeTabIndex].classList.add('hidden');
        itemContent.classList.remove('hidden');
        activeTabIndex = index;
        updateTabStyles();
      }
    });
    ul.appendChild(li);
    tabContent.appendChild(itemContent);
    if (index === 0) {
      itemContent.classList.remove('hidden');
      li.classList.add('active', 'border-b-4', 'border-[#ff7223]');
    } else {
      li.classList.add(...'hover:border-b-4 shadow-slate-300'.split(' '));
    }
  });
  tabComponent.appendChild(ul);
  tabComponent.appendChild(tabContent);
  block.textContent = '';
  block.appendChild(tabComponent);
  updateTabStyles();
}
