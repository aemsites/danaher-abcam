import { div } from '../../scripts/dom-builder.js';

export default function decorate() {
  const main = document.querySelector('main');
  const section = div({ class: 'section alternating-wrapper' });
  const wrapper = document.querySelector('.alternating');
  wrapper.classList.add(...'bg-gradient-to-b from-teal-400 via-gray-300 to-orange-500 lg:py-20 sm:p-8 max-sm:p-8'.split(' '));
  if (wrapper) {
    const innerWrapper = wrapper.querySelector('div');
    if (innerWrapper) {
      innerWrapper.classList.add(...'lg:flex bg-neutral-100 lg:mx-28 sm:mx-7 lg:py-0 sm:py-16 sm:block sm:m-8'.split(' '));
      const childDivs = innerWrapper.querySelectorAll('div');
      if (childDivs.length >= 2) {
        childDivs[0].classList.add(...'basis-1/2 items-center px-10 py-16 lg:pl-16 lg:pt-28'.split(' '));
        const h2 = childDivs[0].querySelector('h2');
        const p = childDivs[0].querySelector('p');
        const a = childDivs[0].querySelector('a');
        h2.classList.add(...'title mb-6 text-4xl font-bold'.split(' '));
        p.classList.add(...'description text-lg mb-8 font-normal'.split(' '));
        a.classList.add(...'rounded-2xl text-white text-xs justify-center px-4 font-semibold py-2 w-16 leading-4 items-center tracking-wider leading-10 bg-[#378189] hover:bg-[#2A5F65]'.split(' '));
        childDivs[1].classList.add(...'basis-1/2 w-full'.split(' '));
        childDivs[1].children[0].children[3].classList.add(...'w-full sm:w-full'.split(' '));
      }
    }
    wrapper.appendChild(innerWrapper);
  }
  section.appendChild(wrapper);
  main.appendChild(section);
}
