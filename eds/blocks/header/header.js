import {
  a, div, li, p, span, ul,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import countriesAndCodes from '../../scripts/country-list.js';
import { applyClasses } from '../../scripts/scripts.js';

function megaMeunu() {
  return div({ class: 'w-[360px] z-40 hidden max-w-sm fixed h-full bg-black px-3 py-4 ease-out transition-all' });
}

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
      }, 'Create an account'),
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
      accountMenuList('orders', 'My Orders', `https://${hostName}/my-account/orders`),
      accountMenuList('addresses', 'My Addresses', `https://${hostName}/my-account/address-book`),
      accountMenuList('inquiries', 'My Inquiries', `https://${hostName}/my-account/inquiries`),
      accountMenuList('reviews', 'My Reviews', `https://${hostName}/my-account/reviews`),
      accountMenuList('rewards', 'My Rewards', `https://${hostName}/my-account/reward-points`),
      accountMenuList('profile', 'My Profile', `https://${hostName}/my-account/profile`),
      accountMenuList('sign-out', 'Sign Out', `https://${hostName}`),
    );
  } else {
    ulEl.append(
      buttonsEl('Sign In', `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}${pathName}`),
      accountMenuList('orders', 'My Orders', `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}%2Fmy-account%2Forders`),
      accountMenuList('addresses', 'My Addresses', `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}%2Fmy-account%2Faddress-book`),
      accountMenuList('inquiries', 'My Inquiries', `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}%2Fmy-account%2Finquiries`),
      accountMenuList('reviews', 'My Reviews', `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}%2Fmy-account%2Freviews`),
      accountMenuList('rewards', 'My Rewards', `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}%2Fmy-account%2Freward-points`),
      accountMenuList('profile', 'My Profile', `https://${hostName}/auth/login?redirect=https%3A%2F%2F${hostName}%2Fmy-account%2Fprofile`),
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

export default async function decorate(block) {
  const resp = await fetch('/eds/fragments/header.html');
  block.classList.add(...'relative bg-black flex justify-center flex-col pt-4 z-40'.split(' '));
  if (resp.ok) {
    const html = await resp.text();
    block.innerHTML = html;
  }
  block.append(megaMeunu());
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
  menuButtons.forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector('.main-mobile-menu').classList.toggle('hidden');
    });
  });

  // Search funtionality
  document.querySelectorAll('.search-bar-desktop').forEach((item) => {
    item.addEventListener('keydown', (event) => {
      // Check if the pressed key is Enter
      if (event.key === 'Enter') {
        event.preventDefault();
        const inputValue = event.target.value.trim();
        if (inputValue) {
          const searchResultsUrl = `https://www.abcam.com/en-us/search?keywords=${inputValue}`;
          window.location.href = searchResultsUrl;
        }
      }
    });
  });
  const dropdownLabel = document.querySelector('label[for="account-dropdown"]');
  decorateIcons(document.querySelector('.country-dd'), 16, 16);
  block.querySelector('.country-dropdown')?.classList.add('hover:bg-[#3B3B3B]');
  block.querySelector('.country-dropdown')?.addEventListener('click', (event) => {
    const countrySearch = document.querySelector('.country-search');
    if (event.target === event.currentTarget || event.target.alt === 'chevron-down-white' || event.target.parentElement.classList.contains('country-flag-icon')) {
      if (!dropdownLabel.contains(event.target) && dropdownLabel.previousElementSibling.checked) {
        dropdownLabel.click();
      }
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
  });

  // Cart icon
  const hostName = window.location.host;
  const shoppingBaskedId = localStorage.getItem('shoppingBasketId')?.replace(/"/g, '');
  const selectedCountry = (lastSelectedCountry !== null) ? lastSelectedCountry : 'US';
  const host = window.location.host === 'www.abcam.com' ? 'proxy-gateway.abcam.com' : 'proxy-gateway-preprod.abcam.com';
  const cartButton = document.querySelector('.cart-dropdown');

  if (shoppingBaskedId !== null && shoppingBaskedId) {
    const headers = {
      'x-abcam-app-id': 'b2c-public-website',
      'Content-Type': 'application/json',
    };

    const url = `https://${host}/ecommerce/rest/v1/basket/${shoppingBaskedId}?country=${selectedCountry.toUpperCase()}`;
    fetch(url, {
      method: 'GET',
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.items.length > 0) {
          document.querySelector('.cart-count')?.classList?.remove('hidden');
          document.querySelector('.cart-count').textContent = data.items.length;
        } else {
          document.querySelector('.cart-count')?.classList?.add('hidden');
        }
        cartButton.addEventListener('click', () => {
          window.location.href = `https://${hostName}/en-us/shopping-basket/${shoppingBaskedId}?country=${selectedCountry.toUpperCase()}`;
        });
      })
      .catch((error) => {
        //  eslint-disable-next-line no-console
        console.error('There was an error making the API call:', error);
      });
  } else {
    cartButton.addEventListener('click', () => {
      window.location.href = `https://${hostName}/en-us/shopping-basket?country=${selectedCountry.toUpperCase()}`;
    });
  }
}
