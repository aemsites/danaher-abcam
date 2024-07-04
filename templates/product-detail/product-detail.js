import { buildBlock } from '../../scripts/aem.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  main.classList.add('pb-16');
  const producttabsSection = main.querySelector(':scope > div:nth-child(1)');
  producttabsSection.classList.add(...'mx-auto w-[87%] max-[768px]:w-full px-32 pt-16'.split(' '));
  const productOverviewSection = main.querySelector(':scope > div:nth-child(2)');
  productOverviewSection.classList.add(...'mx-auto w-[87%] max-[768px]:w-full px-32 grid grid-cols-12'.split(' '));
  const reactivitySection = main.querySelector(':scope > div:nth-child(3)');
  reactivitySection.classList.add('bg-slate-100', 'p-8', 'rounded-lg');
  const targetDataSection = main.querySelector(':scope > div:nth-child(4)');
  targetDataSection.classList.add('p-8');
  const recommendedProductSection = main.querySelector(':scope > div:nth-child(5)');
  recommendedProductSection.classList.add('bg-slate-100', 'p-8', 'rounded-lg');
  const recentlyViewedSection = main.querySelector(':scope > div:nth-child(6)');
  recentlyViewedSection.classList.add('p-8');

  main.append(
    buildBlock('disclaimer', { elems: [] }),
  );
}
