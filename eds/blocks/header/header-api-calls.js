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
function getApiResponse(url, methodType, body) {
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
  fetch(url, options)
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

export function getCartType() {
  const url = `https://${basicDetails().host}/ecommerce/rest/v1/market-info?country=${basicDetails().selectedCountry.toUpperCase()}`;
  const jsonRes = JSON.parse(getApiResponse(url,'GET'));
  const { marketType } = jsonRes;
  return marketType;
}

export function deleteLineItem(lineItem) {
  const url = `https://${host}/ecommerce/rest/v1/basket/${basicDetails().shoppingBaskedId}/line/${lineItem}?country=${basicDetails().selectedCountry.toUpperCase()}`;
  return deleteItemRes = JSON.parse(getApiResponse(url, 'DELETE'));
}

export function quickAddLineItems(lineItems) {
  const url = `https://proxy-gateway.abcam.com/ecommerce/rest/v1/basket/${basicDetails().shoppingBaskedId}?country=${basicDetails().lastSelectedCountry}`;
  return JSON.parse(getApiResponse(url, 'POST', lineItems))
}
export function getCartItems() {
  const url = `https://${host}/ecommerce/rest/v1/basket/${shoppingBaskedId}?country=${selectedCountry.toUpperCase()}`;
  return cartItemsRes = JSON.parse(getApiResponse(url, 'GET'));
}