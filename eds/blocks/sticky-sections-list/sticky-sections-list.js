import { div, span } from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';
import { decorateIcons, getMetadata } from '../../scripts/aem.js';
// import {decorateButtonTabs} from '../tabs/tabs.js';

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
      if (tabType === 'button-tabs') {
        tab.classList.add('active', 'bg-[#273F3F]', 'text-white', 'border-[#ff7223]');
      } else {
        tab.classList.add('bg-black', 'text-white');
      }
      tab.classList.remove('bg-white', 'text-black');
    } else {
      if (tabType === 'button-tabs') {
        tab.classList.remove('active', 'bg-[#273F3F]', 'text-white', 'border-[#ff7223]');
      } else {
        tab.classList.remove('bg-black', 'text-white');
      }
      tab.classList.add('bg-white', 'text-black');
    }
  });
}
export default function decorate(block) {
  const chevIcon = span({ class: 'icon icon-chevron-down shrink-0 ml-auto transition' });
  const templateMetaTag = document.querySelector('meta[name="template"][content="cross-sell-detail"]');
  const template = getMetadata('template');
  const isCrossSellTemplate = templateMetaTag && templateMetaTag.getAttribute('content') === 'cross-sell-detail';
  let jumpToText;
  if (template === 'support') {
    jumpToText = 'QUESTION';
  } else if (isCrossSellTemplate) {
    jumpToText = 'SELECT ANTIBODY:';
  } else {
    jumpToText = 'JUMP TO:';
  }
  const baseClasses = 'dd-main-container mx-auto max-w-7xl lg:h-[72px] flex items-center relative px-7 py-4 font-semibold';
  const jumpToLabelClasses = 'jump-to-label text-[#65797c] text-sm w-28 md:!w-24 lg:!w-20';
  const crossSellClasses = isCrossSellTemplate ? 'md:!w-36 lg:!w-36' : '';
  const dropdownContainer = div(
    { class: `${baseClasses}` },
    div(
      { class: `${jumpToLabelClasses} ${crossSellClasses}` },
      jumpToText,
    ),
    div(
      { class: 'dd-container flex flex-row items-center w-full lg:w-1/2 min-h-[40px] gap-x-4 !bg-[#F4F5F5] tracking-[0.2px] leading-4 text-sm border border-[#EAECEC] border-opacity-5 bg-[#273F3F] bg-opacity-5 rounded-full px-6 w-full bg-white cursor-pointer relative' },
      span({ class: 'dd-selected' }, ''),
      chevIcon,
      div({ class: 'dd-options max-h-[400px] xl:max-h-[500px] drop-shadow-2xl absolute hidden top-full lg:left-0 lg:w-full w-[110%] right-0 bg-white rounded-2xl z-20 border pt-5 mt-1 max-h-screen overflow-y-auto' }),
    ),
  );
  decorateIcons(dropdownContainer, 20, 20);
  let targetElements = [];
  if (isCrossSellTemplate) {
    const contentSections = document.querySelectorAll('[data-tabname]');
    const tabNames = [];
    contentSections.forEach((section) => {
      const tabNameText = section.dataset.tabname;
      if (tabNameText) {
        tabNames.push(tabNameText);
      }
    });
    targetElements = tabNames;
  } else {
    targetElements = document.querySelectorAll('h2');
  }
  if (targetElements.length > 0) {
    const ddOptionsContainer = dropdownContainer.querySelector('.dd-options');
    const ddSelected = dropdownContainer.querySelector('.dd-selected');
    ddSelected.innerText = targetElements[0] || 'Select a Tab';
    const mmgTabs = document.querySelector('.button-tabs');
    if (mmgTabs) {
      const tabss = mmgTabs.querySelectorAll('.tab');
      tabss.forEach((buttonTab) => {
        buttonTab.addEventListener('click', () => {
          ddSelected.innerText = buttonTab.innerText;
          toggleTabs(buttonTab.innerText, mmgTabs, 'button-tabs');
        });
      });
    }
    if (isCrossSellTemplate) {
      targetElements.slice(1).forEach((tabName, index) => {
        const optionEle = div(
          { class: 'dd-option py-3 px-6 hover:bg-[#f2f2f2] hover:text-black cursor-pointer' },
          tabName || `Section ${index + 1}`,
        );
        optionEle.dataset.value = `tab-${index + 1}`;
        optionEle.addEventListener('click', function optionSelection(event) {
          ddSelected.innerText = this.innerText;
          toggleTabs(this.innerText, mmgTabs, 'button-tabs');
          const selectedTab = document.querySelector(`[data-tabname="${this.innerText}"]`);
          if (selectedTab) {
            window.scrollTo({
              top: selectedTab.offsetTop - 200,
              behavior: 'smooth',
            });
          }
          const matchingButtonTab = mmgTabs.querySelector(`#${this.innerText}`);
          if (matchingButtonTab) {
            matchingButtonTab.classList.add('active', 'bg-[#273F3F]', 'text-white', 'border-[#ff7223]');
            matchingButtonTab.classList.remove('bg-white', 'text-black');
          }
          mmgTabs.forEach((tab) => {
            if (tab !== matchingButtonTab) {
              tab.classList.remove('active', 'bg-[#273F3F]', 'text-white', 'border-[#ff7223]');
              tab.classList.add('bg-white', 'text-black');
            }
          });
          Array.from(ddOptionsContainer.children).forEach((opt) => {
            opt.classList.remove('bg-[#273F3F]', 'bg-opacity-10', 'text-[#273F3F]');
          });
          applyClasses(this, 'bg-[#273F3F] bg-opacity-10 text-[#273F3F]');
          ddOptionsContainer.classList.add('hidden');
          event.stopPropagation();
        });
        ddOptionsContainer.appendChild(optionEle);
      });
    } else {
      ddSelected.innerText = targetElements[0].innerText || 'Select a Section';
      targetElements.forEach((element, index) => {
        if (index > 0) {
          const optionEle = div(
            { class: 'dd-option py-3 px-6 hover:bg-[#f2f2f2] hover:text-black cursor-pointer' },
            element.innerText || `Section ${index + 1}`,
          );
          optionEle.dataset.value = element.id || `section-${index + 1}`;
          optionEle.addEventListener('click', function optionSelection(event) {
            const selectedSection = document.getElementById(this.dataset.value);
            if (selectedSection) {
              window.scrollTo({
                top: selectedSection.offsetTop - 65,
                behavior: 'smooth',
              });
            }
            Array.from(ddOptionsContainer.children).forEach((opt) => {
              opt.classList.remove('bg-[#273F3F]', 'bg-opacity-10', 'text-[#273F3F]');
            });
            applyClasses(this, 'bg-[#273F3F] bg-opacity-10 text-[#273F3F]');
            ddOptionsContainer.classList.add('hidden');
            event.stopPropagation();
          });
          ddOptionsContainer.appendChild(optionEle);
        }
      });
    }
    ddOptionsContainer.children[0].classList.add('bg-[#273F3F]', 'bg-opacity-10', 'text-[#273F3F]');
    ddOptionsContainer.classList.add('hidden');
    dropdownContainer.querySelector('.dd-container').addEventListener('click', () => {
      ddOptionsContainer.classList.toggle('hidden');
      chevIcon.classList.toggle('rotate-180');
    });
    window.addEventListener('click', (e) => {
      if (!dropdownContainer.contains(e.target) && !ddOptionsContainer.classList.contains('hidden')) {
        ddOptionsContainer.classList.add('hidden');
        chevIcon.classList.remove('rotate-180');
      }
    });
    ddOptionsContainer.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    block.replaceChildren(dropdownContainer);
    window.addEventListener('scroll', () => {
      let lastCrossedHeadingId = '';
      targetElements.forEach((element, index) => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        if (window.scrollY >= (elementTop - elementHeight) - 70 / 3) {
          lastCrossedHeadingId = element.id || `section-${index + 1}`;
        }
      });
      if (lastCrossedHeadingId) {
        const matchingOption = Array.from(ddOptionsContainer.children)
          .find((option) => option.dataset.value === lastCrossedHeadingId);
        ddSelected.innerText = matchingOption.innerText;
        Array.from(ddOptionsContainer.children).forEach((option) => {
          option.classList.remove('bg-[#273F3F]', 'bg-opacity-10', 'text-[#273F3F]');
        });
        applyClasses(matchingOption, 'bg-[#273F3F] bg-opacity-10 text-[#273F3F]');
      } else if (targetElements[0] && targetElements[0].trim()) {
        const [firstElement] = targetElements;
        ddSelected.textContent = firstElement || 'Select a Tab';
      } else {
        ddSelected.textContent = 'Select a Tab';
      }
    });
  }
}
