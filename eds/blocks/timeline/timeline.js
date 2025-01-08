import { div, h5 } from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const parentEl = block.parentElement.parentElement;
  console.log(parentEl);
  applyClasses(parentEl, 'py-0');
  let sectionEl = parentEl.nextElementSibling;
  while (sectionEl && sectionEl.dataset.stepnumber !== undefined) {
    const stepIndexElement = h5({ class: 'size-10 flex items-center text-lg p-3 border-2 border-black rounded-full' }, sectionEl.dataset.stepnumber);
    const stepDivider = div({ class: 'border border-gray-100' });
    const wrapper = div({class: 'flex gap-x-4 mb-6'});
    let sectionContentEl = div({class: 'flex flex-col space-y-4'});
    sectionContentEl.append(...sectionEl.childNodes);
    wrapper.append(stepIndexElement, stepDivider, sectionContentEl);
    sectionEl.append(wrapper);
    sectionEl = sectionEl.nextElementSibling;
  }
}
