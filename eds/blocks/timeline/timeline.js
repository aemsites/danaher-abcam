import { div, button } from '../../scripts/dom-builder.js';
import { toolTip } from '../../scripts/scripts.js';

function getTimelineSteps() {
  const contentSections = document.querySelectorAll('[data-stepNumber]');
  const allSteps = new Set();
  contentSections.forEach((section) => {
    allSteps.add(section.dataset.stepNumber);
  });
  return [...allSteps];
}

export default async function decorate(block) {
 const steps = getTimelineSteps();
 if (steps.length > 0) {
 steps.forEach((step) =>{
  step.className = 'flex gap-x-4 mb-6';
  const stepIndexElement = h5({ class: 'size-10 flex items-center text-lg p-3 border-2 border-black rounded-full' }, 1);
  const stepDivider = div({ class: 'border border-gray-100' });
  const stepContent = div({ class: 'flex flex-col gap-y-4 py-2' });

 });
}
}
