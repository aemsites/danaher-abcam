import {
  div,
  span,
} from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';
import { decorateIcons } from '../../scripts/aem.js';
 
export default function decorate(block) {
  applyClasses(block.parentElement, 'sticky top-0 bg-white z-10');
 
  const dropdownContainer = div(
    { class: 'flex items-center relative' },
    div({ class: 'jump-to-label text-[#65797c] text-sm w-28  md:!w-24 lg:!w-20 ' }, 'JUMP TO:'),
    div(
      { class: 'dd-container text-sm border bg-[#273F3F] bg-opacity-5 rounded-3xl py-2.5 px-6 w-full bg-white cursor-pointer relative' },
      span({ class: 'icon icon-chevron-down absolute top-2 right-6 z-50' }),
      span({ class: 'dd-selected' }, ''),
      div({ class: 'dd-options shadow-2xl absolute hidden top-full left-0 w-full bg-white rounded-3xl z-20 border pt-5 mt-1' }),
    ),
  );
  decorateIcons(dropdownContainer);
 
  const h2Eles = document.querySelectorAll('h2');
  if (h2Eles.length > 0) {
    const ddOptionsContainer = dropdownContainer.querySelector('.dd-options');
    const ddSelected = dropdownContainer.querySelector('.dd-selected');
 
    if (h2Eles.length > 0) {
      ddSelected.textContent = h2Eles[0].textContent || 'Section 1';
      h2Eles.forEach((h2Ele, index) => {
        const optionEle = div(
          { class: 'dd-option p-2 hover:bg-[#f2f2f2] hover:text-black cursor-pointer' },
          h2Ele.textContent || `Section ${index + 1}`,
        );
        optionEle.dataset.value = h2Ele.id;
        optionEle.addEventListener('click', function optionSelection(event) {
          ddSelected.textContent = this.textContent;
          const selectedSection = document.getElementById(this.dataset.value);
          if (selectedSection) {
            window.scrollTo({
              top: selectedSection.offsetTop,
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
      });
      applyClasses(ddOptionsContainer.children[0], 'bg-[#273F3F] bg-opacity-10 text-[#273F3F]');
    }
    dropdownContainer.querySelector('.dd-container').addEventListener('click', () => {
      ddOptionsContainer.classList.toggle('hidden');
    });
    window.addEventListener('click', (e) => {
      if (!dropdownContainer.contains(e.target)) {
        ddOptionsContainer.classList.add('hidden');
      }
    });
    ddOptionsContainer.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    block.replaceChildren(dropdownContainer);
    window.addEventListener('scroll', () => {
      let lastCrossedHeadingId = '';
      h2Eles.forEach((heading) => {
        const headingTop = heading.offsetTop;
        const headingHeight = heading.offsetHeight;
        if (window.scrollY >= headingTop - headingHeight / 3) {
          lastCrossedHeadingId = heading.id;
        }
      });
      if (lastCrossedHeadingId) {
        const matchingOption = Array.from(ddOptionsContainer.children)
          .find((option) => option.dataset.value === lastCrossedHeadingId);
        ddSelected.textContent = matchingOption.textContent;
        Array.from(ddOptionsContainer.children).forEach((option) => {
          option.classList.remove('bg-[#273F3F]', 'bg-opacity-10', 'text-[#273F3F]');
        });
        applyClasses(matchingOption, 'bg-[#273F3F] bg-opacity-10 text-[#273F3F]');
      } else {
        ddSelected.textContent = h2Eles[0].textContent || 'Section 1';
      }
    });
  }
}