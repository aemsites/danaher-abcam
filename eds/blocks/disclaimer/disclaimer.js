import { getMetadata } from '../../../eds/scripts/aem.js';
import { div, p } from '../../../eds/scripts/dom-builder.js';

export default function decorate(block) {
  block.innerHTML = '';
  block.classList.add(...'mx-auto w-[87%] max-[768px]:w-full px-4'.split(' '));
  const contactInfo = div({ class: 'flex flex-col py-8 box-content mx-auto justify-center' }, div({ class: 'tracking-wider font-normal text-xs/6 mb-2 text-[#65797C]' }, p(getMetadata('contact-info-1')), p(getMetadata('contact-info-2'))));
  block.append(contactInfo);
}
