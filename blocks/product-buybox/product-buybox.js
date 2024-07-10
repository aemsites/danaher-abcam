export default async function decorate(block) {
  block.classList.add(...'hidden lg:block h-1/4 w-auto bg-[#edf7f6] col-span-4 p-6'.split(' '));
  block.textContent = 'Product Buybox Placeholder';
}
