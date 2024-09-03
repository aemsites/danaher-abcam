import { buildBlock } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  main.classList.add('pb-16');
  const producttabsSection = main.querySelector(':scope > div:nth-child(1)');
  producttabsSection.classList.add(...'container mx-auto px-6 md:px-0 pt-16'.split(' '));

  const productOverviewSection = main.querySelector(':scope > div:nth-child(2)');
  productOverviewSection.classList.add(...'container mx-auto px-6 md:px-0 grid grid-cols-12'.split(' '));

  const reactivitySection = main.querySelector(':scope > div:nth-child(3)');
<<<<<<< HEAD
  reactivitySection.classList.add('bg-slate-100', 'px-6', 'pt-8', 'rounded-lg', 'max-[768px]:w-full');
=======
  reactivitySection.classList.add('bg-slate-100');
>>>>>>> optimus/main

  const targetDataSection = main.querySelector(':scope > div:nth-child(4)');
  targetDataSection.classList.add(...'container mx-auto px-6 md:px-0'.split(' '));

  const recommendedProductSection = main.querySelector(':scope > div:nth-child(5)');
<<<<<<< HEAD
  recommendedProductSection.classList.add(...'bg-slate-100 px-6 rounded-lg'.split(' '));

  const recentlyViewedSection = main.querySelector(':scope > div:nth-child(6)');
  recentlyViewedSection.classList.add('px-6');
=======
  recommendedProductSection.classList.add(...'bg-slate-100'.split(' '));

  const recentlyViewedSection = main.querySelector(':scope > div:nth-child(6)');
  recentlyViewedSection.classList.add(...'container mx-auto px-6 md:px-0'.split(' '));
>>>>>>> optimus/main

  const datasheetSection = main.querySelector(':scope > div:nth-child(7)');
  datasheetSection.classList.add(...'container mx-auto px-6 md:px-0'.split(' '));

  const downloadSection = main.querySelector(':scope > div:nth-child(8)');
  downloadSection.classList.add(...'container mx-auto px-6 md:px-0'.split(' '));

  main.append(
    div(buildBlock('disclaimer', { elems: [] })),
  );
}
