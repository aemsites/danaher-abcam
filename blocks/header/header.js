import {
  div, button, span, a, ul, li, h4,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

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
      const href = menu.getAttribute('data-href');
      const backFlyout = document.querySelector('#back-flyout');
      const exploreFlyout = document.querySelector('#explore-flyout');
      const redirectLink = menu.getAttribute('data-content').split('|').slice(0, -1).join('|');
      if (redirectLink) {
        backFlyout.setAttribute('data-redirect', redirectLink);
        backFlyout.classList.remove('hidden');
      } else backFlyout.classList.add('hidden');
      if (href) {
        exploreFlyout.setAttribute('href', href);
        exploreFlyout.classList.remove('hidden');
      } else exploreFlyout.classList.add('hidden');
    }
  });
}

function buildSearchBlock(headerBlock) {
  const searchHtmlBlock = headerBlock.children[0];
  searchHtmlBlock.classList.add(...'navbar-wrapper justify-center bg-black z-50 pt-2 lg:pt-4'.split(' '));
  searchHtmlBlock.id = 'sticky-header';
  const borderBottom = div({ class: 'h-0.5 mt-3', style: 'background: linear-gradient(90deg, #4ba6b3 0, #c9d3b7 35%, #ff8730 70%, #c54428)' });
  const searchNewBlock = div({ class: 'bg-black flex gap-x-4 xl:gap-x-8 lg:mx-auto 2xl:mx-24 lg:px-8 md:px-12 px-4 pr-4 max-w-7xl flex-row' });
  const extendedSectionBlock = div({ class: 'extended-section md:w-full ml-auto md:ml-14 mr-2 md:mr-4 hidden lg:flex items-center gap-x-4 lg:block' });
  extendedSectionBlock.id = 'extended-section';
  const logoPictureBlock = a({ class: '' });
  const logoPictureBlockIcon = span({ class: 'icon icon-logo' });
  if (window.location.pathname === '/') {
    logoPictureBlock.href = window.location.href;
  } else {
    logoPictureBlock.href = 'https://main--danaher-optimus--aemsites.hlx.page/';
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
    span({ class: 'icon icon-Menu' }),
  );

  searchNewBlock.append(hamburgerIcon);
  logoPictureBlock.append(logoPictureBlockIcon);
  searchNewBlock.append(logoPictureBlock);
  decorateIcons(logoPictureBlock);
  decorateIcons(hamburgerIcon);
  searchNewBlock.append(extendedSectionBlock);
  searchHtmlBlock.append(searchNewBlock);
  searchHtmlBlock.append(borderBottom);
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
        class: 'btn flex relative bg-black hover:bg-black text-white font-medium ring-0 border-0 ring-offset-0 group',
        href: item.querySelector('a')?.href || '/',
      },
      menuItemName,
    );
    const arrowDownIcon = span({ class: 'icon icon-chevron-down-white flex transition group-hover:rotate-180 ml-1 [&_img]:items-center' });
    menuItemEl.append(arrowDownIcon);
    menuItemEl.addEventListener('click', (e) => {
      e.preventDefault();
      showFlyoutMenu();
      sortFlyoutMenus(`Menu|${menuItemName}`);
    });
    decorateIcons(menuItemEl);
    extendedSectionBlock.append(menuItemEl);
  });
}

function buildFlyoutMenus(headerBlock) {
  const allFlyout = headerBlock.querySelectorAll('.menu-flyout');
  const closeFlyout = button(
    { class: 'flex mx-2 mt-5 p-1 gap-x-4 rounded' },
    span({ class: 'icon icon-close w-6 h-6 [&_svg>use]:stroke-2 [&_svg>use]:bg-white' }),
    span({ class: 'icon icon-logo' }),
  );
  closeFlyout.addEventListener('click', hideFlyoutMenu);

  const backFlyout = button({ id: 'back-flyout', class: 'flex items-center gap-x-1 group' }, span({ class: 'icon icon-chevron-left-orange w-4 h-4 transition-transform group-hover:translate-x-0.5' }), 'Back');
  backFlyout.addEventListener('click', () => sortFlyoutMenus(backFlyout.getAttribute('data-redirect')));

  const exploreFlyout = a({ id: 'explore-flyout', class: 'flex items-center gap-x-1 group', href: '/' }, 'Explore all', span({ class: 'icon icon-chevron-right-orange w-4 h-4 transition-transform group-hover:-translate-x-0.5' }));

  const navigateActions = div(
    { class: 'flex justify-between mt-5 text-base text-white font-bold mx-2' },
    backFlyout,
    exploreFlyout,
  );

  decorateIcons(closeFlyout);
  decorateIcons(backFlyout);
  decorateIcons(exploreFlyout);

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
      if (headerBlock.querySelector('span.icon')) {
        liTag.setAttribute('data-redirect', contextPath);
        liTag.innerHTML += flyMenuChild.textContent;
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
    stickyHeader.classList.add('remove-descedents', 'fixed', 'inset-x-0', 'top-0', 'w-full', 'shadow-lg');
    stickyHeader.firstElementChild.classList.add('bg-black');
    hamburgerIcon?.classList.remove('lg:hidden');
    hamburgerIcon?.classList.add('lg:block');
    extendedSection?.classList.remove('lg:lg:grid-rows-2');
    extendedSection?.classList.add('lg:lg:grid-rows-1');
    extendedSection?.classList.remove('lg:block');
    extendedSection?.classList.add('lg:hidden');
    brandLogo?.classList.remove('h-full');
    brandLogo?.classList.add('h-10');
  } else if (window.scrollY < 95) {
    stickyHeader.classList.remove('remove-descedents', 'fixed', 'inset-x-0', 'top-0', 'w-full', 'shadow-lg');
    stickyHeader.firstElementChild.classList.remove('bg-danaherblue-600');
    hamburgerIcon?.classList.add('lg:hidden');
    hamburgerIcon?.classList.remove('lg:block');
    extendedSection?.classList.remove('lg:lg:grid-rows-1');
    extendedSection?.classList.add('lg:lg:grid-rows-2');
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
    const headerBlock = div({ class: 'nav-container pt-0 pb-0 md:p-0 relative z-20' });
    headerBlock.innerHTML = html;
    buildSearchBlock(headerBlock);
    buildNavBlock(headerBlock);

    const flyout = buildFlyoutMenus(headerBlock);

    window.addEventListener('scroll', handleScroll);
    block.innerHTML = '';
    block.append(headerBlock);
    block.append(flyout);
  }

  return block;
}
