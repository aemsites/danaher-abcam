import { fetchResponse } from './scripts.js';
import { sampleRUM, getMetadata } from './aem.js';

const bearerToken = 'xx8911235c-5e72-43cc-b401-bd85e9072adc';
const orgId = 'danahernonproduction1892f3fhz';
let is404Loaded = false;
let results;

/**
 *
 * @returns Product SKU from requested URL
 */
export function getSKU() {
  const sku = window.location.pathname.split('/');
  return sku.pop();
}

/**
 *
 * @returns Selected Product category
 */
export function getSelectedProductCategory() {
  return getMetadata('category-type');
}

export async function getFullResponse(sku, selectedProductCategory, selectedPage) {
  const url = `https://${orgId}.org.coveo.com/rest/search/v2`;
  let body = {};
  if (sku !== undefined && sku !== null) {
    body = {
      aq: `@productslug==${sku}`,
      pipeline: 'Abcam Product Details',
      searchHub: 'AbcamProductDetails',
    };
  }
  if (selectedProductCategory !== undefined && selectedProductCategory !== null
    && selectedPage !== null) {
    body = {
      pipeline: 'Abcam Category Product Listing',
      searchHub: 'AbcamCategoryProductListing',
      numberOfResults: 20,
      firstResult: selectedPage,
      facets: [
        {
          currentValues: [
            {
              value: selectedProductCategory,
              state: 'selected',
            },
          ],
          facetId: 'categorytype',
          field: 'categorytype',
        },
      ],
    };
  }
  const config = {
    url,
    method: 'POST',
    authToken: bearerToken,
    body: JSON.stringify(body),
  };
  results = await fetchResponse(config);
  return results;
}

async function redirect404() {
  if (!is404Loaded) {
    await fetch('/404.html')
      .then((html) => html.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        document.head.innerHTML = doc.head.innerHTML;
        document.querySelector('main').innerHTML = doc.querySelector('main')?.innerHTML;
        document.title = 'Product Not Found';
        document.querySelector('h2.error-message').innerText = 'Product Not Found';
        window.addEventListener('load', () => sampleRUM('404', { source: document.referrer, target: window.location.href }));
      })
      .catch((error) => {
      // eslint-disable-next-line no-console
        console.error('Error:', error);
      });
  }
  is404Loaded = true;
}

/**
 *
 * @returns Product response JSON
 */
/* eslint consistent-return: off */
export async function getProductResponse() {
  try {
    let response = JSON.parse(localStorage.getItem('optimus-product-details'));
    const sku = getSKU();

    if (response?.at(0)?.raw.productslug === sku) {
      return response;
    }

    localStorage.removeItem('optimus-product-details');
    const fullResponse = await getFullResponse(sku);

    if (fullResponse.results.length > 0) {
      response = fullResponse.results;
      localStorage.setItem('optimus-product-details', JSON.stringify(fullResponse.results));
      return response;
    }
    await redirect404();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

/**
 *
 * @returns Products List response JSON
 */
/* eslint consistent-return: off */
export async function getProductsListResponse(page) {
  try {
    const productCategory = getSelectedProductCategory();
    const fullResponse = await getFullResponse(null, productCategory, page);

    if (fullResponse.results.length > 0) {
      return JSON.stringify(fullResponse);
    }
    await redirect404();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}
