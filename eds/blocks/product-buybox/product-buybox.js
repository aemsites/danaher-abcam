import { button, div, span } from '../../../eds/scripts/dom-builder.js';

export default async function decorate(block) {
  block.classList.add(...'hidden lg:block h-1/2 rounded-lg w-auto bg-[#edf7f6] col-span-4 p-4'.split(' '));
  const buyBoxContainer = div(
    { class: 'asset-info-buy-ProductContainer text-center p-6 tracking-wide' },
    div(
      { class: 'size-box' },
      div(
        { class: 'product-size pb-6' },
        div({ class: 'product-size-label font-semibold' }, 'Product size:'),
        div({ class: 'product-weight' }, 'No data available'),
      ),
      div(
        { class: 'quantity-container pb-6' },
        div({ class: 'quantity-label font-semibold' }, 'Quantity:'),
        div(
          { class: 'quantity-count' },
          div({ class: 'quantity-label' }, 'NA'),
        ),
      ),
      button(
        { class: 'inquiry-button mb-4 py-2 bg-[#378189] hover:bg-[#2A5F65] text-white rounded-3xl flex justify-center w-full' },
        span({ class: 'button-text' }, 'Add to inquiry basket'),
      ),
    ),
    div({ class: 'need-help text-[#378189] underline cursor-pointer' }, 'Need technical support?'),
  );
  block.append(buyBoxContainer);
}
