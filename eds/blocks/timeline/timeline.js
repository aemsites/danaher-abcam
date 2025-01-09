import { div, h5 } from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const contentSections = document.querySelectorAll('[data-stepnumber]');
  let indexNum = 1;
  const timelineStep = block.parentElement.parentElement.nextSibling.nextSibling.dataset.stepnumber;
  contentSections.forEach((section) => {
    if (timelineStep === section.dataset.stepnumber) {
      const stepIndexElement = h5({ class: 'size-10 flex items-center text-lg p-3 border-2 border-black rounded-full' }, indexNum);
      const stepDivider = div({ class: 'border border-gray-100' });
      const wrapper = document.createElement('div');
      wrapper.prepend(stepDivider);
      wrapper.prepend(stepIndexElement);
      const sectionContentEl = div({ class: 'flex flex-col space-y-4' });
      sectionContentEl.append(...section.childNodes);
      const subPoint = sectionContentEl.querySelectorAll('ul');
      subPoint.forEach((item) => {
        item.classList.add(...'text-[#D8D8D8] ml-4'.split(' '));
      });
      wrapper.append(stepIndexElement, stepDivider, sectionContentEl);
      section.append(wrapper);
      applyClasses(wrapper, 'flex gap-x-4 mb-6');
      indexNum += 1;
    }
  });
}
