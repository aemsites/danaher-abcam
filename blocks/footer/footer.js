import { readBlockConfig } from '../../scripts/aem.js';
import { div, span } from '../../scripts/dom-builder.js';

function callSocialIcons(socialIcons) {
  const allAnchorTags = div({ class: 'social-icons' });
  for (let i = 0; i < socialIcons.children.length; i += 1) {
    const createAtag = document.createElement('a');
    createAtag.appendChild(socialIcons.children[i]?.children[0]?.querySelector('picture'));
    createAtag.setAttribute('href', socialIcons.children[i]?.children[1]?.children[0].href);
    createAtag.setAttribute('target', '_blank');
    createAtag.setAttribute('aria-label', 'Social Media Link');
    allAnchorTags.appendChild(createAtag);
  }
  return allAnchorTags;
}

function showHideFooterLinks(footerLinks) {
  footerLinks.addEventListener('click', (event) => {
    event.target.closest('li').querySelector('span').classList.toggle('open-arrow');

    if (event.target.closest('li').querySelector('ul').classList.contains('show-hide')) {
      event.target.closest('li').querySelector('ul').classList.remove('show-hide');
    } else { event.target.closest('li').querySelector('ul').classList.add('show-hide'); }
  });
}

function addClassesToListItems(element, depth) {
  for (let i = 0; i < element.length; i += 1) {
    const item = element[i];
    item.classList.add('hs-menu-item', `hs-menu-depth-${depth}`, 'hs-item-has-children', `menu-num-${i + 1}`);
    if (depth === 1) {
      item.prepend(span({ class: 'arrow' }));
    }
    const childItems = item.querySelector('ul');
    if (childItems?.children?.length > 0) {
      addClassesToListItems(childItems.children, depth + 1);
    }
  }
}

/**
 * Create Footer DOM Structure
 * @param {Element} mainContainer Authored content from the Document
 */
function createFooterDOM(mainContainer) {
  const firstChild = mainContainer.children[0];

  const topContainer = div({ class: 'top-container' });
  const logoContainer = div({ class: 'logo-container' });
  const socialIconsContainer = div({ class: 'social-icons-container' });

  const middleContainer = div({ class: 'middle-container' });
  const footerLinks = div({ class: 'footer-links' });

  const bottomContainer = div({ class: 'bottom-container' });
  const danaharLogoContainer = div({ class: 'danahar-logo-container' });

  const bottomLeftContainer = div({ class: 'bottom-left-container' });
  const privacyTermsContainer = div({ class: 'privacy-Terms-container' });

  const rightsContainer = div({ class: 'rights-container' });

  const logo = firstChild.children[0];
  const socialIcons = callSocialIcons(firstChild.children[1]);
  const links = firstChild.children[2];
  const danaharLogo = firstChild.children[3];
  const privacyTerms = firstChild.children[4];
  const rights = firstChild.children[5];

  logoContainer.appendChild(logo);
  socialIconsContainer.appendChild(socialIcons);
  topContainer.appendChild(logoContainer);

  topContainer.appendChild(socialIconsContainer);

  footerLinks.appendChild(links);
  middleContainer.appendChild(footerLinks);

  showHideFooterLinks(footerLinks);
  addClassesToListItems(footerLinks.children[0].children, 1);
  danaharLogoContainer.appendChild(danaharLogo);
  privacyTermsContainer.appendChild(privacyTerms);
  rightsContainer.appendChild(rights);
  bottomLeftContainer.appendChild(privacyTermsContainer);
  bottomLeftContainer.appendChild(rightsContainer);
  bottomContainer.appendChild(danaharLogoContainer);
  bottomContainer.appendChild(bottomLeftContainer);

  mainContainer.appendChild(topContainer);
  mainContainer.appendChild(middleContainer);
  mainContainer.appendChild(bottomContainer);
  mainContainer.children[0].remove();
  return mainContainer;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  const footerPath = cfg.footer || '/footer';
  const response = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (response.ok) {
    const html = await response.text();
    const mainContainer = div({ class: 'main-container' });
    mainContainer.innerHTML = html;
    block.append(createFooterDOM(mainContainer));
  }
}
