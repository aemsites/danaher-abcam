import { div, h5 } from '../../scripts/dom-builder.js';

export default async function decorate(block) {
  const contentSections = document.querySelectorAll('[data-stepnumber]');
  const allSteps = new Set();
  contentSections.forEach((section) => {
    allSteps.add(section.dataset.stepnumber);
  });
  block.innerHTML = '';
  if (allSteps.size > 0) {
    allSteps.forEach((step) => {
      const stepEl = div({ class: 'flex gap-x-4 mb-6' });
      const stepIndexElement = h5({ class: 'size-10 flex items-center text-lg p-3 border-2 border-black rounded-full' }, step);
      const stepDivider = div({ class: 'border border-gray-100' });
      const stepContent = div({ class: 'flex flex-col gap-y-4 py-2' });
      contentSections.forEach((section) => {
        if (section.dataset.stepnumber === step) {
          stepContent.innerHTML = section.innerHTML;
          section.remove();
        }
      });
      stepEl.innerHTML = '';
      stepEl.prepend(stepDivider);
      stepEl.prepend(stepIndexElement);
      stepEl.append(stepContent);
      block.appendChild(stepEl);
      block.innerHTML += '&nbsp;';
    });
  }
}
