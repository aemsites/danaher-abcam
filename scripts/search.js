import { fetchResponse } from './scripts.js';
import { sampleRUM } from './aem.js';

const bearerToken = 'xxb93228c5-e569-44de-8dc2-cbb51525ad67';
const orgId = 'danahernonproduction1892f3fhz';
let is404Loaded = false;
let isFetchCalled = false;
let results;

/**
 *
 * @returns Product SKU from requested URL
 */
export function getSKU() {
  const sku = window.location.pathname.split('/');
  return sku.pop();
}

async function getFullResponse(sku) {
  if (!isFetchCalled) {
    const url = `https://${orgId}.org.coveo.com/rest/search/v2`;
    const body = {
      aq: `@productslug==${sku}`,
      pipeline: 'Abcam Product Details',
      searchHub: 'AbcamProductDetails',
    };
    const config = {
      url,
      method: 'POST',
      authToken: bearerToken,
      body: JSON.stringify(body),
    };
    results = await fetchResponse(config);
  }
  isFetchCalled = true;
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
