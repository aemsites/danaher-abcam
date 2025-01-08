import { div, h5 } from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const contentSections = document.querySelectorAll('[data-stepnumber]');
  var indexNum=1;
  const timelineStep=block.parentElement.parentElement.nextSibling.nextSibling.dataset.stepnumber; 
  contentSections.forEach((section) => {
   if(timelineStep==section.dataset.stepnumber){ 
    const stepIndexElement = h5({ class: 'size-10 flex items-center text-lg p-3 border-2 border-black rounded-full' }, indexNum);
    const stepDivider = div({ class: 'border border-gray-100' });
    const wrapper = document.createElement('div');
    wrapper.prepend(stepDivider);
    wrapper.prepend(stepIndexElement);
    wrapper.append(...section.childNodes);
    console.log(section);
    section.append(wrapper);
    applyClasses(wrapper, 'flex gap-x-4 mb-6');
    indexNum++;
}
});
}
