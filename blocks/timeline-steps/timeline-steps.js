import { decorateIcons } from '../../scripts/aem.js';
import { div, h5, span } from '../../scripts/dom-builder.js';

let nextElement = [];

function detectNextElements(stepsOl) {
  if (stepsOl.nextElementSibling && ['p', 'ul'].includes(stepsOl.nextElementSibling.localName)) {
    nextElement.push(stepsOl.nextElementSibling);
    return detectNextElements(stepsOl.nextElementSibling);
  }
  return false;
}
/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // eslint-disable-next-line no-console
  console.log(block);
  const title = block.querySelector('h2');
  title?.classList.add(...'text-3xl mb-6 font-semibold text-heading-large font-header md:pt-20 md:-mt-20'.split(' '));
  // start of custom code
  [...block.children].map((element) => {
    const description = document.createElement('sub');
    const subtitle = element.children[1]?.querySelector('h3');
    // eslint-disable-next-line no-console
    console.log('subtitle');
    // eslint-disable-next-line no-console
    console.log(subtitle);
    const subtitleFootnote = element.children[1]?.querySelector('ul');
    if (subtitle) {
      subtitle.className = `mb-4 ${subtitleFootnote ? 'text-2xl font-semibold' : 'text-lg tracking-wide'}`.trim();
      description.appendChild(subtitle);
    }
    if (subtitleFootnote) {
      subtitleFootnote.className = 'text-lg trancking-wide list-disc list-inside mb-10 ml-2 text-body-medium [&_li]:text-lg [&_li]:leading-9 [&_li]:tracking-wide [&_li]:text-slate-400';
      description.appendChild(subtitleFootnote);
    }
    const steps = element.querySelectorAll('ol');
    if (steps && steps.length > 0) {
      if (subtitle || subtitleFootnote);
      const stepEl = div({ class: 'text-2xl mb-6 font-semibold' }, 'Steps');
      // eslint-disable-next-line no-console
      console.log(stepEl);
      let index = 1;
      [...steps].map((eachStep) => {
        detectNextElements(eachStep);
        [...eachStep.children].forEach((step, stepIndex) => {
          step.className = 'flex gap-x-4 mb-6';
          const stepIndexElement = h5({ class: 'size-10 flex items-center text-lg p-3 border-2 border-black rounded-full' }, index);
          const stepDivider = div({ class: 'border border-gray-100' });
          const stepContent = div({ class: 'flex flex-col gap-y-4 py-2' });
          const subPoints = step.querySelector('ul');
          subPoints?.classList.add(...'list-inside list-disc ml-2 text-gray-400'.split(' '));
          stepContent.innerHTML = step.innerHTML;
          if (stepIndex === (eachStep.children.length - 1)) {
            nextElement.forEach((nxtEl) => {
              const alert = nxtEl.querySelector('p strong');
              if (alert) {
                let alertType = '';
                const alertWrapper = div({ class: 'flex flex-row gap-1 text-sm font-normal px-6 py-4 rounded-md opacity-65' });
                if (alert.previousElementSibling) {
                  const svg = alert.previousElementSibling.innerHTML.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
                  let svgImage = new DOMParser().parseFromString(svg, 'text/html');
                  svgImage = svgImage.querySelector('svg');
                  if (svgImage?.classList.contains('secondary')) alertType = 'bg-gray-200';
                  else if (svgImage?.classList.contains('success')) alertType = 'bg-green-200';
                  svgImage?.classList.add(...'size-4 shrink-0 fill-current mt-1'.split(' '));
                  if (svgImage.classList) alertWrapper.append(span({ class: `icon ${svgImage.classList}` }));
                }
                alertWrapper.append(alert.innerHTML);
                stepContent.append(alertWrapper);
                if (alertType !== '') alertWrapper.classList.add(alertType);
                decorateIcons(alertWrapper);
              }
              if (nxtEl.children.length === 0) {
                nxtEl.classList.add(...'text-lg text-gray-400 tracking-wide'.split(' '));
                stepContent.append(nxtEl);
              }
              const stepsImage = nxtEl.querySelector('p picture');
              if (stepsImage) {
                stepsImage.children[3].classList.add(...'w-96 h-48'.split(' '));
                stepContent.append(stepsImage);
              }
            });
            nextElement = [];
          }
          step.innerHTML = '';
          step.prepend(stepDivider);
          step.prepend(stepIndexElement);
          step.append(stepContent);
          index += 1;
        });
        return eachStep;
      });
    }
    return 'test';
  });
  // end of the custom code
}
