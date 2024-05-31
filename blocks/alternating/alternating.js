export default function decorate() {
  const section = document.querySelector('.alternating-wrapper');
  const wrapper = document.querySelector('.alternating');
  wrapper.classList.add(...'bg-gradient-to-b from-teal-400 via-gray-300 to-orange-500 mx-auto py-[72px] px-[30px] sm:px-[61px] w-full'.split(' '));
  if (wrapper) {
    const innerWrapper = wrapper.querySelector('div');
    if (innerWrapper) {
      innerWrapper.classList.add(...'lg:flex bg-neutral-100 sm:block mx-auto bg-grey-5 max-w-[1120px]'.split(' '));
      innerWrapper.querySelectorAll('div').forEach((row, index) => {
        row.classList.add('basis-1/2');
        if (index === 0) {
          row.classList.add(...'self-center px-10 py-16 lg:pb-15 md:pl-[62px]'.split(' '));
          row.querySelector('h2')?.classList.add(...'title mb-6 text-4xl font-bold text-heading-large font-header'.split(' '));
          row.querySelectorAll('p')?.forEach((p) => {
            if (p.className.includes('button-container')) {
              p.querySelector('a')?.classList.add(...'rounded-2xl text-white text-xs justify-center px-4 font-semibold py-2 w-16 leading-4 items-center tracking-wider leading-10 bg-[#378189] hover:bg-[#2A5F65]'.split(' '));
            } else {
              p.classList.add(...'description text-lg mb-8 font-normal'.split(' '));
            }
          });
        } else {
          const pictureTag = row.querySelector('picture');
          const imgTag = pictureTag?.querySelector('img');
          if (imgTag) {
            imgTag.classList.add(...'max-[799px]:w-full w-full h-full'.split(' '));
          }
        }
      });
    }
    wrapper.appendChild(innerWrapper);
  }
  section.appendChild(wrapper);
}
