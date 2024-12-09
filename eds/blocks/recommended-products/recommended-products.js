import { decorateIcons } from '../../scripts/aem.js';
import {
  ul, li, span, div, hr, p,
} from '../../scripts/dom-builder.js';
import { applyClasses } from '../../scripts/scripts.js';
import { getProductResponse } from '../../scripts/search.js';
import { getStarRating } from '../product-overview/product-overview.js';

function getTag(tagEl) {
  const tag = tagEl?.firstElementChild?.textContent?.split('/')?.pop()?.replace(/-/g, ' ');
  tagEl.firstElementChild.textContent = tag;
}

function createRecommendations(allRecommendations) {
  const recommendations = ul({ class: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5' });
  allRecommendations.forEach((recommendation) => {
    const { product } = JSON.parse(recommendation);
    const {
      categoryType, productCode, name, reviewsSummary,
    } = product;
    const { aggregatedRating, numberOfReviews } = reviewsSummary;

    const rating = getStarRating(aggregatedRating, div({ class: 'flex items-center mt-2 gap-x-1' }), 'size-5');
    rating.append(span({ class: 'text-sm text-[#65797c] tracking-wide' }, `(${numberOfReviews} Reviews)`));

    const list = li(
      { class: 'h-auto size-full flex flex-col align-center text-left p-4 bg-white border border-[#0711121a] rounded hover:bg-[#0000000d] cursor-pointer' },
      p(
        { class: 'w-fit px-2 py-1 rounded text-xs text-emerald-800 border border-emerald-900 bg-[#edf6f7]' },
        categoryType,
      ),
      p({ class: 'mt-4 text-xs text-[#65797c] font-medium font-sans lowercase' }, productCode),
      p({ class: 'mb-4 mt-2 text-sm text-black font-medium line-clamp-2' }, name),
      div(
        { class: 'mt-auto' },
        hr({ class: 'h-px border-b border-[#0711121a]' }),
        rating,
      ),
    );
    decorateIcons(list);
    recommendations.append(list);
  });
  return recommendations;
}

function updateFeatureProducts(products) {
  products.forEach((product) => {
    const divEls = div({ class: 'w-full' });
const imageEls = div({ class: 'pt-20 flex flex-col lg:flex-row lg:space-x-4' }); // flex-col for mobile, flex-row for tablets and above
getTag(product);
applyClasses(product, 'w-[299px] h-auto size-full flex flex-row align-center text-left p-4 bg-white border border-[#0711121a] rounded hover:bg-[#0000000d] cursor-pointer');
applyClasses(product.querySelector('div:nth-child(1)'), 'w-fit px-2 py-1 rounded text-xs text-emerald-800 border border-emerald-900 bg-[#edf6f7]');
applyClasses(product.querySelector('div:nth-child(2)'), 'mt-4 text-xs text-[#65797c] font-medium font-sans lowercase');
applyClasses(product.querySelector('div:nth-child(3)'), 'mb-4 mt-2 text-sm text-black font-medium pb-4');
applyClasses(product.querySelector('div:nth-child(3) > span'), 'line-clamp-2');
applyClasses(product.querySelector('div:nth-child(3) > p'), 'h-24 overflow-hidden');
applyClasses(product.querySelector('p > a'), 'w-fit inline-flex text-xs font-semibold items-center text-[#378189]');
const lastDiv = product.querySelector('div:last-child');
applyClasses(lastDiv, 'text-xs italic md:w-[55%]');
const ahref = lastDiv.querySelectorAll('a');
if (ahref.length > 0) {
  ahref.forEach((a) => {
    applyClasses(a, 'underline');
  });
}

// Add the second last child to imageEls
imageEls.append(product.querySelector('div:nth-last-child(2)'));

// Only append lastDiv if it's not empty
if ((lastDiv && lastDiv.textContent.trim() !== '') || lastDiv.querySelector('a') !== null) {
  imageEls.append(lastDiv);
}

// Create the divEls structure with all necessary children
divEls.append(
  product.querySelector('div:nth-child(1)'),
  product.querySelector('div:nth-child(2)'),
  product.querySelector('div:nth-child(3)'),
  imageEls,
  product.querySelector('div:nth-child(4)')
);

// Clear the product container and append the new structure
product.innerHTML = '';
product.append(divEls);

  });
}

export default async function decorate(block) {
  if (block.className.includes('products-recommended')) {
    block.classList.add(...'container mx-auto px-6 md:px-0'.split(' '));
    const response = await getProductResponse();
    const allRecommendations = response?.at(0)?.raw?.crosssellrecommendationsjson;
    if (!allRecommendations) block.closest('.section').remove();
    else {
      try {
        block.append(createRecommendations(allRecommendations));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error while parsing recommendations', error);
      }
    }
  } else if (block.className.includes('featured-products')) {
    applyClasses(block, 'my-8 flex flex-col lg:flex-row gap-4');
    updateFeatureProducts(Array.from(block.children));
  }
}
