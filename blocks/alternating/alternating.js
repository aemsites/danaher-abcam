export default function decorate(block) {
  block.classList.add(...'lg:flex bg-neutral-100 sm:block mx-auto xl:max-w-[1120px] xl:px-0'.split(' '));
  block.querySelectorAll('div').forEach((row, index) => {
    row.classList.add('basis-1/2');
    if (!row.textContent.trim() && row.children.length === 0) {
      row.remove();
    } else if (index === 0) {
      row.classList.add(...'self-center px-10 py-16 lg:pb-15 md:pl-[62px]'.split(' '));
      row.querySelector('h2')?.classList.add(...'title mb-6 text-4xl font-bold text-heading-large font-header'.split(' '));
      row.append(block.querySelector('.button-container'));
      row.querySelectorAll('p')?.forEach((p) => {
        if (p.parentElement.className.includes('button-container')) {
          p.querySelector('a')?.classList.add(...'text-xs justify-center px-4 font-semibold py-2.5 w-16 leading-4 items-center tracking-wider leading-10'.split(' '));
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
