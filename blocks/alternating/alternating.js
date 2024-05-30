export default function decorate() {
  const main = document.querySelector('#main');
  const section = document.querySelectorAll('.alternating-wrapper');
  const wrapper = document.querySelector('.alternating');
  wrapper.classList.add(...'bg-gradient-to-b from-teal-400 via-gray-300 to-orange-500 mx-auto py-[72px] px-[30px] sm:px-[61px] w-full'.split(' '));
  if (wrapper) {
    const innerWrapper = wrapper.querySelector('div');
    if (innerWrapper) {
      innerWrapper.classList.add(...'lg:flex bg-neutral-100 sm:block mx-auto bg-grey-5 max-w-[1120px]'.split(' '));
      const childDivs = innerWrapper.querySelectorAll('div');
      if (childDivs.length >= 2) {
        childDivs[0].classList.add(...'self-center px-10 py-16 lg:pb-15 md:pl-[62px] basis-1/2'.split(' '));
        const h2 = childDivs[0].querySelector('h2');
        const p = childDivs[0].querySelector('p');
        const a = childDivs[0].querySelector('a');
        h2.classList.add(...'title mb-6 text-4xl font-bold text-heading-large font-header'.split(' '));
        p.classList.add(...'description text-lg mb-8 font-normal'.split(' '));
        a.classList.add(...'rounded-2xl text-white text-xs justify-center px-4 font-semibold py-2 w-16 leading-4 items-center tracking-wider leading-10 bg-[#378189] hover:bg-[#2A5F65]'.split(' '));
        childDivs[1].classList.add('basis-1/2');
        childDivs[1].children[0].children[3].classList.add(...'w-full sm:w-full'.split(' '));
      }
    }
    wrapper.appendChild(innerWrapper);
  }
  section.appendChild(wrapper);
  main.appendChild(wrapper);
}