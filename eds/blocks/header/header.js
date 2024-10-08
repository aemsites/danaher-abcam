import {
  div, button, span, a, ul, li, h4, input,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { applyClasses } from '../../scripts/scripts.js';

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
  const logoSearchBarContianer = div({ class: 'logo-searchbar-continer w-full m-0 px-4 md:w-11/12 lg:ml-20 flex flex-col-reverse content-start md:flex-row md:gap-x-20 gap-y-5 md:items-center' });
  const searchbarContainer = div(
    { class: 'w-full md:w-6/12 relative' },
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
  const extendedSectionBlock = div({ class: 'extended-section md:w-fit md:ml-80 ml-auto mr-2 hidden lg:flex items-center gap-x-16 lg:block' });
  extendedSectionBlock.id = 'extended-section';
  const logoPictureBlock = a(
    { class: '' },
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

  const logoHamburgerMenu = div({ class: 'flex flex-row gap-x-2' }, hamburgerIcon, logoPictureBlock);
  logoSearchBarContianer.append(logoHamburgerMenu);
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
  }

  return block;
}
