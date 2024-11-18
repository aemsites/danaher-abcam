export default function decorate(block) {
  // eslint-disable-next-line no-console
  console.log(block);
  block.classList.add(...'bg-black text-white p-8'.split(' '));
}
