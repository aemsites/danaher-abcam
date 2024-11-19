import {
  a, div, li, p, span, ul,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import countriesAndCodes from '../../scripts/country-list.js';

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
        updateCountryButton(selectedItem.querySelector('img').src || '', (selectedItem.querySelector('img').alt) || '');
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

function accountMenuList(iconName, linkText, linkUrl) {
  const divEl = li({ class: 'group flex flex-row items-center gap-x-3 px-4 py-2 hover:bg-[#0711120d] cursor-pointer text-sm font-semibold leading-5 text-black' });
  divEl.append(
    span({ class: `icon icon-${iconName} group-hover:hidden` }),
    span({ class: `icon icon-${iconName}-solid hidden group-hover:block` }),
    a({
      class: 'text-sm font-semibold leading-5 text-black p-2 pl-2',
      href: linkUrl,
    }, linkText),
  );
  decorateIcons(divEl, 24, 24);
  return divEl;
}

function myAccount() {
  const myAccoundDiv = div({ class: 'w-full overflow-hidden bg-white md:h-full text-black md:rounded-lg rounded' });
  myAccoundDiv.append(
    ul(
      { class: 'flex flex-col w-full min-w-60' },
      li(
        { class: 'mb-3 md:mb-0 border-b border-b-[#D8D8D8] px-4 pt-4 pb-3 space-y-2' },
        a({
          class: 'flex justify-center py-2 focus:outline-none bg-[#378189] hover:bg-[#2a5f65] rounded-full text-white text-sm font-semibold',
          href: 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fen-us',
        }, 'Sign In'),
        p(
          { class: 'w-full flex items-center text-black text-xs font-normal tracking-wide' },
          'New to Abcam?',
          a({
            class: 'hover:underline leading-5 text-[#378189] ml-auto',
            href: 'https://www.abcam.com/auth/register?redirect=https%3A%2F%2Fwww.abcam.com%2Fen-us',
          }, 'Create an account'),
        ),
      ),
      accountMenuList('orders', 'My Orders', 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fmy-account%2Forders'),
      accountMenuList('addresses', 'My Addresses', 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fmy-account%2Faddress-book'),
      accountMenuList('inquiries', 'My Inquiries', 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fmy-account%2Finquiries'),
      accountMenuList('reviews', 'My Reviews', 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fmy-account%2Freviews'),
      accountMenuList('rewards', 'My Rewards', 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fmy-account%2Freward-points'),
      accountMenuList('profile', 'My Profile', 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fmy-account%2Fprofile'),
      li(
        { class: 'mb-3 md:mb-0 px-4 pt-4 pb-3' },
        a({
          class: 'flex justify-center py-2 focus:outline-none hover:bg-[#0711120d] border border-black rounded-full text-black text-sm font-semibold',
          href: 'https://www.abcam.com/en-us/contact-us',
        }, 'Contact Us'),
      ),
    ),
  );
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

  decorateIcons(document.querySelector('.country-dd'), 16, 16);
  block.querySelector('.country-dropdown')?.addEventListener('click', (event) => {
    const countrySearch = document.querySelector('.country-search');
    if (event.target === event.currentTarget || event.target.alt === 'chevron-down-white' || event.target.parentElement.classList.contains('country-flag-icon')) {
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
  const accountEl = document.getElementById('my-account');
  accountEl.append(myAccount());
  document.addEventListener('click', (event) => {
    const dropdownLabel = document.querySelector('label[for="account-dropdown"]');
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
}
