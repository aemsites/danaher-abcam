export default function decorate(block) {
  const description = block.querySelector('p:nth-of-type(2)');
  if (description) description.classList.add(...'text-lg tracking-[0.3px] leading-7'.split(' '));
}
