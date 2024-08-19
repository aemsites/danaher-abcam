export default function decorate(block) {
  block.classList.add(...'lg:flex bg-neutral-100 sm:block mx-auto bg-grey-5 w-[87%] max-[768px]:w-full'.split(' '));
  const innerWrapper = document.querySelector('.alternating');
  console.log(innerWrapper);
  //innerWrapper.classList.add(...''.split(' '));
  const buttonContainer = block.querySelector('.button-container');
  innerWrapper.querySelectorAll('div').forEach((row, index) => {
    row.classList.add('basis-1/2');
    //row.append(buttonContainer);
    if (index === 0) {
      row.classList.add(...'self-center px-10 py-16 lg:pb-15 md:pl-[62px]'.split(' '));
      row.querySelector('h2')?.classList.add(...'title mb-6 text-4xl font-bold text-heading-large font-header'.split(' '));
      row.querySelectorAll('p')?.forEach((p) => {
        if (p.className.includes('button-container')) {
          p.querySelector('a')?.classList.add(...'rounded-2xl text-white text-xs justify-center px-4 font-semibold py-2.5 w-16 leading-4 items-center tracking-wider leading-10 bg-[#378189] hover:bg-[#2A5F65]'.split(' '));
        } else {
          p.classList.add(...'description text-lg mb-8 font-normal'.split(' '));
        }
      });
    } else {
      const pictureTag = row.querySelector('div > div > picture');
      const imgTag = pictureTag?.querySelector('img');
      if (imgTag) {
        imgTag.classList.add(...'max-[799px]:w-full w-full h-full'.split(' '));
      }
    }
  });
}
