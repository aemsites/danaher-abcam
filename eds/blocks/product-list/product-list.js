import {
  a, button, div, h2, h3, p, span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { paginateIndexes } from '../../scripts/scripts.js';

const body = {
  trackingId: 'abcam_us',
  clientId: '88d1fc8e-2f80-477f-b9fa-bd2e75b37c42',
  context: {
    user: { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0' },
    view: { url: 'https://www.abcam.com' },
    capture: true,
    cart: [],
    source: ['@coveo/headless@3.12.0'],
  },
  language: 'en',
  country: 'us',
  currency: 'USD',
  page: 0,
  facets: [],
  sort: { sortCriteria: 'relevance' },
};

async function fetchProductList({
  url = 'https://danahernonproduction1892f3fhz.org.coveo.com/rest/organizations/danahernonproduction1892f3fhz/commerce/v2/listing',
  method = 'POST',
  payload = {},
  page = 0,
}) {
  try {
    payload.page = page;
    const request = await fetch(url, {
      method,
      body: JSON.stringify(payload),
      headers: {
        Authorization: 'Bearer xx5856f60b-8cb0-474f-9536-b8aa88df3f00',
        'content-type': 'application/json',
      },
    });
    const response = await request.json();

    return response.products.length > 0 ? response : [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return error;
  }
}

// Function to create product tags
function addProductTags(productTagsArray) {
  if (!productTagsArray || productTagsArray.length === 0) return null;

  const productTagsDiv = div({ class: 'flex flex-wrap pb-4 gap-2' });
  productTagsArray.forEach((item) => {
    const productTagsButton = button({ class: 'product-tags appearance-none px-2 py-1 rounded-e text-xs font-semibold tracking-wider break-keep bg-[rgb(237,246,247)] text-[rgb(44,101,107)] border-[rgb(44,101,107)] border' });
    productTagsButton.appendChild(span({ class: 'pt-0' }, item));
    productTagsDiv.appendChild(productTagsButton);
  });
  return productTagsDiv;
}

function renderNewRecords(records) {
  const parentContainer = div(
    { class: 'products-parent-container flex flex-col w-full' },
    h2({ class: 'mb-6 font-bold text-2xl' }, 'Products'),
    h3({ class: 'mb-3 font-semibold text-xl' }, 'Product'),
  );

  if (records.length > 0) {
    records.forEach((product) => {
      const productContainer = div(
        { class: 'product-container pb-4 mb-4 border-b border-gray flex flex-col' },
        p({ class: 'font-bold text-gray-400 text-body-small' }, product?.clickUri.split('-').slice(-1)),
        p(
          { class: 'font-bold' },
          a({ class: 'product-link', href: product.clickUri }, product.ec_name),
        ),
      );
      if (product.raw?.producttags) {
        productContainer.append(addProductTags(product.ec_category));
      }
      parentContainer.append(productContainer);
    });
  }
  return parentContainer;
}

async function loadNewPage(block, page = 0) {
  const response = await fetchProductList({ payload: body, page });
  const lists = response.products;
  const content = renderNewRecords(lists, block);
  const totalRecords = response.pagination.totalEntries;
  if (content.children.length > 0) {
    block.innerHTML = '';
    block.append(content);
    if (response.pagination.totalPages > 1) {
      const prevBtnEl = button({
        class: 'previous-button hover:bg-gray-400/30 p-2 rounded-full rotate-90 disabled:opacity-25 disabled:cursor-not-allowed',
        title: 'Previous',
        ...(response.pagination.page === 0) ? { disabled: true } : '',
        onclick: () => loadNewPage(block, response.pagination.page - 1),
      }, span({ class: 'icon icon-chevron-down' }));
      const nextBtnEl = button({
        class: 'next-button p-2 rounded-full -rotate-90 hover:bg-gray-400/30 disabled:opacity-25 disabled:cursor-not-allowed',
        title: 'Next',
        ...(response.pagination.page === (response.pagination.totalPages - 1)) ? { disabled: true } : '',
        onclick: () => loadNewPage(block, response.pagination.page + 1),
      }, span({ class: 'icon icon-chevron-down' }));
      const paginatedArr = paginateIndexes({
        listLength: totalRecords,
        currentPage: response.pagination.page,
        perPage: response.pagination.perPage,
      });
      const paginationContainer = div(
        { class: 'pagination-controls flex flex-wrap justify-center items-center gap-2 mt-8' },
        prevBtnEl,
        ...paginatedArr.map((num) => {
          const selectedPageIndex = ((num - 1) === response.pagination.page);
          if (typeof num === 'string') return button({ class: 'px-4 py-2 rounded-full cursor-text' }, '...');
          return button({
            class: `px-4 py-2 rounded-full cursor-pointer hover:underline ${(selectedPageIndex) ? 'bg-gray-400/30' : 'hover:bg-gray-400/30'}`,
            title: `Page ${num}`,
            ...selectedPageIndex ? { disabled: true } : '',
            onclick: () => loadNewPage(block, (num - 1)),
          }, (num));
        }),
        nextBtnEl,
      );
      decorateIcons(paginationContainer);
      block.append(paginationContainer);
    }
  }
}

export default async function decorate(block) {
  loadNewPage(block);
}
