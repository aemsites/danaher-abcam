import { div, img } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import countriesAndCodes from './country-list.js';

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
  if (countrydd?.classList.contains('rotate') && ddImg) {
    ddImg.style.transform = 'rotate(180deg)';
    countrydd.classList.remove('rotate');
  } else if (event === undefined || event.target !== input) {
    ddImg.style.transform = 'rotate(0deg)';
    countrydd.classList.add('rotate');
  }
}

function updateCountryButton(imageSrc, code) {
  const flagElement = document.querySelector('.country-flag-icon');
  if (flagElement) {
    flagElement.src = imageSrc;
  }
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
      img({ class: 'result-flag-container h-5 w-5', alt: code, src: `/eds/icons/flags/${code.toLowerCase()}.svg` }),
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
      updateCountryButton(`/eds/icons/flags/${code.toLowerCase()}.svg`, code);
      resultsContainer.replaceChildren();
    });
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

  input.addEventListener('focus', () => {
    resultsContainer.classList.remove('hidden');
  });
  input.addEventListener('input', (e) => {
    const query = input.value.toLowerCase();
    e.stopPropagation();
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

  // right
  decorateIcons(document.querySelector('.country-dropdown'), 16, 16);
  decorateIcons(document.querySelector('.account-dropdown'), 16, 16);
  decorateIcons(document.querySelector('.cart-dropdown'), 16, 16);
  block.querySelector('.country-dropdown')?.addEventListener('click', (event) => {
    const countrySearch = document.querySelector('.country-search');
    if (event.target === event.currentTarget || event.target.alt === 'chevron-down-white' || event.target.classList.contains('country-flag-icon')) {
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

  const flagElement = block.querySelector('.country-flag-icon');
  const lastSelectedCountry = getCookie('NEXT_COUNTRY');
  if (lastSelectedCountry === null || lastSelectedCountry === undefined) {
    flagElement.src = '/eds/icons/flags/us.svg';
  }
  if (flagElement && lastSelectedCountry !== null) {
    // flagElement.title = lastSelectedCountry;
    flagElement.src = `/eds/icons/flags/${lastSelectedCountry.toLowerCase()}.svg`;
  }
}
