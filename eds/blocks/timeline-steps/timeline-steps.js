import { div, h5 } from '../../scripts/dom-builder.js';

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // eslint-disable-next-line no-console
  console.log(block);
  const stepsData = block.querySelectorAll(':scope > div');
  let index = 1;
  [...stepsData].forEach((element) => {
    element.className = 'flex gap-x-4 mb-6';
    [element].forEach((child) => {
      const stepIndexElement = h5({ class: 'size-10 flex items-center text-lg p-3 border-2 border-black rounded-full list-decimal' }, index);
      const stepDivider = div({ class: 'border border-gray-100' });
      const stepContent = div({ class: 'flex flex-col gap-y-4 py-2' });
      const subPoints = child.querySelector('ul');
      subPoints?.classList.add(...'list-inside list-disc ml-2 text-gray-400'.split(' '));
      stepContent.innerHTML = child.innerHTML;
      child.innerHTML = '';
      child.prepend(stepDivider);
      child.prepend(stepIndexElement);
      child.append(stepContent);
      index += 1;
    });
  });
}
