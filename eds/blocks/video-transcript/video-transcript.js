import { decorateIcons } from '../../scripts/aem.js';
import { button, div, span } from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const contentContainer = block.querySelector('div');
  contentContainer.className = 'content-container';

  const content = contentContainer.querySelector('div');
  content.className = 'content border-y border-solid border-gray-300 py-8';

  const title = content.querySelector('p');
  title.className = 'title font-sans font-semibold text-2xl leading-[27px] text-left md:w-[489px] md:h-[27px]';

  const plusIcon = span({ class: 'icon icon-plus w-[18px] h-[18px] top-[3px] left-[3px]' });
  const minusIcon = span({ class: 'icon icon-minus hidden w-[18px] h-[18px] top-[3px] left-[3px]' });

  // Create toggle button
  const toggleButton = button({ class: 'toggle-button w-6 h-6' });
  toggleButton.appendChild(plusIcon);
  toggleButton.appendChild(minusIcon);

  const titleContainer = div({ class: 'title-container cursor-pointer flex justify-between items-center' });
  titleContainer.append(title);
  titleContainer.appendChild(toggleButton);
  content.append(titleContainer);

  const text = content.querySelector('p');
  text.className = 'text hidden font-sans text-lg font-normal leading-7 tracking-[0.3px] text-left';

  const textContainer = div({ class: 'text-container' });
  textContainer.appendChild(text);
  content.appendChild(textContainer);

  // Add event listener for toggle functionality
  titleContainer.addEventListener('click', () => {
    if (text.classList.contains('hidden')) {
      text.classList.remove('hidden');
      text.classList.add('block');
      minusIcon.classList.remove('hidden');
      plusIcon.classList.add('hidden');
    } else if (text.classList.contains('block')) {
      text.classList.remove('block');
      text.classList.add('hidden');
      plusIcon.classList.remove('hidden');
      minusIcon.classList.add('hidden');
    }
  });
  decorateIcons(block);
}
