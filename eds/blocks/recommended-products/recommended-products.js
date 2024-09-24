import { decorateIcons } from '../../scripts/aem.js';
import {
  h2, ul, li, span, div, hr,
  p,
} from '../../scripts/dom-builder.js';
import { getProductResponse } from '../../scripts/search.js';
import { getStarRating } from '../product-overview/product-overview.js';

export default async function decorate(block) {
  block.classList.add(...'container mx-auto px-6 md:px-0'.split(' '));
  const response = await getProductResponse();
  const allRecommendations = response?.at(0)?.raw?.crosssellrecommendationsjson;
  if (!allRecommendations) block.closest('.section').remove();
  else {
    try {
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
      block.append(
        h2({ class: 'text-xl mb-3  text-black-0' }, 'Recommended Products'),
        recommendations,
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error while parsing recommendations', error);
    }
  }
}
