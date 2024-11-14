import { a, button, div, span } from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

function megaMeunu() {
  return div({ class: 'w-[360px] z-40 hidden max-w-sm fixed h-full bg-black px-3 py-4 ease-out transition-all' });
}

function linkList(iconName, linkText, linkUrl) {
  const divEl = div({ class: 'flex flex-row items-center gap-x-2 px-4 py-2 hover:bg-[#0711120d] cursor-pointer' });
  divEl.append(
    span({ class: `icon icon-${iconName}` }),
    a({
      class: 'text-sm font-normal leading-5 text-black p-2 pl-2',
      href: linkUrl,
    }, linkText),
  );
  decorateIcons(divEl);
  return divEl;
}

function myAccount() {
  const myAccoundDiv = div({ class: 'mt-1 right-0 absolute z-drawer transform opacity-100 scale-100' });
  myAccoundDiv.append(
    div({ class: 'w-full overflow-hidden bg-white md:h-full text-black md:w-full shadow-elevation-3 md:rounded-8px' },
      div({ class: 'flex flex-col w-full min-w-80' },
        div({ class: 'mb-3 md:mb-0 border-b border-b-[#D8D8D8] px-4 pt-4 pb-3' },
          a({
            class: 'button size-full flex items-center gap-x-2 justify-center py-2 focus:outline-none bg-[#378189] rounded-full text-white text-sm font-semibold',
            href: 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fen-us',
          }, 'Sign In'),
          div({ class: 'flex md:inline-flex text-align-center items-center justify-between w-full mt-2' },
            span({ class: '' }, 'New to Abcam?',
              a({
                class: 'text-sm font-normal leading-5 text-[#378189] p-2 pl-2 hover:underline',
                href: 'https://www.abcam.com/auth/register?redirect=https%3A%2F%2Fwww.abcam.com%2Fen-us',
              }, 'Create an account')
            ),
          ),
        ),
        linkList('orders', 'My Orders', 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fmy-account%2Forders'),
        linkList('addresses', 'My Addresses', 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fmy-account%2Forders'),
        linkList('inquiries', 'My Inquiries', 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fmy-account%2Forders'),
        linkList('reviews', 'My Reviews', 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fmy-account%2Forders'),
        linkList('rewards', 'My Rewards', 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fmy-account%2Forders'),
        linkList('profile', 'My Profile', 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fmy-account%2Forders'),
        div({ class: 'mb-3 md:mb-0 px-4 pt-4 pb-3' },
          a({
            class: 'button size-full flex items-center gap-x-2 justify-center py-2 focus:outline-none border border-solid border-black rounded-full text-black text-sm font-semibold',
            href: 'https://www.abcam.com/auth/login?redirect=https%3A%2F%2Fwww.abcam.com%2Fen-us',
          }, 'Contact Us')       
        ),
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
  const dropdownContainer = document.querySelector('.account-dropdown-container');
  decorateIcons(dropdownContainer, 16, 16);
  const accountEl = document.getElementById('my-account');
  accountEl.append(myAccount());
  document.addEventListener('click', (event) => {
    const dropdownLabel = document.querySelector('label[for="account-dropdown"]');
    if (!dropdownLabel.contains(event.target) && dropdownLabel.previousElementSibling.checked) {
      dropdownLabel.click();
    }
  }); 
}
