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
  const timeline = [...block.children].map((element) => {
    const timelineWrapper = document.createElement('div');
    const title = element.querySelector('h2');
    title.className = 'text-3xl mb-6 font-semibold text-heading-large font-header md:pt-20 md:-mt-20';
    timelineWrapper.append(title);
    const description = document.createElement('sub');
    const subtitle = element.children[1]?.querySelector('p');
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
      if (subtitle || subtitleFootnote) timelineWrapper.append(description);
      const stepEl = document.createElement('div');
      stepEl.className = 'text-2xl mb-6 font-semibold';
      stepEl.innerHTML = 'Steps';
      timelineWrapper.append(stepEl);
      let index = 1;
      [...steps].map((eachStep) => {
        detectNextElements(eachStep);
        [...eachStep.children].forEach((step, stepIndex) => {
          step.className = 'flex gap-x-4 mb-6';
          const stepIndexElement = document.createElement('h5');
          stepIndexElement.className = 'size-10 flex items-center text-lg p-3 border-2 border-black rounded-full';
          stepIndexElement.innerHTML = index;
          const stepDivider = document.createElement('div');
          stepDivider.className = 'border border-gray-100';
          const stepContent = document.createElement('div');
          stepContent.className = 'flex flex-col gap-y-4 py-2';
          const subPoints = step.querySelector('ul');
          subPoints?.classList.add(...'list-inside list-disc ml-2 text-gray-400'.split(' '));
          stepContent.innerHTML = step.innerHTML;
          if (stepIndex === (eachStep.children.length - 1)) {
            nextElement.forEach((nxtEl) => {
              const alert = nxtEl.querySelector('p strong');
              if (alert) {
                let alertType = '';
                const alertWrapper = document.createElement('div');
                if (alert.previousElementSibling) {
                  const svg = alert.previousElementSibling.innerHTML.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
                  let svgImage = new DOMParser().parseFromString(svg, 'text/html');
                  svgImage = svgImage.querySelector('svg');
                  if (svgImage?.classList.contains('secondary')) alertType = 'bg-gray-200';
                  else if (svgImage?.classList.contains('success')) alertType = 'bg-green-200';
                  svgImage?.classList.add(...'size-4 shrink-0 fill-current mt-1'.split(' '));
                  alertWrapper.append(svgImage);
                }
                alertWrapper.append(alert.innerHTML);
                stepContent.append(alertWrapper);
                alertWrapper.classList.add(...`flex flex-row gap-1 text-sm font-normal px-6 py-4 rounded-md opacity-65 ${alertType}`.trim().split(' '));
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
        timelineWrapper.append(eachStep);
        return eachStep;
      });
    }
    return timelineWrapper;
  });
  block.innerHTML = '';
  timeline.forEach((element) => {
    block.append(element);
  });
}
