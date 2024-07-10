export default async function decorate(block) {
  block.classList.add(...'hidden lg:block h-1/4 w-auto bg-teal-100 col-span-4'.split(' '));
  block.textContent = 'Product Buybox Placeholder';
}
