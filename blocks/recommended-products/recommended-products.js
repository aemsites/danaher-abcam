import { decorateIcons } from '../../scripts/aem.js';
import { h2, ol, li, button, span, div, hr } from '../../scripts/dom-builder.js';
import { getProductResponse } from '../../scripts/search.js';
import { starRating } from '../../blocks/product-overview/product-overview.js';

export default async function decorate(block) {
  const response = await getProductResponse();
  const allRecommendations = response?.at(0)?.raw?.crosssellrecommendationsjson;
  if(!allRecommendations) block.closest('.section').remove();
  else{
    try {
      const heading = h2({ class: 'text-lg mb-3  text-black-0' }, 'Recommended Products');
      const recommendations = ol({ class: 'flex flex wrap mt-5 gap-4' });
      allRecommendations.forEach(recommendation => {
        console.log(JSON.parse(recommendation));
        const { product } = JSON.parse(recommendation);
        const { categoryType, productCode, name, reviewsSummary } = product;
        const { aggregatedRating, numberOfReviews } = reviewsSummary;

        const rating = starRating(aggregatedRating, div({class: 'flex items-center mt-2 gap-x-1'}), 'w-5');
        rating.append(span({class: 'text-xs text-[#65797c]'}, `(${numberOfReviews} Reviews)`) )

        const list = li({ class: 'basis-[23.5%]' },
          button({class: 'h-44 p-4 bg-white w-full border border-interactive-grey-transparent-active rounded-4px hover:bg-interactive-black-transparent-hover cursor-pointer text-left'},
            div({ class: 'h-5/6' },
              span({ class: 'flex gap-2' },
                div({ class: 'px-2 py-1 rounded-4px text-xs font-semibold tracking-wider break-keep bg-[#edf6f7] text-[#2c656b] border-blue-70 border', 'data-testid': 'tag' }, categoryType),
              ),
              span({ class: 'flex flex-col font-semibold' },
                span({ class: 'mt-4 text-ui-small text-[#65797c]' }, productCode),
                span({ class: 'pb-4 mt-2 text-ui-medium text-black-0 line-clamp-2' }, name),
              )
            ),
            div({class: 'h-1/6'},
              hr({class: 'h-[1px] bg-interactive-grey-active my-0 h-1px border-interactive-grey-transparent-active'}),
              rating,
            )
          )
        );
        decorateIcons(list);
        recommendations.append(
          list
        );
      });
      block.append(heading, recommendations);
    } catch (error) {
      console.error('Error while parsing recommendations', error);
    }
  }
}
