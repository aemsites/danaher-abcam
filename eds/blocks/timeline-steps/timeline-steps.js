import { div, h5, img } from '../../scripts/dom-builder.js';

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
      const subPointsColorH3 = child.querySelector('h3');
      if (subPoints?.querySelectorAll('li').length > 1) subPoints?.classList.add(...'list-disc ml-2 text-gray-400'.split(' '));
      else subPoints?.classList.add(...'ml-2 text-gray-400'.split(' '));
      if (subPointsColorH3) {
        const alert = div({ class: 'flex bg-green-100 text-sm  text-gray-400   py-4 px-6' }, div({ class: 'mr-2 mt-0.5' }, img({ src: '/eds/icons/notification-positive.svg', alt: 'no alert' })), subPointsColorH3.innerHTML);
        child.appendChild(alert);
      }
      stepContent.innerHTML = child.innerHTML;
      child.innerHTML = '';
      child.prepend(stepDivider);
      child.prepend(stepIndexElement);
      child.append(stepContent);
      index += 1;
    });
  });
}
