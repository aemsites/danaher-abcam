import { buildBlock } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default async function buildAutoBlocks() {
  const main = document.querySelector('main');
  main.classList.add('pb-16');
  const producttabsSection = main.querySelector(':scope > div:nth-child(1)');
  producttabsSection.classList.add(...'mx-auto w-[87%] max-[768px]:w-full px-6 pt-16'.split(' '));

  const productOverviewSection = main.querySelector(':scope > div:nth-child(2)');
  productOverviewSection.classList.add(...'mx-auto w-[87%] max-[768px]:w-full px-6 grid grid-cols-12'.split(' '));

  const reactivitySection = main.querySelector(':scope > div:nth-child(3)');
  reactivitySection.classList.add('bg-slate-100', 'px-6', 'py-8', 'rounded-lg');

  const targetDataSection = main.querySelector(':scope > div:nth-child(4)');
  targetDataSection.classList.add('px-6');

  const recommendedProductSection = main.querySelector(':scope > div:nth-child(5)');
  recommendedProductSection.classList.add('bg-slate-100', 'px-6', 'py-8', 'rounded-lg');

  const recentlyViewedSection = main.querySelector(':scope > div:nth-child(6)');
  recentlyViewedSection.classList.add('px-6', 'py-8');

  const datasheetSection = main.querySelector(':scope > div:nth-child(7)');
  datasheetSection.classList.add(...'mx-auto w-[87%] max-[768px]:w-full px-6'.split(' '));

  const downloadSection = main.querySelector(':scope > div:nth-child(8)');
  downloadSection.classList.add(...'mx-auto w-[87%] max-[768px]:w-full px-6'.split(' '));

  main.append(
    div(buildBlock('disclaimer', { elems: [] })),
  );
}
