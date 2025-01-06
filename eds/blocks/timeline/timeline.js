import { div, h5 } from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function decorate() {
  const contentSections = document.querySelectorAll('[data-stepnumber]');
  contentSections.forEach((section) => {
    const stepIndexElement = h5({ class: 'size-10 flex items-center text-lg p-3 border-2 border-black rounded-full' }, section.dataset.stepnumber);
    const stepDivider = div({ class: 'border border-gray-100' });
    const wrapper = document.createElement('div');
    wrapper.prepend(stepDivider);
    wrapper.prepend(stepIndexElement);
    wrapper.append(...section.childNodes);
    section.append(wrapper);
    applyClasses(wrapper, 'flex gap-x-4 mb-6');
  });
}
