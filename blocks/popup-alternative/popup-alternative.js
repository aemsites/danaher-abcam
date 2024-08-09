export default function decorate(block) {
  block.classList.add(...'max-w-[600px] justify-between gap-4 py-4 px-6 tracking-wide'.split(' '));
  const innerDiv = block.querySelector('div');
  if (innerDiv) {
    innerDiv.classList.add(...'first-box'.split(' '));
  }
  const innerofdiv = innerDiv.querySelector('div');
  if (innerofdiv) {
    innerofdiv.classList.add('second-box');
    const headings = innerofdiv.querySelectorAll('h1, h3');
    headings.forEach((heading) => {
      if (heading.tagName === 'H1') {
        heading.classList.add('font-bold', 'text-2xl', 'mb-4');
      } else if (heading.tagName === 'H3') {
        heading.classList.add('font-bold', 'text-sm');
      }
    });
    const paragraphs = innerofdiv.querySelectorAll('p');
    paragraphs.forEach((paragraph) => {
      paragraph.classList.add('text-sm', 'mb-4', 'text-gray-800');
    });
  }
}
