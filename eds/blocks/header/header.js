import {
  div, button, span, a, ul, li,
  label, p,
  hr,
  strong,
  h3,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import countriesAndCodes from '../../scripts/country-list.js';
import { applyClasses, debounce, highlightText } from '../../scripts/scripts.js';
import {
  basicDetails, deleteLineItem, getCartItems, getCartType, quickAddLineItems,
} from './header-utils.js';

const querySuggestPayload = {
  trackingId: 'abcam_us',
  query: 'anti',
  clientId: '211576eb-eeaa-4a1d-b6c8-4a51aa806772',
  context: {
    user: {
      href: 'https://vitejsvitelyd2v5-if1e--5173--c8c182a3.local-corp.webcontainer.io/search#q=wes',
      origin: 'https://vitejsvitelyd2v5-if1e--5173--c8c182a3.local-corp.webcontainer.io',
      protocol: 'https:',
      host: 'vitejsvitelyd2v5-if1e--5173--c8c182a3.local-corp.webcontainer.io',
      hostname: 'vitejsvitelyd2v5-if1e--5173--c8c182a3.local-corp.webcontainer.io',
      port: '',
      pathname: '/search',
      search: '',
      hash: '#q=wes',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0',
    },
    view: { url: 'https://lifesciences.danaher.com' },
    capture: true,
    cart: [],
    source: ['@coveo/headless@3.11.0'],
  },
  language: 'en',
  country: 'us',
  currency: 'USD',
};

const queryFacetPayload = {
  captions: {},
  numberOfValues: 10,
  query: '**',
  field: '',
  ignoreValues: [],
  filterFacetCount: true,
  type: 'specific',
  searchContext: {
    accessToken: 'xx27ea823a-e994-4d71-97f6-403174ec592a',
    organizationId: 'danahernonproduction1892f3fhz',
    url: 'https://danahernonproduction1892f3fhz.org.coveo.com/rest/search/v2',
    locale: 'en-US',
    debug: false,
    tab: 'default',
    referrer: '',
    timezone: 'America/New_York',
    pipeline: 'Abcam Product Listing',
    q: '',
    enableQuerySyntax: false,
    searchHub: 'AbcamProductListing',
    analytics: {
      clientId: '211576eb-eeaa-4a1d-b6c8-4a51aa806772',
      clientTimestamp: '2025-01-06T21:51:23.120Z',
      documentReferrer: '',
      documentLocation: 'https://vitejsvitelyd2v5-if1e--5173--c8c182a3.local-corp.webcontainer.io/search#q=wes',
      originContext: 'Search',
      capture: true,
      source: ['@coveo/headless@3.11.0'],
    },
  },
};

function megaMenu() {
  return div({ class: 'w-[360px] z-40 hidden max-w-sm fixed h-full bg-black px-3 py-4 ease-out transition-all' });
}

const placeholdersText = {
  createAnAccount: 'Create an account',
  myOrders: 'My Orders',
  myAddress: 'My Addresses',
  myInquires: 'My Inquiries',
  myReviews: 'My Reviews',
  myRewards: 'My Rewards',
  myProfile: 'My Profile',
  signOut: 'Sign Out',
  enterProductsCode: 'Enter product codes below and click "add products"',
  close: 'Close',
  addProducts: 'Add products',
  goToBasket: 'Go to basket',
  contactDistributor: 'Contact distributor',
  goToCheckout: 'Go to checkout',
  quickAdd: 'Quick add',
  inquiryBasket: 'Inquiry basket',
  goToInquiryBasket: 'Go to inquiry basket',
  shoppingBasketOneItem: 'Shopping basket (1 item)',
  startAddingProducts: 'Start adding products to your basket to contact your distributor',
  yourBasketIsEmpty: 'Your basket is empty',

};

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function setOrUpdateCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  } else document.cookie = `${name}=${value || ''}; path=/`;
}

function rotateDropdownIcon(event) {
  const input = document.getElementById('country-search-input');

  const countrydd = document.querySelector('.country-dd');
  const ddImg = countrydd?.querySelector('img');
  if (event !== undefined && countrydd?.classList.contains('rotate') && ddImg) {
    ddImg.style.transform = 'rotate(180deg)';
    countrydd.classList.remove('rotate');
  } else if (event === undefined || event.target !== input) {
    ddImg.style.transform = 'rotate(0deg)';
    countrydd.classList.add('rotate');
  }
}

function updateCountryButton(code) {
  const flagElement = document.querySelector('.country-flag-container');
  const spanElement = span({ class: `country-flag-icon object-cover border-[0.5px] icon icon-${code.toLowerCase()}` });
  flagElement.replaceChildren(spanElement);
  decorateIcons(flagElement, 24, 24, 'flags');
  rotateDropdownIcon();
  document.querySelector('.country-search')?.classList.add('hidden');
  document.getElementById('country-search-input').value = '';
  setOrUpdateCookie('NEXT_COUNTRY', code.toUpperCase());
  // eslint-disable-next-line no-use-before-define
  decorateCartPopUp();
}

async function displayResults(query, resultsContainer) {
  resultsContainer.replaceChildren();
  const filteredCountries = (await countriesAndCodes())
    .filter(({ country }) => country.toLowerCase().includes(query));
  if (query.trim() === '') {
    resultsContainer.replaceChildren();
    return;
  }
  filteredCountries.forEach(({ code, country }) => {
    const resultItem = div(
      { class: 'result-item flex flex-row gap-x-2 p-4 text-black hover:bg-[#f2f2f2]' },
      span({ class: `result-flag-container icon icon-${code.toLowerCase()}` }),
      div({ class: 'result-country' }, country),
    );
    resultItem.querySelector('.result-flag-container').title = country;
    resultItem.addEventListener('click', (e) => {
      if (code === 'CN') {
        window.location.href = 'https://www.abcam.cn/';
        return;
      }
      if (code === 'JP') {
        window.location.href = 'https://www.abcam.co.jp/';
        return;
      }
      e.stopPropagation();
      updateCountryButton(code);
      resultsContainer.replaceChildren();
    });
    decorateIcons(resultItem, 24, 24, 'flags');
    resultsContainer.appendChild(resultItem);
  });
}

function updateActiveItem(items, currentIndex) {
  items.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add('bg-gray-200');
      item.focus();
    } else {
      item.classList.remove('bg-gray-200');
    }
  });
}

// country Selector
function countrySelector() {
  const input = document.getElementById('country-search-input');
  const resultsContainer = document.getElementById('country-results');
  input.focus();
  resultsContainer.classList.remove('hidden');
  input.addEventListener('input', (e) => {
    const query = input.value.toLowerCase();
    e.stopImmediatePropagation();
    displayResults(query, resultsContainer);
  });

  let currentIndex = -1;
  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      const items = resultsContainer.querySelectorAll('.result-item');
      event.preventDefault();
      currentIndex = (currentIndex + 1) % items.length;
      updateActiveItem(items, currentIndex);
    } else if (event.key === 'ArrowUp') {
      const items = resultsContainer.querySelectorAll('.result-item');
      event.preventDefault();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateActiveItem(items, currentIndex);
    } else if (event.key === 'Enter') {
      const items = resultsContainer.querySelectorAll('.result-item');
      if (currentIndex >= 0 && currentIndex < items.length) {
        const selectedItem = items[currentIndex];
        if (selectedItem.querySelector('img').alt === 'CN') {
          window.location.href = 'https://www.abcam.cn/';
          return;
        }
        if (selectedItem.querySelector('img').alt === 'JP') {
          window.location.href = 'https://www.abcam.co.jp/';
          return;
        }
        updateCountryButton(selectedItem.querySelector('img').alt);
        resultsContainer.replaceChildren();
        currentIndex = -1;
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (!resultsContainer.contains(e.target) && e.target !== input) {
      resultsContainer?.classList.add('hidden');
      document.querySelector('.country-search')?.classList.add('hidden');
      rotateDropdownIcon();
    }
    e.stopPropagation();
  });
}

function clearSession() {
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key.includes('CognitoIdentityServiceProvider')) {
      localStorage.removeItem(key);
    }
  });
  return `${window.location.origin}`;
}

function getLocalStorageToken() {
  let tokenId;
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key.includes('.idToken')) {
      tokenId = localStorage[key];
    }
  });
  if (tokenId) {
    return JSON.stringify(tokenId);
  }
  return null;
}

function parsePayload(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error parsing token :', e);
    return null;
  }
}

function accountMenuList(iconName, linkText, linkUrl) {
  const divEl = li({ class: 'group flex flex-row items-center gap-x-3 px-4 py-2 hover:bg-[#0711120d] cursor-pointer text-sm font-semibold leading-5 text-black' });
  if (iconName) {
    divEl.append(
      span({ class: `icon icon-${iconName} group-hover:hidden ${iconName.includes('sign-out') ? '-rotate-90' : ''}` }),
      span({ class: `icon icon-${iconName}-solid hidden group-hover:block ${iconName.includes('sign-out') ? '-rotate-90' : ''}` }),
    );
    decorateIcons(divEl, 24, 24);
  }
  const anchorEl = iconName === 'sign-out'
    ? a({
      class: 'text-sm font-semibold leading-5 text-black p-2 pl-2',
      href: linkUrl,
      onClick: clearSession,
    }, linkText)
    : a({
      class: 'text-sm font-semibold leading-5 text-black p-2 pl-2',
      href: linkUrl,
    }, linkText);

  divEl.append(
    anchorEl,
  );
  return divEl;
}

function buttonsEl(linkText, linkUrl, session) {
  const hostName = window.location.host;
  let btnColor;
  let myAccLink;
  let createAccLink;
  const liEl = li({ class: 'mb-3 md:mb-0 px-4 pt-3 pb-3' });
  if (session) {
    applyClasses(liEl, 'border-b border-b-[#D8D8D8] space-y-2');
    applyClasses(liEl, 'flex flex-row-reverse justify-between items-center');
    btnColor = 'text-white bg-[#378189] hover:bg-[#2a5f65] basis-2/5 shrink-0';
  } else if (linkText === 'Sign In') {
    applyClasses(liEl, 'border-b border-b-[#D8D8D8] space-y-2');
    btnColor = 'text-white bg-[#378189] hover:bg-[#2a5f65]';
  } else {
    btnColor = 'border border-black text-black hover:bg-[#0711120d]';
  }
  const anchEl = a({
    class: `flex justify-center py-2 focus:outline-none rounded-full text-xs font-semibold ${btnColor}`,
    href: linkUrl,
  }, linkText);
  liEl.append(anchEl);
  if (!hostName.includes('localhost') && !hostName.includes('.hlx')) {
    myAccLink = `https://${hostName}/my-account`;
    createAccLink = `https://${hostName}/auth/register?redirect=https%3A%2F%2F${hostName}%2Fen-us`;
  } else {
    myAccLink = 'https://pp.abcam.com/my-account';
    createAccLink = 'https://pp.abcam.com/auth/register?redirect=https%3A%2F%2Fpp.abcam.com';
  }
  if (session) {
    liEl.append(a(
      {
        class: 'flex flex-col gap-y-1.5 text-black text-xs font-normal tracking-wide truncate',
        title: `${session.given_name} ${session.family_name}`,
        href: myAccLink,
      },
      span({ class: 'font-semibold' }, `${session.given_name} ${session.family_name}`),
      p({
        class: 'w-5/6 underline-offset-2 text-gray-400 text-[10px] font-semibold text-clip sm:truncate',
        title: `${session.email}`,
      }, `${session.email}`),
    ));
  } else if (linkText === 'Sign In') {
    liEl.append(p(
      { class: 'w-full flex items-center text-black text-xs font-normal tracking-wide' },
      'New to Abcam?',
      a({
        class: 'hover:underline leading-5 text-[#378189] ml-2 md:ml-auto',
        href: createAccLink,
      }, placeholdersText.createAnAccount),
    ));
  }
  return liEl;
}

function ulEls(hostName, sessionVal) {
  const ulEl = ul({ class: 'flex flex-col w-full lg:w-[17rem]' });
  const pathName = window.location.pathname;
  if (sessionVal) {
    ulEl.append(
      buttonsEl('Contact Us', `https://${hostName}/en-us/contact-us`, sessionVal),
      accountMenuList('orders', placeholdersText.myOrders, `https://${hostName}/my-account/orders`),
      accountMenuList('addresses', placeholdersText.myAddress, `https://${hostName}/my-account/address-book`),
      accountMenuList('inquiries', placeholdersText.myInquires, `https://${hostName}/my-account/inquiries`),
      accountMenuList('reviews', placeholdersText.myReviews, `https://${hostName}/my-account/reviews`),
      accountMenuList('rewards', placeholdersText.myRewards, `https://${hostName}/my-account/reward-points`),
      accountMenuList('profile', placeholdersText.myProfile, `https://${hostName}/my-account/profile`),
      accountMenuList('sign-out', placeholdersText.signOut, `https://${hostName}`),
    );
  } else {
    ulEl.append(
      buttonsEl('Sign In', `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}${pathName}`),
      accountMenuList('orders', placeholdersText.myOrders, `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}%2Fmy-account%2Forders`),
      accountMenuList('addresses', placeholdersText.myAddress, `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}%2Fmy-account%2Faddress-book`),
      accountMenuList('inquiries', placeholdersText.myInquires, `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}%2Fmy-account%2Finquiries`),
      accountMenuList('reviews', placeholdersText.myReviews, `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}%2Fmy-account%2Freviews`),
      accountMenuList('rewards', placeholdersText.myRewards, `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}%2Fmy-account%2Freward-points`),
      accountMenuList('profile', placeholdersText.myProfile, `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}%2Fmy-account%2Fprofile`),
      buttonsEl('Contact Us', `https://${hostName}/en-us/contact-us`),
    );
  }
  return ulEl;
}

function myAccount(session) {
  const hostName = (!window.location.host.includes('localhost') && !window.location.host.includes('.hlx'))
    ? window.location.host
    : 'pp.abcam.com';
  const myAccoundDiv = div({ class: 'my-account-items w-full fixed lg:relative left-0 overflow-hidden bg-white lg:h-full text-black rounded sm:rounded-lg shadow-lg' });
  if (session) {
    const sessionVal = parsePayload(session);
    if (sessionVal) {
      document.querySelectorAll('.account-dropdown').forEach((item) => {
        if (item.querySelector('.user-icon')?.classList.contains('icon-user')) {
          item.querySelector('.user-icon')?.classList.replace('icon-user', 'icon-user-solid');
          item.querySelector('.user-icon')?.firstElementChild?.remove();
          item.querySelector('.user-icon-dd')?.firstElementChild?.remove();
          decorateIcons(item, 16, 16);
        }
      });
      document.querySelectorAll('.account-dropdown > span').forEach((item) => {
        if (item?.textContent === 'My account') {
          item.textContent = sessionVal.given_name;
        }
      });
      myAccoundDiv.append(ulEls(hostName, sessionVal));
    }
  } else {
    myAccoundDiv.append(ulEls(hostName));
  }
  return myAccoundDiv;
}

function formartCurrency(userLocale, userCurrency, value) {
  const withCurrency = new Intl.NumberFormat(userLocale, {
    style: 'currency',
    currency: userCurrency,
  }).formatToParts(value)
    .map((part) => (part.type === 'currency' ? `${part.value} ` : part.value))
    .join('');
  return withCurrency;
}
async function openQuickAddModal() {
  const modalContainer = div({
    class: 'modal-container hidden fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-full opacity-100 bg-black bg-opacity-50 z-[300] transition-opacity duration-[5000ms] ease-out delay-1000',
  });
  const productSearchArea = document.createElement('textarea');
  applyClasses(productSearchArea, 'product-search-area w-full py-3 pl-5 align-middle my-1 text-xs border border-gray-300 rounded mb-4 bg-[#F2F3F3] hover:bg-[#E6E7E7] focus:ring-[#6fafb8] focus:ring-[3px] focus:outline-none');
  productSearchArea.placeholder = 'e.g. "ab12345, ab23432"';
  productSearchArea.rows = 5;
  const modalContent = div(
    {
      class: 'max-[476px]:h-full h-max w-[560px] rounded bottom-0 relative flex flex-col bg-white',
      style: 'transition: bottom 1000ms linear; transition-timing-function: cubic-bezier(.4,0,0,1);',
    },
    div(
      { class: 'flex flex-row justify-between pl-6 pr-5 pt-5' },
      h3({ class: 'self-center text-2xl font-semibold' }, placeholdersText.quickAdd),
      button(
        {
          class: 'rounded-2xl p-1',
          onclick() { document.querySelector('.modal-container')?.classList.add('hidden'); },
        },
        span({ class: 'icon icon-cross-black' }),
      ),
    ),
    div(
      { class: 'px-6 pt-1 flex flex-col grow' },
      div(
        { class: 'relative z-10 mt-4' },
        div(
          { class: 'w-full flex flex-col text-base tracking-[.03125rem]' },
          div(
            { class: 'flex flex-col text-xs' },
            div(
              { class: 'inline-flex items-center pb-1' },
              label({ class: 'font-semibold' }, placeholdersText.enterProductsCode),
            ),
            p(
              { class: 'text-[#65797C] my-0' },
              'You can ',
              strong('copy & paste '),
              'or',
              strong(' type in'),
              ' as many product codes as you like. Do not forget to put ',
              strong('space, comma or semi-colon in between'),
              '.',
            ),
          ),
        ),
        div({ class: 'relative' }, productSearchArea),
      ),
      div(
        { class: 'quick-add-success bg-[#E8FCF4] flex items-center justify-between rounded-[8px] mt-2 py-4 px-6 text-sm' },
        span({ class: 'success-tick icon icon-check-green mr-4' }),
        div({ class: 'success-message flex-grow text-[#0B5B3A]' }),
        button(
          {
            class: 'success-close',
            onclick() { document.querySelector('.quick-add-success')?.classList.add('hidden'); },
          },
          span({ class: 'icon icon-cross-green' }),
        ),
      ),
      div(
        { class: 'quick-add-failed bg-[#FAEAEB] flex items-center justify-between rounded-[8px] mt-2 py-4 px-6 mb-4 text-sm' },
        span({ class: 'warning-alert icon icon-alert-red mr-4' }),
        div(
          { class: 'failure-count flex-grow text-[#B22626]' },
          li({ class: 'failure-product text-[#B22626]' }),
        ),
        button(
          {
            class: 'fail-close',
            onclick() { document.querySelector('.quick-add-failed')?.classList.add('hidden'); },
          },
          span({ class: 'icon icon-cross-red' }),
        ),
      ),
      div(
        { class: 'flex justify-end text-right mb-4' },
        button(
          {
            class: 'close-modal rounded-3xl self-center mr-2 text-sm tracking-[.0125rem] px-5 py-2.5 h-10',
            onclick() { document.querySelector('.modal-container')?.classList.add('hidden'); },
          },
          span({
            class: 'font-semibold px-1.5',
            onclick() { productSearchArea.value = ''; },
          }, placeholdersText.close),
        ),
        button(
          { class: 'modal-add-products rounded-3xl self-center bg-[#378189] text-sm text-white px-5 py-2.5 opacity-30 cursor-not-allowed' },
          span({ class: 'font-semibold px-1.5' }, placeholdersText.addProducts),
        ),
      ),
    ),
  );

  decorateIcons(modalContent, 20, 20);
  modalContainer.append(modalContent);
  modalContent.querySelector('.product-search-area').addEventListener('input', () => {
    const modalAddProduct = modalContent.querySelector('.modal-add-products');
    if (productSearchArea.value.trim() === '') {
      applyClasses(modalAddProduct, 'opacity-30 cursor-not-allowed');
      modalAddProduct.classList.remove('hover:bg-[#2a5f65]');
    } else {
      modalAddProduct.classList.remove('opacity-30', 'cursor-not-allowed');
      modalAddProduct.classList.add('hover:bg-[#2a5f65]');
    }
    modalAddProduct.addEventListener('click', async (event) => {
      document.querySelector('.quick-add-failed')?.classList.add('hidden');
      document.querySelector('.quick-add-success')?.classList.add('hidden');
      const resultArray = productSearchArea.value.replace(/\n/g, ' ').split(/[ ,;]+/).map((id) => ({
        assetId: id.trim(),
        quantity: 1,
      }));
      const resMap = await quickAddLineItems(resultArray);
      if ('failuresCount' in resMap) {
        document.querySelector('.failure-count').innerHTML = resMap.failuresCount;
        document.querySelector('.failure-product').innerHTML = resMap.failuresMessage;
        document.querySelector('.quick-add-failed').classList.remove('hidden');
      }
      if ('successMessage' in resMap) {
        document.querySelector('.success-message').innerHTML = resMap.successMessage;
        document.querySelector('.quick-add-success').classList.remove('hidden');
      }
      event.stopImmediatePropagation();
    });
  });
  document.querySelector('header').append(modalContainer);
}

async function deleteCartItem(event) {
  const cartItem = event.target.parentElement.id;
  if (cartItem) {
    const res = await deleteLineItem(cartItem);
    if (res.items.length > 0) {
      // eslint-disable-next-line no-use-before-define
      decorateCartPopUp();
    }
  }
}

async function decorateCartItems(cartMainContainer, cartType, cartItemRes) {
  const userLocale = basicDetails().selectedCountry;

  if (cartItemRes.items.length > 0) {
    const cartCount = document.querySelector('.cart-count');
    cartCount?.classList.remove('hidden');
    cartCount.innerText = cartItemRes.items.length;
    const cartTitleElement = cartMainContainer.querySelector('.cart-title');

    if (cartTitleElement) {
      cartTitleElement.textContent = cartType === 'Distributor'
        ? placeholdersText.inquiryBasket
        : `Shopping basket (${cartItemRes.items.length} items)`;
    }
  } else {
    document.querySelector('.cart-count')?.classList?.add('hidden');
  }

  const cartItemsContainer = cartMainContainer.querySelector('.cart-items-container');
  cartItemRes.items.forEach((item) => {
    let withCurrency;
    if (item.prices) {
      withCurrency = formartCurrency(
        userLocale,
        item.prices.subtotal.currency,
        item.prices.subtotal.value,
      );
    }
    const itemContainer = div(
      { class: 'item-quantity my-5 font-normal cursor-default ' },
      div({ class: 'font-semibold lowercase text-xs text-[#65797C] tracking-[.03125rem]' }, `${item.assetDefinitionNumber}`),
      div(
        { class: 'flex text-sm tracking-[.03125rem]' },
        span({ class: 'w-2/3 py-[2px]' }, `${item.lineDescription}`),
        span(
          { class: 'ml-auto' },
          div({ class: 'font-semibold text-sm' }, item.prices ? withCurrency : ''),
        ),
      ),
      div(
        { class: 'flex text-xs' },
        span(
          { class: 'mr-3' },
          span({ class: 'mr-1 font-semibold' }, 'Size:'),
          span({ class: '' }, `${item.size.value} ${item.size.unit}`),
        ),
        span({ class: 'mr-1 font-semibold' }, 'Qty:'),
        span({ class: 'item-quantity' }, item.quantity),
        span({ class: 'delete-item ml-auto cursor-pointer icon icon-bin', id: `${item.lineNumber}` }),
      ),
    );
    itemContainer.querySelector('.delete-item').addEventListener('click', (event) => {
      deleteCartItem(event);
    });
    if (item.availableQuantity || item.availableQuantity === 0) {
      const inStock = Number(item.availableQuantity);
      const inStockContainer = div({ class: 'mt-3 text-xs font-semibold' }, inStock > 10 ? `${10}+ in stock` : 'Available to order');
      if (inStock > 10) inStockContainer.classList.add('text-[#0F8554]');
      itemContainer.append(inStockContainer);
    }
    // decorateIcons(itemContainer, 20, 20);
    cartItemsContainer.append(itemContainer);
  });
  if (cartItemRes.summary.subtotal.value) {
    const subTotalCurrency = formartCurrency(
      userLocale,
      cartItemRes.summary.subtotal.currency,
      cartItemRes.summary.subtotal.value,
    );
    const subtotal = div(
      { class: 'w-full cursor-default' },
      div(
        { class: 'flex text-base' },
        span(`Subtotal (${cartItemRes.items.length} items)`),
        span({ class: 'ml-auto' }, `${subTotalCurrency}`),
      ),
      div({ class: 'font-normal text-xs text-[#65797C]' }, 'Excludes shipping and tax'),
    );
    const subtotalContainer = cartMainContainer.querySelector('.sub-total-container');
    subtotalContainer.insertBefore(subtotal, subtotalContainer.firstChild);
  }
}

async function decorateCartPopUp() {
  const cartPopup = document.querySelector('.cart-popup-main-container');
  if (cartPopup) {
    cartPopup.parentNode.removeChild(cartPopup);
  }
  let cartMainContainer;
  const cartType = await getCartType();
  const cartItemsRes = await getCartItems();
  if (cartItemsRes.items.length > 0) {
    cartMainContainer = div(
      { class: 'cart-popup-main-container max-[376px]:-left-36 absolute hidden peer-checked:block top-full z-50 right-0 mt-1.5 max-[320px]:w-[285px] w-[320px] md:w-[368px]' },
      div(
        { class: 'shadow-2xl p-4 font-semibold bg-white rounded-xl text-black' },
        div({ class: 'cart-title mb-4 text-xl' }, cartType === 'Distributor' ? placeholdersText.inquiryBasket : placeholdersText.shoppingBasketOneItem),
        hr({ class: 'mt-4 -mx-4' }),
        div({ class: 'cart-items-container overflow-y-auto max-h-[376px]' }),
        hr({ class: 'mt-4 -mx-4' }),
        div(
          { class: 'sub-total-container flex flex-wrap mt-1' },
          button(
            { class: 'go-to-basket rounded-3xl mt-3 w-full text-sm tracking-[.0125rem] px-5 py-2.5' },
            span({ class: 'font-semibold' }, placeholdersText.goToBasket),
          ),
          button(
            { class: 'contact-distributor mt-2 w-full text-sm racking-[.0125rem] px-5 py-2.5 focus:outline-none rounded-full font-semibold text-white bg-[#378189] hover:bg-[#2a5f65]' },
            span({ class: 'font-semibold text-white' }, cartType === 'Distributor' ? placeholdersText.contactDistributor : placeholdersText.goToCheckout),
          ),
        ),
        hr({ class: 'my-4 -mx-4' }),
        div(
          { class: 'flex flex-wrap' },
          button(
            {
              class: 'quick-add mt-2 w-full text-sm tracking-[.0125rem] px-5 py-2.5 flex justify-center gap-x-2 focus:outline-none rounded-full font-semibold bg-[#F2F3F3] hover:bg-[#E6E7E7]',
              onclick() { document.querySelector('.modal-container')?.classList.remove('hidden'); },
            },
            span({ class: 'icon icon-plus' }),
            span({ class: 'font-semibold text-black' }, placeholdersText.quickAdd),
          ),
        ),
      ),
    );
    cartMainContainer.querySelector('.go-to-basket')?.addEventListener('click', () => {
      window.location.href = `https://${basicDetails().host}/en-us/shopping-basket/${basicDetails().shoppingBaskedId}?country=${basicDetails().selectedCountry.toUpperCase()}`;
    });
    cartMainContainer.querySelector('.contact-distributor')?.addEventListener('click', () => {
      window.location.href = `https://${basicDetails().host}/en-us/inquiry/${basicDetails().shoppingBaskedId}`;
    });
    decorateCartItems(cartMainContainer, cartType, cartItemsRes);
  } else {
    cartMainContainer = div(
      { class: 'cart-popup-main-container absolute hidden cursor-default peer-checked:block top-full z-50 right-0 mt-1.5 w-[368px]' },
      div(
        { class: 'middle-container shadow-2xl p-4 font-semibold bg-white rounded-xl text-black' },
        div({ class: 'mb-4 text-xl' }, cartType === 'Distributor' ? placeholdersText.inquiryBasket : placeholdersText.shoppingBasketOneItem),
        hr({ class: 'mt-4 -mx-4' }),
        div(
          { class: 'font-normal' },
          div(
            { class: 'flex' },
            span({ class: 'mx-auto my-7 icon icon-empty-cart-basket' }),
          ),
          div({ class: 'text-center whitespace-pre-line text-xs text-[#65797C] tracking-[.03125rem]' }, cartType === 'Distributor' ? placeholdersText.startAddingProducts : placeholdersText.yourBasketIsEmpty),
          hr({ class: 'mt-4 -mx-4' }),
          button(
            { class: 'inquiry-basket rounded-3xl mt-3 w-full text-sm tracking-[.0125rem] px-5 py-2.5' },
            span({ class: 'font-semibold' }, cartType === 'Distributor' ? placeholdersText.goToInquiryBasket : placeholdersText.goToBasket),
          ),
          button(
            {
              class: 'quick-add mt-2 w-full text-sm racking-[.0125rem] px-5 py-2.5 flex justify-center gap-x-2 focus:outline-none rounded-full font-semibold text-white bg-[#378189] hover:bg-[#2a5f65]',
              onclick() { document.querySelector('.modal-container')?.classList.remove('hidden'); },
            },
            span({ class: 'plus-icon icon icon-white-plus' }),
            span({ class: 'font-semibold text-white' }, placeholdersText.quickAdd),
          ),
        ),
      ),
    );
    if (document.querySelector('.user-account')?.textContent === 'My account' && cartType === 'Distributor') {
      const signContainer = div(
        { class: 'text-center font-normal text-sm text-black tracking-[0.025rem] px-12 mt-5' },
        div(
          'Are you an Abcam distributor?   ',
          a({ class: 'underline cursor-pointer text-[#378189]', href: 'https://www.abcam.com/auth/login?redirect=https://www.abcam.com/en-us' }, 'Sign in'),
          ' to complete your purchase',
        ),
      );
      cartMainContainer.querySelector('.middle-container').append(signContainer);
    }
  }
  decorateIcons(cartMainContainer, 20, 20);
  cartMainContainer.querySelector('.inquiry-basket')?.addEventListener('click', () => {
    window.location.href = `https://${basicDetails().host}/en-us/shopping-basket/?country=${basicDetails().selectedCountry.toUpperCase()}`;
  });
  document.querySelector('.cart-dropdown')?.append(cartMainContainer);
}

async function fetchResponse({
  url = 'https://danahernonproduction1892f3fhz.org.coveo.com/rest/organizations/danahernonproduction1892f3fhz/commerce/v2/search/querySuggest',
  method = 'POST',
  payload = {},
}) {
  try {
    const request = await fetch(url, {
      method,
      body: JSON.stringify(payload),
      headers: {
        Authorization: 'Bearer xx27ea823a-e994-4d71-97f6-403174ec592a',
        'content-type': 'application/json',
      },
    });
    const response = await request.json();
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return error;
  }
}

async function handleQuerySuggestions(searchTerm) {
  querySuggestPayload.query = searchTerm;
  const response = await fetchResponse({ payload: querySuggestPayload });
  const suggestionsElement = document.querySelector('ul#search-suggestions');
  suggestionsElement.innerHTML = '';
  const { completions } = response;
  if (completions && completions.length > 0) {
    completions.forEach((suggestion) => {
      const suggestionItem = a(
        { href: `${window.location.origin}/en-us/page-test/search-results?q=${suggestion.expression}` },
        suggestion.expression,
      );
      const newSuggestionItem = highlightText(suggestionItem, searchTerm, 'font-semibold text-amber-400/80');
      suggestionsElement.appendChild(li(
        { class: 'suggestion-item cursor-pointer py-1 px-4 hover:bg-[#0711120D]' },
        newSuggestionItem,
      ));
    });
  }
}

async function handleCategoryFacetSuggestions(searchTerm) {
  queryFacetPayload.field = 'adcategorytype';
  queryFacetPayload.searchContext.q = searchTerm;
  const response = await fetchResponse({
    url: 'https://danahernonproduction1892f3fhz.org.coveo.com/rest/search/v2/facet',
    payload: queryFacetPayload,
  });
  const categoryEl = document.querySelector('ul#categories-suggestions');
  categoryEl.innerHTML = '';
  const { values } = response;
  if (values && values.length > 0) {
    values.forEach((suggestion) => {
      const suggestionItem = li(
        { class: 'suggestion-item cursor-pointer py-1 px-4 hover:bg-[#0711120D]' },
        a(
          { href: `${window.location.origin}/en-us/page-test/search-results?category-facet=${suggestion.rawValue}` },
          `${suggestion.rawValue} (${suggestion.count})`,
        ),
      );
      categoryEl.appendChild(suggestionItem);
    });
  }
}

async function handleResourcesFacetSuggestions(searchTerm) {
  queryFacetPayload.field = 'pagetype';
  queryFacetPayload.searchContext.q = searchTerm;
  const response = await fetchResponse({
    url: 'https://danahernonproduction1892f3fhz.org.coveo.com/rest/search/v2/facet',
    payload: queryFacetPayload,
  });
  const resourcesEl = document.querySelector('ul#resources-suggestions');
  resourcesEl.innerHTML = '';
  const { values } = response;
  if (values && values.length > 0) {
    values.forEach((suggestion) => {
      const suggestionItem = li(
        { class: 'suggestion-item cursor-pointer py-1 px-4 hover:bg-[#0711120D]' },
        a(
          { href: `${window.location.origin}/en-us/page-test/search-results?resources-facet=${suggestion.rawValue}` },
          `${suggestion.rawValue} (${suggestion.count})`,
        ),
      );
      resourcesEl.appendChild(suggestionItem);
    });
  }
}

function handleSearchBox() {
  document.querySelectorAll('.search-bar-desktop').forEach((item) => {
    item.addEventListener(
      'keyup',
      debounce((event) => {
        const { value } = event.target;
        const searchTerm = value.trim();
        handleQuerySuggestions(searchTerm);
        handleCategoryFacetSuggestions(searchTerm);
        handleResourcesFacetSuggestions(searchTerm);
      }, 600),
    );
    item.addEventListener(
      'blur',
      () => {
        // document.querySelector('ul#search-suggestions').innerHTML = '';
        // document.querySelector('ul#categories-suggestions').innerHTML = '';
        // document.querySelector('ul#resources-suggestions').innerHTML = '';
      },
    );
  });
}

export default async function decorate(block) {
  const resp = await fetch('/eds/fragments/header.html');
  block.classList.add(...'relative bg-black flex justify-center flex-col pt-4 z-40'.split(' '));
  if (resp.ok) {
    const html = await resp.text();
    block.innerHTML = html;
  }
  block.append(megaMenu());
  decorateIcons(block.querySelector('.abcam-logo'));
  decorateIcons(block.querySelector('.logo-home-link'), 120, 25);
  decorateIcons(block.querySelector('.close-hamburger-menu'));
  block.querySelectorAll('.down-arrow').forEach((divEle) => {
    decorateIcons(divEle);
    divEle.addEventListener('click', () => {
      if (divEle.querySelector('.sub-menu').classList.contains('hidden')) {
        divEle.querySelector('.sub-menu')?.classList.remove('hidden');
        const imgElement = divEle.querySelector('img');
        if (imgElement) {
          imgElement.style.transform = 'rotate(180deg)';
        }
      } else {
        divEle.querySelector('.sub-menu')?.classList.add('hidden');
        const imgElement = divEle.querySelector('img');
        if (imgElement) {
          imgElement.style.transform = 'rotate(0deg)';
        }
      }
    });
  });

  document.querySelectorAll('.mega-menu')?.forEach((item) => {
    const megaMenuItem = item.querySelector('.mega-menu-item');
    const menuItemPostionTop = document.querySelector('.header-wrapper').offsetHeight;
    megaMenuItem.parentElement.style.top = `${menuItemPostionTop - 35}px`;

    item.addEventListener('mouseover', () => {
      megaMenuItem.classList.remove('hidden');
    });
    item.addEventListener('mouseout', (e) => {
      if (!megaMenuItem.contains(e.relatedTarget)) {
        megaMenuItem.classList.add('hidden');
      }
    });
  });

  // Show hide hamburger menu in mobile
  const menuButtons = document.querySelectorAll('.hamburger-menu, .close-hamburger-menu');
  menuButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector('.main-mobile-menu').classList.toggle('hidden');
    });
  });

  const dropdownLabel = document.querySelector('label[for="account-dropdown"]');
  const cartButton = document.querySelector('.cart-dropdown');
  const isCartOpen = document.getElementById('cart-toggle');
  decorateIcons(document.querySelector('.country-dd'), 16, 16);
  block.querySelector('.country-dropdown')?.addEventListener('click', (event) => {
    const countrySearch = document.querySelector('.country-search');
    if (event.target === event.currentTarget || event.target.alt === 'chevron-down-white' || event.target.parentElement.classList.contains('country-flag-icon')) {
      if (!dropdownLabel.contains(event.target) && dropdownLabel.previousElementSibling.checked) {
        dropdownLabel.click();
      }
      if (!cartButton.contains(event.target) && isCartOpen.checked) isCartOpen.click();
      countrySearch?.classList.toggle('hidden');
      const searchValue = block.querySelector('#country-search-input');
      if (searchValue) searchValue.value = '';
      block.querySelector('#country-results')?.replaceChildren();
    }
    event.stopPropagation();
    rotateDropdownIcon(event);
    countrySelector(block);
  });
  setOrUpdateCookie('NEXT_LOCALE', 'en-us', 365);
  const flagElement = block.querySelector('.country-flag-container');
  const lastSelectedCountry = getCookie('NEXT_COUNTRY');
  if (flagElement && lastSelectedCountry !== null) {
    const spanElement = span({ class: `country-flag-icon object-cover border-[0.5px] icon icon-${lastSelectedCountry.toLowerCase()}` });
    flagElement.replaceChildren(spanElement);
  }
  decorateIcons(flagElement, 24, 24, 'flags');
  const dropdownContainer = document.querySelector('.account-dropdown-container');
  decorateIcons(dropdownContainer, 16, 16);
  document.querySelector('.account-dropdown').classList.add('hover:bg-[#3B3B3B]');
  const accountEl = document.getElementById('my-account');
  const session = getLocalStorageToken();
  accountEl.append(myAccount(session));
  document.addEventListener('click', (event) => {
    const isChecked = document.getElementById('account-dropdown');
    if (isChecked.checked) {
      if (!dropdownLabel.contains(event.target) && dropdownLabel.previousElementSibling.checked) {
        dropdownLabel.querySelector('.user-icon-dd').style.transform = 'rotate(180deg)';
        dropdownLabel.click();
      }
    } else {
      dropdownLabel.querySelector('.user-icon-dd').style.transform = 'rotate(0deg)';
    }
    if (!cartButton.contains(event.target) && isCartOpen.checked) isCartOpen.click();
  });
  decorateCartPopUp();
  openQuickAddModal();
  cartButton?.addEventListener('click', () => {
    document.querySelector('#cart-toggle')?.click();
  });
  // COVEO-API WORK
  handleSearchBox();
}
