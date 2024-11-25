import { div, span, img } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  block.classList.add(...'bg-black text-white p-8 flex'.split(' '));
  const closeIcon = span({ class: 'icon icon-close absolute top-5 right-10 p-2 cursor-pointer text-white' });
  block.classList.add('relative');
  block.appendChild(closeIcon);
  decorateIcons(block, 25,25);
  closeIcon.addEventListener('click', (event) => {
    event.preventDefault();
    block.remove();
  }); 
  const childDivs = block.querySelectorAll('div > div');
  childDivs.forEach((childDiv, index) => {
    if (!childDiv.innerHTML.trim()) {
      childDiv.remove();
    } else {
      childDiv.classList.add(`child-${index + 1}`);
      if (childDiv.classList.contains('child-5')) {
        childDiv.classList.add('mt-12', 'ml-5');
      }
      if (childDiv.classList.contains('child-2')) {
        const paragraphs = childDiv.querySelectorAll('p');
        paragraphs.forEach((p, i) => {
          p.classList.add(`paragraph-${i + 1}`);
        });
        const listItems = childDiv.querySelectorAll('li');
        listItems.forEach((li, i) => {
          li.classList.add(`list-item-${i + 1}`, 'flex', 'mt-4');
          const iconSpanCheck = span({class: 'icon icon-check mr-2 justify-center h-auto bg-slate-950 border-black rounded-full'});
          li.prepend(iconSpanCheck);
          const iconImage = iconSpanCheck.querySelector('img');
          if (iconImage) {
            iconImage.classList.add('bg-slate-700', 'border-black', 'rounded-full', 'justify-center');
          }
          decorateIcons(li, 20,20);
        });
        const listOfNewFeatures = childDiv.querySelector('ul'); 
        if (listOfNewFeatures) {
          listOfNewFeatures.classList.add('unordered-list', 'mt-6', 'mb-6');
        }
        const paragraph1 = childDiv.querySelector('.paragraph-1');
        const paragraph3 = childDiv.querySelector('.paragraph-3');
        const paragraph4 = childDiv.querySelector('.paragraph-4');
        if (paragraph1) {
          paragraph1.classList.add('text-2xl', 'font-bold');
          paragraph1.innerHTML = `<span class="hidden sm:block">Welcome to our new website</span>
          <span class="block sm:hidden">New Abcam Experience</span>`
        }
        if (paragraph3) {
          paragraph3.classList.add('border-b', 'border-white', 'pb-3', 'mr-10', 'mt-10'); 
        }
        if (paragraph3 && listOfNewFeatures && paragraph4) {
          const wrapperDiv = div({ class: 'wrapper-class hidden' });
          wrapperDiv.appendChild(paragraph3);
          wrapperDiv.appendChild(listOfNewFeatures);
          wrapperDiv.appendChild(paragraph4);
          childDiv.appendChild(wrapperDiv);
        }
      }
    }
  });
  const showMoreButton = block.querySelector('.button-container .button');
  showMoreButton.classList.add('flex');
  if (showMoreButton) {
    showMoreButton.textContent = 'Show more'; 
    const iconSpan = span({ class: 'icon icon-chevron-down-white size-5 flex ml-1'});
    showMoreButton.appendChild(iconSpan); 
    decorateIcons(showMoreButton, 20, 20);
    showMoreButton.addEventListener('click', (event) => {
      event.preventDefault();
      const wrapperDiv = block.querySelector('.child-2 .wrapper-class');
      if (wrapperDiv) {
        wrapperDiv.classList.toggle('hidden');
      }
      if (wrapperDiv && wrapperDiv.classList.contains('hidden')) {
        showMoreButton.textContent = 'Show more'; 
        iconSpan.classList.remove('rotate-180'); 
        showMoreButton.appendChild(iconSpan); 
      } else {
        showMoreButton.textContent = 'Show less'; 
        iconSpan.classList.add('rotate-180'); 
        showMoreButton.appendChild(iconSpan); 
      }
    });
  }
}
