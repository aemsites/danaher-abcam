// Description: Add classes to the elements in the block
export default function decorate(block) {
  const parentBlock = block.parentElement?.parentElement?.parentElement?.children[0];
  block.querySelectorAll('div').forEach((row) => {
    row.querySelectorAll('p')?.forEach((p) => {
      if (p.parentElement.className.includes('button-container')) {
        p.classList.add(...'text-xs justify-center font-semibold leading-4 items-center tracking-wider leading-10 text-[#4CA6B3]'.split(' '));
      } else {
        p.classList.add(...'text-sm font-bold'.split(' '));
      }
    });
  });
  parentBlock.append(block.parentElement);
}
