import {
  sampleRUM,
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
  toClassName,
  getMetadata,
} from './aem.js';
import { div } from './dom-builder.js';

const LCP_BLOCKS = ['hero', 'hero-video']; // add your LCP blocks to the list

/**
 * 
 * @param {*} config 
 * @returns response JSON
 */
export async function fetchResponse(config) {
  const {
    url,
    method,
    authToken,
    type = 'application/json',
    body,
  } = config;
  const headers = {
    'Content-Type': type,
    Accept: 'application/json',
  };
  const configuration = { method, headers };
  if (body) {
    configuration.body = body;
  }
  if (authToken && authToken.trim() !== '') {
    headers.Authorization = `Bearer ${authToken}`;
  }
  const response = await fetch(url, configuration)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }  
      throw new Error('Sorry, network error, not able to render response.');
  });
  return response;
}


/**
 * It will used generate random number to use in ID
 * @returns 4 digit random numbers
 */
export function generateUUID() {
  return Math.floor(1000 + Math.random() * 9000);
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export function isValidProperty(property) {
  if (property && String(property).trim() !== '' && String(property).trim() !== 'null' && String(property).trim() !== 'undefined') {
    return true;
  }
  return false;
}

export function createRequest(config) {
  const {
    url,
    method = 'GET',
    authToken,
    type = 'application/json',
    body,
  } = config;
  const headers = {
    'Content-Type': type,
    Accept: 'application/json',
  };
  const configuration = { method, headers };
  if (body) {
    configuration.body = body;
  }
  if (authToken && authToken.trim() !== '') {
    headers.Authorization = `Bearer ${authToken}`;
  }
  return fetch(url, configuration);
}

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

const TEMPLATE_LIST = [
  'home-page',
  'protocols',
  'product-category',
  'blog-page',
  'product-detail',
  'search-results'
];

async function decorateTemplates(main) {
  try {
    const template = toClassName(getMetadata('template'));
    if (TEMPLATE_LIST.includes(template)) {
      const templateName = template;
      const mod = await import(`../templates/${templateName}/${templateName}.js`);
      loadCSS(`${window.hlx.codeBasePath}/templates/${templateName}/${templateName}.css`);
      if (mod.default) {
        await mod.default(main);
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the sticky right navigation block from main element.
 * @param {Element} main The main element
 */
function decorateStickyRightNav(main){
  const stickySection = main.querySelector('div.sticky-right-navigation-container');
  if(stickySection){
    const divEl = div();
    stickySection.classList.add('flex');
    const stricyBlock = stickySection.querySelector('.sticky-right-navigation-wrapper')?.firstElementChild;
    stricyBlock?.classList.add('sticky', 'top-32', 'mt-4', 'ml-20', 'mr-[-8rem]');
    [...stickySection.children].forEach((child, index, childs) => {
      if(index !== childs.length - 1){
        divEl.append(child);
      }
    });
    stickySection.prepend(divEl);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
  decorateStickyRightNav(main);
}

function capitalizeWords(str) {
  const words = str.split(' ');
  const capitalizedWords = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });
  return capitalizedWords.join(' ');
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    await decorateTemplates(main);
    decorateMain(main);

    function initATJS(path, config) {
      window.targetGlobalSettings = config;
      window.targetPageParams = function getTargetPageParams() {
        return {
          at_property: '48564bd6-fd34-2ea2-b787-ba3aefa3187d',
        };
      };
      return new Promise((resolve) => {
        import(path).then(resolve);
      });
    }
    
    function onDecoratedElement(fn) {
      // Apply propositions to all already decorated blocks/sections
      if (document.querySelector('[data-block-status="loaded"],[data-section-status="loaded"]')) {
        fn();
      }
    
      const observer = new MutationObserver((mutations) => {
        if (mutations.some((m) => m.target.tagName === 'BODY'
          || m.target.dataset.sectionStatus === 'loaded'
          || m.target.dataset.blockStatus === 'loaded')) {
          fn();
        }
      });
      // Watch sections and blocks being decorated async
      observer.observe(document.querySelector('main'), {
        subtree: true,
        attributes: true,
        attributeFilter: ['data-block-status', 'data-section-status'],
      });
      // Watch anything else added to the body
      observer.observe(document.querySelector('body'), { childList: true });
    }
    
    function toCssSelector(selector) {
      return selector.replace(/(\.\S+)?:eq\((\d+)\)/g, (_, clss, i) => `:nth-child(${Number(i) + 1}${clss ? ` of ${clss})` : ''}`);
    }
    
    async function getElementForOffer(offer) {
      const selector = offer.cssSelector || toCssSelector(offer.selector);
      return document.querySelector(selector);
    }
    
    async function getElementForMetric(metric) {
      const selector = toCssSelector(metric.selector);
      return document.querySelector(selector);
    }
    
    async function getAndApplyOffers() {
      const response = await window.adobe.target.getOffers({ request: { execute: { pageLoad: {} } } });
      const { options = [], metrics = [] } = response.execute.pageLoad;
      onDecoratedElement(() => {
        window.adobe.target.applyOffers({ response });
        // keeping track of offers that were already applied
        // eslint-disable-next-line no-return-assign
        options.forEach((o) => o.content = o.content.filter((c) => !getElementForOffer(c)));
        // keeping track of metrics that were already applied
        // eslint-disable-next-line no-confusing-arrow
        metrics.map((m, i) => getElementForMetric(m) ? i : -1)
          .filter((i) => i >= 0)
          .reverse()
          .map((i) => metrics.splice(i, 1));
      });
    }
    
    let atjsPromise = Promise.resolve();
    atjsPromise = initATJS('./at.js', {
      clientCode: 'danaher',
      serverDomain: 'danaher.tt.omtrdc.net',
      imsOrgId: '08333E7B636A2D4D0A495C34@AdobeOrg',
      bodyHidingEnabled: false,
      cookieDomain: window.location.hostname,
      pageLoadEnabled: false,
      secureOnly: true,
      viewsEnabled: false,
      withWebGLRenderer: false,
    }).catch((e) => {
      // eslint-disable-next-line no-console
      console.error('Error loading at.js', e);
    });
    document.addEventListener('at-library-loaded', () => getAndApplyOffers());
	  
    document.body.classList.add('appear');
    await atjsPromise;

    await new Promise((resolve) => {
      window.requestAnimationFrame(async () => {
        document.body.classList.add('appear');
        await waitForLCP(LCP_BLOCKS);
        resolve();
      });
    });
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

// Changes date format from excel general format to date
export function formatDateRange(date) {
  const options = {
    month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC',
  };
  const startDate = new Date(Number(date - 25569) * 24 * 60 * 60 * 1000).toUTCString();
  const formattedStartDate = new Date(startDate).toLocaleDateString('en-us', options);
  return formattedStartDate;
}

// Changes date format from Unix Epoch to date
export function formatDate(date) {
  const options = {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
  };
  const lastModifiedDate = new Date(Number(date) * 1000);
  console.log(lastModifiedDate);
  const formattedDate = new Intl.DateTimeFormat('en-us', options).format(lastModifiedDate);
  const formatDate = formattedDate.replace(/,/g, '');
  return formatDate;
}
/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
