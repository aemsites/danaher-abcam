import { div, h5 } from '../../scripts/dom-builder.js';

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const title = block.querySelector('h2');
  title?.classList.add(...'text-3xl mb-6 font-semibold text-heading-large font-header md:pt-20 md:-mt-20'.split(' '));
  [...block.children].map((element) => {
    const steps = element.querySelectorAll('ol');
    if (steps && steps.length > 0) {
      let index = 1;
      [...steps].map((eachStep) => {
        [...eachStep.children].forEach((step) => {
          step.className = 'flex gap-x-4 mb-6';
          const stepIndexElement = h5({ class: 'size-10 flex items-center text-lg p-3 border-2 border-black rounded-full list-decimal' }, index);
          const stepDivider = div({ class: 'border border-gray-100' });
          const stepContent = div({ class: 'flex flex-col gap-y-4 py-2' });
          const subPoints = step.querySelector('ul');
          subPoints?.classList.add(...'list-inside list-disc ml-2 text-gray-400'.split(' '));
          stepContent.innerHTML = step.innerHTML;
          step.innerHTML = '';
          step.prepend(stepDivider);
          step.prepend(stepIndexElement);
          step.append(stepContent);
          index += 1;
        });
        return eachStep;
      });
    }
    return steps;
  });
}