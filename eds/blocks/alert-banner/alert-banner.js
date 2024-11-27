import { div, span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  block.classList.add(...'bg-black text-white p-8 lg:w-full w-fit'.split(' '));
  const containerDiv = div({ class: 'flex' });
  const closeIcon = span({ class: 'icon icon-close absolute top-5 right-10 p-2 cursor-pointer text-white' });
  const wrapperDiv = div({ class: 'wrapper-class hidden' });
  block.classList.add('relative');
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
        childDiv.classList.add('mt-10', 'ml-5');
      }
      if (childDiv.classList.contains('child-2')) {
        const paragraphs = childDiv.querySelectorAll('p');
        paragraphs.forEach((p, i) => {
          p.classList.add(`paragraph-${i + 1}`);
        });
        const listItems = childDiv.querySelectorAll('li');
        listItems.forEach((li, i) => {
          li.classList.add(`list-item-${i + 1}`, 'flex', 'mt-4');
          const iconSpanCheck = span({ class: 'icon icon-check mr-2 bg-gray-900 justify-center h-auto border-black rounded-full' });
          li.prepend(iconSpanCheck);
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
          const span1 = span({ class: 'hidden sm:block' });
          span1.textContent = 'Welcome to our new website';
          const span2 = span({ class: 'block sm:hidden' });
          span2.textContent = 'New Abcam Experience';
          paragraph1.textContent = '';
          paragraph1.appendChild(span1);
          paragraph1.appendChild(span2);
        }
        if (paragraph3) {
          paragraph3.classList.add('border-b', 'border-white', 'pb-3', 'mr-10', 'mt-10');
        }
        if (paragraph3 && listOfNewFeatures && paragraph4) {
          wrapperDiv.appendChild(paragraph3);
          wrapperDiv.appendChild(listOfNewFeatures);
          wrapperDiv.appendChild(paragraph4);
        }
      }
    }
  });
  const showMoreButton = block.querySelector('.button-container .button');
  showMoreButton.classList.add(...'flex py-2 px-2'.split(' '));
  if (showMoreButton) {
    showMoreButton.textContent = 'Show more';
    const iconSpan = span({ class: 'icon icon-chevron-down-white size-5 flex ml-1' });
    showMoreButton.appendChild(iconSpan);
    showMoreButton.addEventListener('click', (event) => {
      event.preventDefault();
      const wrapperTextDiv = block.querySelector('.wrapper-class');
      if (wrapperTextDiv) {
        wrapperTextDiv.classList.toggle('hidden');
      }
      if (wrapperTextDiv && wrapperTextDiv.classList.contains('hidden')) {
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
  const childDiv1 = block.querySelector('.child-1');
  const childDiv2 = block.querySelector('.child-5');
  containerDiv.append(childDiv1);
  containerDiv.append(childDiv2);
  block.append(containerDiv);
  block.appendChild(wrapperDiv);
  block.appendChild(closeIcon);
  decorateIcons(block, 25, 25);
}
