import {
  div, button, span, a, ul, li, h4, input,
  label, p,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { applyClasses } from '../../scripts/scripts.js';
import countriesAndCodes from '../../scripts/country-list.js';

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
  const inputEle = document.getElementById('country-search-input');

  const countrydd = document.querySelector('.country-dd');
  const ddImg = countrydd?.querySelector('img');
  if (event !== undefined && countrydd?.classList.contains('rotate') && ddImg) {
    ddImg.style.transform = 'rotate(180deg)';
    countrydd.classList.remove('rotate');
  } else if (event === undefined || event.target !== inputEle) {
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
  const inputEle = document.getElementById('country-search-input');
  const resultsContainer = document.getElementById('country-results');
  inputEle.focus();
  resultsContainer.classList.remove('hidden');
  inputEle.addEventListener('input', (e) => {
    const query = inputEle.value.toLowerCase();
    e.stopImmediatePropagation();
    displayResults(query, resultsContainer);
  });

  let currentIndex = -1;
  inputEle.addEventListener('keydown', (event) => {
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
    if (!resultsContainer.contains(e.target) && e.target !== inputEle) {
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
  divEl.append(
    a({
      class: 'text-sm font-semibold leading-5 text-black p-2 pl-2',
      href: linkUrl,
      onclick: clearSession,
    }, linkText),
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

function showFlyoutMenu() {
  document.querySelector('#menu-flyout')?.classList.remove('hidden');
}

function hideFlyoutMenu() {
  document.querySelector('#menu-flyout')?.classList.add('hidden');
}

function sortFlyoutMenus(menuPath) {
  const menuList = document.querySelector('#menu-flyout ul');
  const heading = menuPath.split('|');
  if (heading) document.querySelector('#menu-flyout h4').textContent = heading[heading.length - 1];
  [...menuList.children].forEach((menu) => {
    if (menu.getAttribute('data-content') !== menuPath && menu.getAttribute('data-content') !== menuPath) {
      menu.classList.add('hidden');
    } else {
      menu.classList.remove('hidden');
      const backFlyout = document.querySelector('#back-flyout');
      const redirectLink = menu.getAttribute('data-content').split('|').slice(0, -1).join('|');
      if (redirectLink) {
        backFlyout.setAttribute('data-redirect', redirectLink);
        backFlyout.classList.remove('hidden');
      } else backFlyout.classList.add('hidden');
    }
  });
}

function buildSearchBlock(headerBlock) {
  const searchHtmlBlock = headerBlock.children[0];
  applyClasses(searchHtmlBlock, 'navbar-wrapper justify-center bg-black z-50 pt-4');
  searchHtmlBlock.id = 'sticky-header';
  searchHtmlBlock.querySelector('p').classList.add('hidden');
  const logoSearchMenuContainer = div({ class: 'logo-search-menu-container flex flex-col gap-y-7' });
  const logoSearchBarContianer = div({ class: 'logo-searchbar-continer w-full m-0 px-4 md:w-11/12 lg:ml-20 flex flex-row max-[376px]:flex-wrap items-center gap-x-2 md:gap-x-16 gap-y-5 md:items-center' });
  const searchbarContainer = div(
    { class: 'max-[376px]:w-[75%] w-[50%] md:w-full relative' },
    input({
      class: 'w-full text-base h-12 rounded-full bg-black border border-white text-white py-2 px-12 font-bold outline-none',
      placeholder: 'What are you searching for?',
      onkeydown: (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const inputValue = event.target.value.trim();
          if (inputValue) {
            const searchResultsUrl = `https://www.abcam.com/en-us/search?keywords=${inputValue}`;
            window.location.href = searchResultsUrl;
          }
        }
      },
    }),
    span({ class: 'icon icon-Search-bar pl-4 pr-2 absolute top-3 left-0' }),
  );
  logoSearchBarContianer.append(searchbarContainer);

  decorateIcons(logoSearchBarContianer);
  const borderBottom = div({ class: 'h-0.5 mt-3 lg:mt-4', style: 'background: linear-gradient(90deg, #4ba6b3 0, #c9d3b7 35%, #ff8730 70%, #c54428)' });
  const extendedSectionBlock = div({ class: 'extended-section md:w-fit 2xl:ml-[21%] md:ml-80 ml-auto mr-2 hidden lg:flex items-center gap-x-16 lg:block' });
  extendedSectionBlock.id = 'extended-section';
  const logoPictureBlock = a(
    { class: 'w-[120px] hidden md:block' },
    span({ class: 'icon icon-logo' }),
  );
  if (window.location.pathname === '/') {
    logoPictureBlock.href = window.location.href;
  } else {
    logoPictureBlock.href = '/';
  }
  logoPictureBlock.setAttribute('aria-label', 'Abcam Logo');

  const hamburgerIcon = button(
    {
      id: 'nav-hamburger',
      type: 'button',
      class: 'open-side-menu block lg:hidden btn btn-sm h-full w-8 my-auto bg-black text-white',
      'aria-label': 'Menu',
      'aria-expanded': false,
      'aria-controls': 'mega-menu-icons',
      'data-collapse-toggle': 'mega-menu-icons',
    },
    span({ class: 'icon icon-Menu flex items-center w-8 h-6' }),
  );

  const logoHamburgerMenu = div({ class: 'basis-1/12 md:basis-1/6 2xl:basis-1/4 flex flex-row gap-x-2' }, hamburgerIcon, logoPictureBlock);
  logoSearchBarContianer.append(logoHamburgerMenu);

  // Right Main container
  const rightMainContainer = div(
    { class: 'right-main-container basis-1/4 order-3 flex flex-row gap-4 relative' },
    div(
      { class: 'country-container' },
      button(
        { class: 'country-dropdown relative flex flex-row items-center gap-2 w-fit-content w-[82px] h-[34px] py-2 px-4 border border-solid border-white text-white rounded-full hover:bg-[#3B3B3B]' },
        div(
          { class: 'country-flag-container flex flex-row items-center w-6 h-4' },
          span({ class: 'country-flag-icon object-cover border-[0.5px] icon icon-us' }),
        ),
        div(
          { class: 'country-dd rotate' },
          span({ class: 'rotate icon icon-chevron-down-white' }),
        ),
        div(
          { class: 'country-search drop-shadow-2xl absolute top-10 sm:right-0 mt-2 hidden z-10' },
          div(
            { class: 'relative bg-white pb-4 rounded-2xl shadow-elevation-5' },
            div(
              { class: 'text-sm text-black pb-1 font-semibold flex flex-col items-start' },
              label({ class: 'text-black p-4 pb-2 tracking-normal text-sm md:text-lg block' }, 'Country/Region selector'),
              div(
                input({
                  class: 'text-black bg-[#273F3F] hover:bg-[#f2f2f2] text-sm md:text-normal bg-opacity-10 mx-4 h-12 w-auto sm:w-[20.9375rem] border-2 rounded-md ring-[3px] ring-[#6fafb8] focus:outline-none mb-0.5 pl-3 md:pl-5',
                  type: 'text',
                  placeholder: 'Search for a country/region',
                  id: 'country-search-input',
                }),
              ),
              div({
                class: 'w-full max-h-[200px] xl:max-h-[345px] 2xl:max-h-[500px] overflow-y-auto hidden',
                id: 'country-results',
              }),
            ),
          ),
        ),
      ),
    ),
    div(
      { class: 'account-dropdown-container static md:relative w-max' },
      input({
        type: 'checkbox',
        id: 'account-dropdown',
        class: 'peer hidden',
      }),
      label(
        {
          for: 'account-dropdown',
          class: 'account-dropdown border border-white rounded-2xl px-2 py-3 text-xs h-8 inline-flex justify-center items-center cursor-pointer outline hover:ring ring-[#6db9c1] ring-offset-1 hover:bg-[#3B3B3B]',
        },
        span({ class: 'user-icon icon icon-user pl-0 sm:pl-1' }),
        span({ class: 'hidden lg:!block user-account text-white font-semibold px-1.5 select-none' }, 'My account'),
        span({ class: 'hidden lg:!block user-icon-dd icon icon-chevron-down-white' }),
      ),
      div({
        class: 'account-dropdown-menu hidden peer-checked:block w-full lg:!w-auto absolute top-12 md:top-9 left-0 md:!left-auto sm:right-0 mt-1 z-40 pb-4',
        id: 'my-account',
        role: 'dialog',
        tabindex: '-1',
      }),
    ),
    div(
      { class: 'cart-dropdown w-[58.631px] lg:w-[74px] h-[32px] flex items-center justify-center cursor-pointer border border-white rounded-2xl relative' },
      div(
        { class: 'focus-visible:outline-none focus-visible:shadow-interactiveElement absolute' },
        button(
          { class: 'flex items-center gap-1 text-sm h-8', type: 'button' },
          span({ class: 'cart-icon icon icon-cart_white' }),
          span({ class: 'cart-count hidden bg-red-500 w-[17.6px] h-[17.6px] w-[22px] h-[22px] sm:w rounded-2xl flex items-center justify-center text-white px-1.5' }),
        ),
      ),
    ),
  );
  decorateIcons(rightMainContainer.querySelector('.cart-dropdown'), 16, 16);
  logoSearchBarContianer.append(rightMainContainer);
  logoSearchBarContianer.append(searchbarContainer);

  decorateIcons(logoPictureBlock, 120, 25);
  decorateIcons(hamburgerIcon);
  logoSearchMenuContainer.append(logoSearchBarContianer);
  logoSearchMenuContainer.append(extendedSectionBlock);
  searchHtmlBlock.append(logoSearchMenuContainer);
  searchHtmlBlock.append(borderBottom);
  searchHtmlBlock.querySelector('#nav-hamburger').addEventListener('click', (e) => {
    e.preventDefault();
    showFlyoutMenu();
    sortFlyoutMenus('Menu');
  });
}

function buildNavBlock(headerBlock) {
  const extendedSectionBlock = headerBlock.querySelector('div.extended-section');
  const menuLinks = [];
  [...headerBlock.children].slice(1).forEach((menuItemEl) => {
    menuItemEl.className = menuItemEl.innerHTML ? 'menu-flyout hidden' : '';
    if (menuItemEl.querySelector('p')?.textContent === 'Menu') {
      menuItemEl.querySelectorAll('ul > li').forEach((childMenuItem) => {
        menuLinks.push(childMenuItem);
      });
    }
  });

  menuLinks.forEach((item) => {
    const menuItemName = item.innerText;
    const menuItemEl = a(
      {
        class: 'btn flex items-center font-bold relative bg-black text-white ring-0 border-b-4 border-black hover:border-b-4 hover:border-[#ff7223] ring-offset-0 group',
        href: item.querySelector('a')?.href || '/',
      },
      menuItemName,
    );
    menuItemEl.addEventListener('click', (e) => {
      e.preventDefault();
      showFlyoutMenu();
      sortFlyoutMenus(`Menu|${menuItemName}`);
    });
    extendedSectionBlock.append(menuItemEl);
  });
}

function buildFlyoutMenus(headerBlock) {
  const allFlyout = headerBlock.querySelectorAll('.menu-flyout');
  const closeSvg = div({ class: 'close-svg' }, span({ class: 'icon icon-close' }));
  decorateIcons(closeSvg);

  const closeLogo = div({ class: 'close-Logo' }, span({ class: 'icon icon-logo' }));
  decorateIcons(closeLogo, 100, 100);

  const closeFlyout = div(
    { class: 'flex mt-5 p-1 gap-x-4 rounded' },
    closeSvg,
    closeLogo,
  );

  closeFlyout.addEventListener('click', hideFlyoutMenu);

  const backFlyout = button({ id: 'back-flyout', class: 'flex items-center gap-x-1 group' }, span({ class: 'icon icon-chevron-left-orange w-4 h-4 transition-transform group-hover:translate-x-0.5' }), 'Back');
  backFlyout.addEventListener('click', () => sortFlyoutMenus(backFlyout.getAttribute('data-redirect')));

  const navigateActions = div(
    { class: 'flex justify-between mt-5 text-base text-white font-bold mx-2' },
    backFlyout,
  );

  decorateIcons(backFlyout);

  const menuWrapper = ul({ class: 'h-full flex flex-col text-white gap-y-2 mt-3 overflow-auto [&>li.active]:bg-danaherpurple-50 [&>li.active]:font-bold' });
  [...allFlyout].forEach((flyMenu) => {
    const contentText = flyMenu.children[0]?.textContent;
    const anchorHref = flyMenu.children[1].querySelector('a')?.href;
    [...flyMenu.children[1].children].map((flyMenuChild) => {
      const contextPath = `${contentText}|${flyMenuChild.textContent}`;
      const liTag = li(
        {
          class: 'inline-flex justify-between items-center font-extralight text-base hover:font-medium tracking-wider px-2 py-2 select-none cursor-pointer [&>a]:w-full transition group',
          'data-content': contentText,
          ...(anchorHref && { 'data-href': anchorHref }),
        },
      );
      if (!(flyMenuChild.querySelector('a'))) {
        liTag.setAttribute('data-redirect', contextPath);
        liTag.innerHTML += flyMenuChild.textContent;
        liTag.classList.add('font-bold');
        liTag.append(span({ class: 'icon icon-chevron-right-orange w-4 h-4 group-hover:-translate-x-0.5' }));
        liTag.addEventListener('click', () => sortFlyoutMenus(contextPath));
      } else liTag.append(a({ href: flyMenuChild.querySelector('a')?.href }, flyMenuChild.textContent));
      decorateIcons(liTag);
      menuWrapper.append(liTag);
      return flyMenuChild;
    });
    flyMenu.outerHTML = '';
  });

  const flyout = div(
    {
      id: 'menu-flyout',
      class: 'w-full hidden fixed top-0 left-0 z-40 h-screen transition-all ease-out backdrop-brightness-50',
    },
    div(
      { class: 'w-[360px] max-w-sm fixed h-full bg-black px-3 py-4 ease-out transition-all' },
      closeFlyout,
      h4({ class: 'text-2xl font-medium text-white mt-5 mx-2 mb-2' }, 'Flyout Menu Heading'),
      navigateActions,
      div({ class: 'border-b border-b-gray-400 py-2 mx-2' }),
      menuWrapper,
    ),
  );
  flyout.addEventListener('click', (event) => {
    if (event.target.id === 'menu-flyout') hideFlyoutMenu();
  });
  return flyout;
}

function handleScroll() {
  const stickyHeader = document.getElementById('sticky-header');
  const hamburgerIcon = document.getElementById('nav-hamburger');
  const extendedSection = document.getElementById('extended-section');
  const brandLogo = stickyHeader.querySelector('.brand-logo');
  if (window.scrollY >= 95) {
    applyClasses(stickyHeader, 'remove-descedents fixed inset-x-0 top-0 w-full shadow-lg');
    stickyHeader.firstElementChild.classList.add('bg-black');
    hamburgerIcon?.classList.remove('lg:hidden');
    hamburgerIcon?.classList.add('lg:block');
    extendedSection?.classList.remove('lg:grid-rows-2');
    extendedSection?.classList.add('lg:grid-rows-1');
    extendedSection?.classList.remove('lg:block');
    extendedSection?.classList.add('lg:hidden');
    brandLogo?.classList.remove('h-full');
    brandLogo?.classList.add('h-10');
  } else if (window.scrollY < 95) {
    stickyHeader.classList.remove('remove-descedents', 'fixed', 'inset-x-0', 'top-0', 'w-full', 'shadow-lg');
    stickyHeader.firstElementChild.classList.remove('bg-danaherblue-600');
    hamburgerIcon?.classList.add('lg:hidden');
    hamburgerIcon?.classList.remove('lg:block');
    extendedSection?.classList.remove('lg:grid-rows-1');
    extendedSection?.classList.add('lg:grid-rows-2');
    extendedSection?.classList.remove('lg:hidden');
    extendedSection?.classList.add('lg:block');
    brandLogo?.classList.remove('h-10');
    brandLogo?.classList.add('h-full');
  }
}

export default async function decorate(block) {
  const resp = await fetch('/nav.plain.html');

  if (resp.ok) {
    const html = await resp.text();

    // build header DOM
    const headerBlock = div({ class: 'nav-container pt-0 pb-0 md:p-0 relative z-20 h-full' });
    headerBlock.innerHTML = html;
    buildSearchBlock(headerBlock);
    buildNavBlock(headerBlock);

    const flyout = buildFlyoutMenus(headerBlock);

    window.addEventListener('scroll', handleScroll);
    block.innerHTML = '';
    block.append(headerBlock);
    block.append(flyout);
    block.classList.add('h-full');

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
  return block;
}
