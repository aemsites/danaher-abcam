export default async function decorate(block) {
  block.classList.add(...'mx-auto w-[87%] max-[768px]:w-full'.split(' '));
  // block.textContent = 'Recently viewed products Placeholder';
}
