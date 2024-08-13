import { getProductsListResponse } from '../../scripts/search.js';
import {
  a, button, div, h2, h3, p, span,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

// Constants
const pageSize = 20; // Number of records per page
let currentPage = 1; // Current page number

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

// Function to render records on the page
function renderRecords(records, block) {
  block.replaceChildren(); // Clear previous content
  const parentContainer = div(
    { class: 'products-parent-container flex flex-col w-full' },
    h2({ class: 'mb-6 font-bold text-2xl' }, 'Products'),
    h3({ class: 'mb-3 font-semibold text-xl' }, 'Product'),
  );

  if (records.length > 0) {
    records.forEach((product) => {
      const productContainer = div(
        { class: 'product-container pb-4 mb-4 border-b border-gray flex flex-col' },
        p({ class: 'font-bold text-gray-400 text-body-small' }, product.raw?.productslug.split('-').slice(-1)),
        p(
          { class: 'font-bold' },
          a({ class: 'product-link', href: `${window.location.origin}/products/detail/${product.raw.productslug}` }, product.raw?.title),
        ),
      );
      if (product.raw?.producttags) {
        if (addProductTags !== null) {
          productContainer.append(addProductTags(product.raw.producttags));
        }
      }
      parentContainer.append(productContainer);
    });
    block.append(parentContainer);
  }
}
// Function to load a specific page of records
async function loadPage(page, block) {
  currentPage = page;
  const result = (page - 1) * pageSize;
  const productFullResponse = await getProductsListResponse(result);
  const parsedJson = JSON.parse(productFullResponse);
  const productsListResponse = parsedJson.results;

  renderRecords(productsListResponse, block);
  const totalRecords = parsedJson.totalCount;
  const totalPages = Math.ceil(totalRecords / pageSize);

  const paginationContainer = div({ class: 'pagination-controls flex flex-wrap justify-center items-center gap-2 mt-8' });
  paginationContainer.replaceChildren();
  block.append(paginationContainer); // Clear previous pagination

  const prevButton = button({ class: 'previous-button cursor-not-allowed hover:bg-gray-400/30 p-2 rounded-full rotate-90', title: 'Next' }, span({ class: 'icon icon-chevron-down' }));
  paginationContainer.appendChild(prevButton);

  // Always show the first page
  const firstPageButton = button({ class: 'first-page hover:underline hover:bg-gray-400/30 px-4 py-2 rounded-full cursor-pointer bg-gray-400/30' }, 1);
  firstPageButton.onclick = () => loadPage(1, block);
  paginationContainer.appendChild(firstPageButton);

  // Create the Previous button
  if (page > 1) {
    paginationContainer.querySelector('.previous-button').classList.remove('cursor-not-allowed');
    paginationContainer.querySelector('.first-page').classList.remove('bg-gray-400/30');
    prevButton.onclick = () => loadPage(page - 1, block);
  }

  // Show dots after the first number if there are more pages
  if (page > 7) {
    const ellipsisButton = span({ class: 'ellipsis-button' }, '. . .');
    paginationContainer.appendChild(ellipsisButton);
  }

  // Calculate the range of page numbers to show
  const maxVisiblePages = 13;
  const middlePage = Math.floor(maxVisiblePages / 2);
  let startPage; let
    endPage;

  if (totalPages <= maxVisiblePages) {
    // If total pages is less than or equal to maxVisiblePages, show all pages
    startPage = 2;
    endPage = totalPages - 1;
  } else if (page <= middlePage) {
    // If current page is in the first half
    startPage = 2;
    endPage = startPage + maxVisiblePages - 2;
  } else if (page + middlePage >= totalPages) {
    // If current page is in the last half
    endPage = totalPages;
    startPage = endPage - maxVisiblePages + 2;
  } else {
    // If current page is in the middle
    startPage = page - middlePage + 1;
    endPage = page + middlePage - 1;
  }

  // Show page numbers in the calculated range
  for (let i = startPage; i <= endPage; i += 1) {
    if (i === page) {
      const activePageButton = button({ class: 'hover:underline px-4 py-2 rounded-full cursor-pointer bg-gray-400/30' }, i); // Highlight the active page
      paginationContainer.appendChild(activePageButton);
    } else {
      const pageButton = button({ class: 'px-4 py-2 rounded-full cursor-pointer hover:underline hover:bg-gray-400/30' }, i);
      pageButton.textContent = i;
      pageButton.onclick = () => loadPage(i, block);
      paginationContainer.appendChild(pageButton);
    }
  }

  // Show dots before the last number if there are more pages
  if (totalPages > 1 && totalPages - page > middlePage) {
    const ellipsisButton = span({ class: 'ellipsis-button' }, '. . .');
    paginationContainer.appendChild(ellipsisButton);
  }

  if (totalPages !== page && totalPages - page > middlePage) {
    const lastPageButton = button({ class: 'hover:underline hover:bg-gray-400/30 px-4 py-2 rounded-full cursor-pointer' }, totalPages);
    lastPageButton.onclick = () => loadPage(totalPages, block);
    paginationContainer.appendChild(lastPageButton);
  }

  // Create the Next button
  const nextButton = button({ class: 'p-2 rounded-full -rotate-90 hover:bg-gray-400/30', title: 'Previous' }, span({ class: 'icon icon-chevron-down' }));
  paginationContainer.appendChild(nextButton);
  if (currentPage < totalPages) {
    nextButton.onclick = () => loadPage(currentPage + 1, block);
  } else {
    nextButton.classList.add('cursor-not-allowed');
  }
  decorateIcons(paginationContainer);
}

// Main function to initialize the pagination
export default async function decorate(block) {
  loadPage(currentPage, block);
}
