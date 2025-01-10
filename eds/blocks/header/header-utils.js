function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}
const lastSelectedCountry = getCookie('NEXT_COUNTRY');

export function basicDetails() {
  return {
    shoppingBaskedId: localStorage.getItem('shoppingBasketId')?.replace(/"/g, ''),
    lastSelectedCountry,
    selectedCountry: (lastSelectedCountry !== null) ? lastSelectedCountry : 'US',
    host: window.location.host === 'www.abcam.com' ? 'proxy-gateway.abcam.com' : 'proxy-gateway-preprod.abcam.com',
  };
}
async function getApiResponse(url, methodType, body) {
  const options = {
    method: methodType,
    headers: {
      'x-abcam-app-id': 'b2c-public-website',
      'Content-Type': 'application/json',
    },
  };
  if (methodType === 'POST') {
    options.body = JSON.stringify(body);
  }
  await fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      //  eslint-disable-next-line no-console
      console.error('There was an error making the API call:', error);
    });
}

export async function getCartType() {
  const url = `https://${basicDetails().host}/ecommerce/rest/v1/market-info?country=${basicDetails().selectedCountry.toUpperCase()}`;
  const jsonRes = await getApiResponse(url, 'GET');
  const  marketType  = jsonRes.marketType;
  return marketType;
}

export async function deleteLineItem(lineItem) {
  const url = `https://${basicDetails().host}/ecommerce/rest/v1/basket/${basicDetails().shoppingBaskedId}/line/${lineItem}?country=${basicDetails().selectedCountry.toUpperCase()}`;
  return getApiResponse(url, 'DELETE');
}

export async function quickAddLineItems(lineItems) {
  const url = `https://${basicDetails().host}/ecommerce/rest/v1/basket/${basicDetails().shoppingBaskedId}?country=${basicDetails().lastSelectedCountry.toLocaleUpperCase()}`;
  const resp = getApiResponse(url, 'POST', lineItems);
  const resMap = {};
  const failuersCount = Number(resp.failures.failuresCount);
  const successCount = lineItems - failuersCount;
  if (failuersCount > 0) {
    resMap.failuresCount = `${failuersCount} item(s) has not been added`;
    resMap.failuresMessage = resp.failures.failedProductsByReason.NOT_FOUND;
  }
  if (successCount > 0) {
    resMap.successMessage = `${successCount} item(s) has been added to your basket.`;
  }
  return resMap;
}
export async function getCartItems() {
  const url = `https://${basicDetails().host}/ecommerce/rest/v1/basket/${basicDetails().shoppingBaskedId}?country=${basicDetails().selectedCountry.toUpperCase()}`;
  return getApiResponse(url, 'GET');
}
