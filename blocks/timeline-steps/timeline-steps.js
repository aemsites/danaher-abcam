/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // eslint-disable-next-line no-console
  console.log(block);
  const title = block.querySelector('h2');
  title?.classList.add(...'text-3xl mb-6 font-semibold text-heading-large font-header md:pt-20 md:-mt-20'.split(' '));

  // end of the custom code
}
