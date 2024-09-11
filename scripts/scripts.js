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
  createOptimizedPicture,
} from './aem.js';
import { div, span, button, iframe, p, img, li } from './dom-builder.js';

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
 * Format date expressed in UTC seconds
 * @param {number} date
 * @returns new string with the formatted date
 */
export function formatDateUTCSeconds(date, options = {}) {
  const dateObj = new Date(0);
  dateObj.setUTCSeconds(date);

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    ...options,
  });
}

/**
 * Get the Image URL from Scene7 and Optimize the picture
 * @param {string} imageUrl
 * @param {string} imageAlt
 * @param {boolean} eager
 * @returns Optimized image
 */
export function imageHelper(imageUrl, imageAlt, eager = false) {
  const imgUrl = 'https://stage.lifesciences.danaher.com'+imageUrl;
    return img({
      src: imgUrl,
      alt: imageAlt,
      loading: eager ? 'eager' : 'lazy',
      class: 'mb-2 h-48 w-full object-cover',
    });
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
export function paginateData(list, currentPage, perPage) {
  return list.slice((currentPage - 1) * perPage, currentPage * perPage);
}
 
export function paginateIndexes({ listLength, currentPage, perPage }) {
  if (listLength === 0) return [];
  else if (listLength <= perPage) return [1];
  const total = Math.ceil(listLength / perPage);
  const center = [currentPage - 1, currentPage, currentPage + 1],
    filteredCenter = center.filter((p) => p > 1 && p < total),
    includeThreeLeft = currentPage === 5,
    includeThreeRight = currentPage === total - 4,
    includeLeftDots = currentPage > 5,
    includeRightDots = currentPage < total - 4;
 
  if (includeThreeLeft) filteredCenter.unshift(2);
  if (includeThreeRight) filteredCenter.push(total - 1);
 
  if (includeLeftDots) filteredCenter.unshift('...');
  if (includeRightDots) filteredCenter.push('...');
 
  return [1, ...filteredCenter, total];
}
export function clickToCopy(sku) {
  var copyText = document.getElementById(sku);
  navigator.clipboard.writeText(copyText.innerText);
  document.getElementById(sku).previousElementSibling.innerHTML='Copied!';
}
export function mouseEnter(msg) {
  var copyText = document.getElementById(msg);
  copyText.classList.remove('hidden');
}
export function mouseLeave(toolTipClassId,textId) {
  var copyText = document.getElementById(toolTipClassId);
  var btn = document.getElementById(textId);
  copyText.classList.add('hidden');
  if(!btn.matches(':hover') && !copyText.matches(':hover')){
    copyText.innerHTML='Click to Copy';
  } 
}
export function toolTip(textId,toolTipClassId,title,skuClass){
  let buttonDiv;
  let clickToCopyDiv;
  if(skuClass&&String(skuClass.trim!==null)){
    buttonDiv = button({ id: 'skubutton', class: 'product-tabs-productID outline-none md:flex-col' });
    clickToCopyDiv = div({ class: 'hidden w-auto  px-[3px] pt-[3px] bg-[#378189] text-center text-[white] rounded-t-lg text-sm absolute  -top-[23px] h-6 text-center text-xs break-keep text-wrap max-[768px]:top-[85px] font-normal', id: toolTipClassId }, 'Click to Copy');
  }
  else{
   buttonDiv = button({ class: 'relative text-black text-4xl pb-4 font-bold' });
   clickToCopyDiv = div({ class: 'hidden w-auto px-[3px] pt-[3px] bg-[#378189] text-center text-[white] rounded-t-lg text-sm absolute right-[10px] -top-[23px] h-6 text-center text-xs break-keep text-wrap font-normal', id: toolTipClassId }, 'Click to Copy');
  }

  const text = div({ id: textId, class: 'text-left border border-white hover:border-[#378189] rounded-lg ' }, title);
  buttonDiv.appendChild(clickToCopyDiv);
  buttonDiv.appendChild(text);
  text.addEventListener('click', () => {
    clickToCopy(textId);
  });
  text.addEventListener('mouseenter', () => {
    mouseEnter(toolTipClassId);
  });
  
  text.addEventListener('mouseleave', () => {
    mouseLeave(toolTipClassId,textId);
  });
  clickToCopyDiv.addEventListener('click', () => {
    clickToCopy(textId);
  });
  clickToCopyDiv.addEventListener('mouseenter', () => {
    mouseEnter(toolTipClassId);
  });
  clickToCopyDiv.addEventListener('mouseleave', () => {
    mouseLeave(toolTipClassId,textId);
  });
  
  return buttonDiv
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
  'pathways',
  'product-category',
  'blog-page',
  'product-detail',
  'search-results',
  'stories',
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
    // buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

function decorateStoryPage(main){
  const sectionEl = main.querySelector(':scope > div.section.story-info-container.social-media-container');
  if(sectionEl){
    const toBeRemoved = ['story-info-wrapper', 'social-media-wrapper'];
    const rightSideElements = div({class: 'w-full'});
    Array.from(sectionEl?.children).forEach((element) => {
      if (!toBeRemoved.includes(element.classList[0])) {
        rightSideElements.append(element);
      }
    });
    sectionEl?.append(rightSideElements);
  
    const divEl = div({class: 'ml-0 md:ml-8 min-w-56'});
    divEl.append(sectionEl?.querySelector('.story-info-wrapper'));
    divEl.append(sectionEl?.querySelector('.social-media-wrapper'));
    sectionEl?.prepend(divEl);
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

function toggleModalPopUp(videoLink, parentDiv) {
  if(parentDiv.closest('.image-full-width')) parentDiv.classList.toggle('lg:w-1/2');
  parentDiv.querySelector('.modal').classList.toggle('hidden');
  const iframe = parentDiv.querySelector('iframe');
  document.body.classList.toggle('overflow-hidden');
  if (iframe) {
    iframe.src = videoLink;
  }
}

function createModalPopUp(videoLink, parentDiv) {
  const modalPopUp = div(
    { class: 'modal hidden z-30 w-full h-full' },
    div(
      { class: 'modal-content bg-black m-auto p-10 max-[576px]:px-2.5 max-[767px]:px-3.5 w-full left-0 text-center' },
      span(
        { 
          class: 'bg-black close-btn float-right fixed icon icon-close right-[0px] top-[70px] cursor-pointer p-[10px] z-40', 
          onclick: () => {
            if(parentDiv.closest('.image-full-width')) parentDiv.classList.toggle('lg:w-1/2');
            modalPopUp.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
            const iframe1 = modalPopUp.querySelector('iframe');
            if (iframe1) {
              iframe1.src = '';
            }
          } 
        }
      ),
      div(
        { class: 'youtube-frame' },
        iframe({
          class: 'w-full h-full',
          src: videoLink,
          loading: 'lazy',
          style: 'border: 0; top: 0; left: 0; width: 100%; height: 100%; position: fixed; z-index: 30;',
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          allowfullscreen: true,
          scrolling: 'no',
          title: 'Content from Youtube',
          frameBorder: '0',
        }),
      ),

    ),
  );
  decorateIcons(modalPopUp);
  return modalPopUp;
}

function extractVideoId(url) {
  // Regular expression to extract video ID from YouTube URL
  const regex = /(?:youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/)([^\s&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function playAudio({src = '#'}) {
  return `<audio controls preload="metadata" class = "audio-play-bar" style="width: 100%;" src=${src}/>`;
}

function decorateVideo(main) {
  // Find the container with the video link
  const divContainers = main.querySelectorAll('.stories main .section');
  const type = getMetadata('pagetags');
  // Iterate over each container
  divContainers.forEach(divContainer => {
    if (type.includes('podcast')) {
      divContainer.querySelectorAll('.button-container a').forEach(link => {
        if (link.title === "video") {
          const embedHTML = `<div class="relative w-full h-full">
            <iframe src="${link.href}"
            style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: relative;" 
            allow="autoplay; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" 
            scrolling="no" title="Content from Youtube" loading="eager"></iframe>
          </div>`;
          const linkContainer = link.parentElement;
          linkContainer.classList.add('h-full');
          linkContainer.innerHTML = embedHTML;
        } else if (link.title === "audio") {
          const audioContainer = div({ class: 'flex flex-col' },
            p({ class: 'audio-label text-black no-underline ' }, link.text || ''),
            span({ class: 'audio-play-icon cursor-pointer w-14 icon icon-Play' }),
          );
          const parent = link.parentElement;
          parent.replaceChildren(audioContainer);
          const audioPlayer = div({ class: 'audio-player w-full mt-10 md:mb-2' });
          audioPlayer.innerHTML = playAudio({ src: link.href || '#' });
          decorateIcons(audioContainer);
          audioContainer.querySelector('.audio-play-icon')?.addEventListener('click', () => {
            audioContainer.replaceChildren(audioPlayer);
            const audioElement = audioPlayer.querySelector('audio');
            if (audioElement) audioElement.play();
          });
        }
      });
    } else if (type.includes('film')) {
      divContainer.querySelectorAll('.columns .button-container a').forEach(link => {
        if (link.title === "video") {
          // Extract video ID from the URL
          const videoId = extractVideoId(link.href);

          // Generate the poster image URL
          const posterImage = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

          // Create the container for the poster image and play button
          const playButtonHTML = `
            <div class="relative w-full h-full">
              <img src="${posterImage}" class="relative inset-0 w-full h-full object-cover" />
              <button id="play-button-${videoId}" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full p-4">
                <svg width="80" height="80" viewBox="0 0 126 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M46.2656 36.4219C47.9883 35.1914 50.4492 35.1914 52.1719 36.4219L87.6094 58.0781C89.332 59.0625 90.5625 61.0312 90.5625 63C90.5625 65.2148 89.332 67.1836 87.6094 68.168L52.1719 89.8242C50.4492 90.8086 47.9883 91.0547 46.2656 89.8242C44.2969 88.8398 43.3125 86.8711 43.3125 84.6562V41.3438C43.3125 39.375 44.2969 37.4062 46.2656 36.4219ZM126 63C126 97.9453 97.6992 126 63 126C28.0547 126 0 97.9453 0 63C0 28.3008 28.0547 0 63 0C97.6992 0 126 28.3008 126 63ZM63 5.8125C34.6992 5.8125 5.8125 34.9453 5.8125 63C5.8125 91.3008 34.6992 120.188 63 120.188C91.0547 120.188 120.188 91.3008 120.188 63C120.188 34.9453 91.0547 5.8125 63 5.8125Z" fill="white"/>
                </svg>
              </button>
            </div>
          `;
          const linkContainer = link.parentElement;
          linkContainer.innerHTML = playButtonHTML;

          if(linkContainer.closest('.image-full-width')){
            linkContainer.className = 'relative lg:absolute w-full lg:w-1/2 h-full object-cover lg:right-0 lg:bottom-6';
          }
            
          linkContainer.querySelector(`button[id="play-button-${videoId}"]`).addEventListener('click', (e) => {
            e.preventDefault();
            toggleModalPopUp(link.href, linkContainer);
          });

          // Create and append the modal popup
          const modalPopUp = createModalPopUp(link.href, linkContainer);
          linkContainer.appendChild(modalPopUp);
        }
      });
    }
  });
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
  decorateVideo(main);
  decorateStickyRightNav(main);
  decorateStoryPage(main);
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
  import('./sidekick.js').then(({ initSidekick }) => initSidekick());
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();


// Optimus Config - Start
window.OptimusConfig = {
  organizationId: 'danahernonproduction1892f3fhz',
  bearerToken: 'xx27ea823a-e994-4d71-97f6-403174ec592a'
};
