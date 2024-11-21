import { decorateIcons } from '../../scripts/aem.js';
import { span } from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const contentContainer = block.querySelector('div');
  applyClasses(contentContainer, 'border-y border-solid border-gray-300 py-8');

  const content = contentContainer.querySelector('div');
  applyClasses(content, 'title-container flex justify-between items-center cursor-pointer');

  const title = content.querySelector('h3');
  applyClasses(title, 'title font-sans font-semibold text-2xl leading-[27px] text-left md:w-[489px] md:h-[27px]');

  const description = content.querySelector('p');
  applyClasses(description, 'text hidden font-sans text-lg font-normal leading-7 tracking-[0.3px] text-left');

  const plusIcon = span({ class: 'icon icon-plus w-[18px] h-[18px] top-[3px] left-[3px]' });
  const minusIcon = span({ class: 'icon icon-minus hidden w-[18px] h-[18px] top-[3px] left-[3px]' });

  content.append(title);
  content.append(plusIcon);
  content.append(minusIcon);
  contentContainer.append(description);

  // // Add event listener for toggle functionality
  content.addEventListener('click', () => {
    if (description.classList.contains('hidden')) {
      description.classList.remove('hidden');
      description.classList.add('block');
      minusIcon.classList.remove('hidden');
      plusIcon.classList.add('hidden');
    } else if (description.classList.contains('block')) {
      description.classList.remove('block');
      description.classList.add('hidden');
      plusIcon.classList.remove('hidden');
      minusIcon.classList.add('hidden');
    }
  });
  decorateIcons(block);
}
