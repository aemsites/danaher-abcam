import { readBlockConfig, decorateIcons } from '../../scripts/aem.js';
import { div, span } from '../../scripts/dom-builder.js';

/**
 * Adding Hyperlinks to social icons. Links which are authored in the sharepoint
 * @param {Element} socialIcons Authored content from the Document
 */
function callSocialIcons(socialIcons) {
  const allAnchorTags = div({ class: 'flex items-center gap-x-1.5 md:gap-x-4' });
  for (let i = 0; i < socialIcons.children.length; i += 1) {
    const createAtag = document.createElement('a');
    createAtag.appendChild(socialIcons.children[i]?.firstElementChild?.querySelector('picture'));
    createAtag.setAttribute('href', socialIcons.children[i]?.children[1]?.firstElementChild.href);
    createAtag.setAttribute('target', '_blank');
    createAtag.setAttribute('aria-label', 'Social Media Link');
    allAnchorTags.appendChild(createAtag);
  }
  return allAnchorTags;
}

// Adding classes to the footer links
function addClassesToListItems(element, depth) {
  for (let i = 0; i < element.length; i += 1) {
    const item = element[i];
    if (depth > 1) {
      item.classList.add(...'mt-2 font-normal text-white opacity-80 hover:underline'.split(' '));
    }
    const childItems = item.querySelector('ul');
    if (childItems?.children?.length > 0) {
      addClassesToListItems(childItems.children, depth + 1);
    }
  }
}

// Show hide in responsive for footer links
function showHideFooterLinks(footerLinks) {
  footerLinks.addEventListener('click', (event) => {
    if (event.target.closest('li').querySelector('ul').classList.contains('hidden')) {
      event.target.closest('li').querySelector('ul').classList.remove('hidden');
      event.target.closest('li').querySelector('img').style.transform = 'rotate(180deg)';
    } else {
      event.target.closest('li').querySelector('ul').classList.add('hidden');
      event.target.closest('li').querySelector('img').style.transform = 'rotate(0deg)';
    }
  });
}

/**
 * Create Footer DOM Structure
 * @param {Element} mainContainer Authored content from the Document
 */
function createFooterDOM(mainContainer) {
  const firstChild = mainContainer.firstElementChild;

  const topContainer = div({ class: 'flex items-end justify-between' });
  const logoContainer = div({ class: 'logo-container' });
  const socialIconsContainer = div({ class: 'social-icons-container' });

  const middleContainer = div({ class: 'middle-container' });
  const footerLinks = div({ class: 'footer-links' });

  const bottomContainer = div({ class: 'flex justify-between text-link-small' });
  const danaharLogoContainer = div({ class: 'shrink-0 h-[84px] w-[72px]' });

  const bottomLeftContainer = div({ class: 'flex flex-col items-end gap-y-4' });
  const privacyTermsContainer = div({ class: 'flex flex-wrap justify-end font-light space-x-5 opacity-90' });

  const rightsContainer = div({ class: 'font-normal text-end opacity-80' });

  const logo = firstChild.firstElementChild;
  const socialIcons = callSocialIcons(firstChild.children[1]);
  const links = firstChild.children[2];
  const danaharLogo = firstChild.children[3];
  [firstChild.children[4]].forEach((elements) => {
    [...elements.children].forEach((element) => {
      element.classList.add(...'hover:underline font-normal'.split(' '));
      privacyTermsContainer.append(element);
    });
  });
  const rights = firstChild.children[5];

  logoContainer.appendChild(logo);
  socialIconsContainer.appendChild(socialIcons);
  topContainer.appendChild(logoContainer);

  topContainer.appendChild(socialIconsContainer);

  footerLinks.appendChild(links);
  middleContainer.appendChild(footerLinks);
  const ceneterElements = middleContainer.firstElementChild.firstElementChild;
  if (ceneterElements !== undefined) {
    ceneterElements.classList.add(...'flex flex-col md:flex-row gap-x-20 gap-y-4'.split(' '));
    ceneterElements.querySelectorAll('strong').forEach((linksHeading) => {
      linksHeading.style.display = 'block';
      linksHeading.style.marginBottom = '0.4rem';
      linksHeading.classList.add(...'font-bold text-lg'.split(' '));
    });
    [...ceneterElements.children].forEach((liEle) => {
      const linkDiv = div({ class: 'link-div flex flex-row justify-between align-center' });
      linkDiv.append(liEle.querySelector('strong'));
      const svgSpan = span({ class: 'md:hidden icon icon-chevron-down-white' });
      linkDiv.append(svgSpan);
      decorateIcons(linkDiv);
      liEle.prepend(linkDiv);
      liEle.querySelector('ul').classList.add(...'hidden md:block mt-4 text-white text-body-medium font-body'.split(' '));
    });
  }
  showHideFooterLinks(footerLinks);
  addClassesToListItems(footerLinks.firstElementChild.children, 1);
  danaharLogoContainer.appendChild(danaharLogo);
  // privacyTermsContainer.appendChild(privacyTerms);
  rightsContainer.appendChild(rights);
  bottomLeftContainer.appendChild(privacyTermsContainer);
  bottomLeftContainer.appendChild(rightsContainer);
  bottomContainer.appendChild(danaharLogoContainer);
  bottomContainer.appendChild(bottomLeftContainer);

  mainContainer.appendChild(topContainer);
  mainContainer.appendChild(div({ class: 'my-8 border-t border-white opacity-50 lg:my-7' }));
  mainContainer.appendChild(middleContainer);
  mainContainer.appendChild(div({ class: 'my-6 border-t border-white opacity-50 lg:my-6' }));
  mainContainer.appendChild(bottomContainer);
  mainContainer.firstElementChild.remove();
  return mainContainer;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  block.classList.add(...'pt-8 pb-8 mt-auto text-white bg-black'.split(' '));
  const cfg = readBlockConfig(block);
  const footerPath = cfg.footer || '/footer';
  const response = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (response.ok) {
    const html = await response.text();
    const mainContainer = div({ class: 'flex flex-col mx-auto lg:px-8 md:px-12 w-[84%] max-[767px]:px-2' });
    mainContainer.innerHTML = html;
    block.append(createFooterDOM(mainContainer));
  }
}
