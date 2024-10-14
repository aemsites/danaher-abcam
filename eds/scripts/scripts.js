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
import {
  div, span, button, iframe, p, img, li, label, input, ul, a, h3,
} from './dom-builder.js';
// eslint-disable-next-line import/prefer-default-export
import { buildVideoSchema } from './schema.js';
import ffetch from './ffetch.js';

const LCP_BLOCKS = ['hero', 'hero-video', 'carousel']; // add your LCP blocks to the list

export function getStoryType(pageTags) {
  const tags = pageTags || getMetadata('pagetags');
  let type = null;
  tags?.split(',').forEach((tag) => {
    if (tag.includes('content-type')) {
      type = tag.split('/').pop();
    }
  });
  return type;
}

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
  return img({
    src: imageUrl,
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
  if (listLength <= perPage) return [1];
  const total = Math.ceil(listLength / perPage);
  const center = [currentPage - 1, currentPage, currentPage + 1];
  const filteredCenter = center.filter((p) => p > 1 && p < total);
  const includeThreeLeft = currentPage === 5;
  const includeThreeRight = currentPage === total - 4;
  const includeLeftDots = currentPage > 5;
  const includeRightDots = currentPage < total - 4;

  if (includeThreeLeft) filteredCenter.unshift(2);
  if (includeThreeRight) filteredCenter.push(total - 1);

  if (includeLeftDots) filteredCenter.unshift('...');
  if (includeRightDots) filteredCenter.push('...');

  return [1, ...filteredCenter, total];
}
export function clickToCopy(sku) {
  const copyText = document.getElementById(sku);
  navigator.clipboard.writeText(copyText.innerText);
  document.getElementById(sku).previousElementSibling.innerHTML = 'Copied!';
}
export function mouseEnter(msg) {
  const copyText = document.getElementById(msg);
  copyText.classList.remove('hidden');
}
export function mouseLeave(toolTipClassId, textId) {
  const copyText = document.getElementById(toolTipClassId);
  const btn = document.getElementById(textId);
  copyText.classList.add('hidden');
  if (!btn.matches(':hover') && !copyText.matches(':hover')) {
    copyText.innerHTML = 'Click to Copy';
  }
}
export function toolTip(textId, toolTipClassId, title, skuClass) {
  let buttonDiv;
  let clickToCopyDiv;
  if (skuClass && String(skuClass.trim !== null)) {
    buttonDiv = button({ id: 'skubutton', class: 'product-tabs-productID outline-none md:flex-col' });
    clickToCopyDiv = div({ class: 'hidden w-auto  px-[3px] pt-[3px] bg-[#378189] text-center text-[white] rounded-t-lg text-sm absolute  -top-[23px] h-6 text-center text-xs break-keep text-wrap max-[768px]:top-[85px] font-normal', id: toolTipClassId }, 'Click to Copy');
  } else {
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
    mouseLeave(toolTipClassId, textId);
  });
  clickToCopyDiv.addEventListener('click', () => {
    clickToCopy(textId);
  });
  clickToCopyDiv.addEventListener('mouseenter', () => {
    mouseEnter(toolTipClassId);
  });
  clickToCopyDiv.addEventListener('mouseleave', () => {
    mouseLeave(toolTipClassId, textId);
  });

  return buttonDiv;
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
  'webinars',
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

function decorateStoryPage(main) {
  const sectionEl = main.querySelector(':scope > div.section.story-info-container.social-media-container.sidelinks-container');
  if (sectionEl) {
    const toBeRemoved = ['story-info-wrapper', 'social-media-wrapper', 'sidelinks-wrapper'];
    const rightSideElements = div({ class: 'w-full' });

    Array.from(sectionEl?.children).forEach((element) => {
      if (!toBeRemoved.includes(element.classList[0])) {
        rightSideElements.append(element);
      }
    });
    sectionEl?.append(rightSideElements);

    const divEl = div({ class: 'ml-4 xl:ml-0 min-w-56 lg:max-w-72 flex flex-col gap-y-2' });
    divEl.append(sectionEl?.querySelector('.story-info-wrapper'));
    divEl.append(sectionEl?.querySelector('.social-media-wrapper'));
    divEl.append(sectionEl?.querySelector('.sidelinks-wrapper'));
    sectionEl?.prepend(divEl);
  }
}

/**
 * Decorates the sticky right navigation block from main element.
 * @param {Element} main The main element
 */
function decorateStickyRightNav(main) {
  const stickySection = main.querySelector('div.sticky-right-navigation-container');
  if (stickySection) {
    const divEl = div();
    stickySection.classList.add('flex');
    const stricyBlock = stickySection.querySelector('.sticky-right-navigation-wrapper')?.firstElementChild;
    stricyBlock?.classList.add('sticky', 'top-32', 'mt-4', 'ml-20', 'mr-[-8rem]');
    [...stickySection.children].forEach((child, index, childs) => {
      if (index !== childs.length - 1) {
        divEl.append(child);
      }
    });
    stickySection.prepend(divEl);
  }
}

function toggleModalPopUp(videoLink, parentDiv) {
  if (parentDiv.closest('.image-full-width')) parentDiv.classList.toggle('lg:w-1/2');
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
            if (parentDiv.closest('.image-full-width')) parentDiv.classList.toggle('lg:w-1/2');
            modalPopUp.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
            const iframe1 = modalPopUp.querySelector('iframe');
            if (iframe1) {
              iframe1.src = '';
            }
          },
        },
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

function playAudio({ src = '#' }) {
  return `<audio controls preload="metadata" class = "audio-play-bar" style="width: 100%;" src=${src}/>`;
}

let currentlyPlayingAudio = null; // Global variable to track the currently playing audio

function pauseCurrentAudio() {
  if (currentlyPlayingAudio) {
    // Pause the currently playing audio
    currentlyPlayingAudio.pause();
    // Find the audio container for the currently playing audio and update its play/pause icons
    const currentAudioContainer = currentlyPlayingAudio.parentElement;
    if (currentAudioContainer) {
      const playIcon = currentAudioContainer.querySelector('.audio-play-icon');
      const pauseIcon = currentAudioContainer.querySelector('.audio-play-pause-icon');
      if (playIcon && pauseIcon) {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
      }
    }
    currentlyPlayingAudio = null;
  }
}

// Function to get OG image
async function getOgImage() {
  const articles = await ffetch('/en-us/stories/query-index.json')
    .filter((item) => item.tags.includes('content-type/film'))
    .all();
  return articles;
}

async function decorateVideo(main) {
  const divContainers = main.querySelectorAll('.stories main .section');
  const type = getMetadata('pagetags');
  const filmThumbnails = await getOgImage();

  let firstVideo = 0;
  divContainers.forEach((divContainer) => {
    if (type.includes('podcast')) {
      divContainer.querySelectorAll('p a').forEach((link) => {
        if (link.title === 'video') {
          const linkContainer = link.parentElement;
          linkContainer.classList.add('h-full');
          const videoId = new URL(link.href).searchParams.get('v');
          if (videoId) {
            const embedURL = `https://www.youtube.com/embed/${videoId}`;
            const embedHTML = `
              <div class="relative w-full h-full">
                <iframe src="${embedURL}"
                class="relative w-full h-full border-0 top-0 left-0" 
                allow="autoplay; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" 
                scrolling="no" title="Content from Youtube" loading="eager"></iframe>
              </div>`;
            linkContainer.innerHTML = embedHTML;
          } else {
            const embedHTML = `<div class="relative w-full h-full">
              <iframe src="${link.href}"
              class="relative w-full h-full border-0 top-0 left-0" 
              allow="autoplay; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" 
              scrolling="no" title="Content from Youtube" loading="eager"></iframe>
            </div>`;
            linkContainer.innerHTML = embedHTML;
          }
        } else if (link.title === 'audio') {
          link.textContent = '';
          const audioContainer = div(
            { class: 'flex flex-col' },
            p({ class: 'audio-label text-black no-underline ' }, link.text || ''),
            span({ class: 'audio-play-icon cursor-pointer w-14 icon icon-Play' }),
            span({ class: 'audio-play-pause-icon hidden cursor-pointer w-14 icon icon-play-pause' }),
          );

          const parent = link.parentElement;
          parent.replaceChildren(audioContainer);
          const audioPlayer = div({ class: 'audio-player w-full md:mb-2' });
          audioPlayer.innerHTML = playAudio({ src: link.href || '#' });
          decorateIcons(audioContainer, 80, 80);

          let isPlaying = false;
          const playIcon = audioContainer.querySelector('.audio-play-icon');
          const pauseIcon = audioContainer.querySelector('.audio-play-pause-icon');
          const audioElement = audioPlayer.querySelector('audio');

          function updateIconVisibility() {
            if (isPlaying) {
              playIcon.classList.add('hidden');
              pauseIcon.classList.remove('hidden');
            } else {
              playIcon.classList.remove('hidden');
              pauseIcon.classList.add('hidden');
            }
          }

          playIcon.addEventListener('click', () => {
            if (audioElement) {
              pauseCurrentAudio(); // Pause any currently playing audio
              audioElement.play();
              audioContainer.appendChild(audioPlayer);
              currentlyPlayingAudio = audioElement; // Update the currently playing audio
              isPlaying = true;
              updateIconVisibility();
            }
          });

          pauseIcon.addEventListener('click', () => {
            if (audioElement) {
              audioElement.pause();
              isPlaying = false;
              updateIconVisibility();
            }
          });

          audioElement.addEventListener('play', () => {
            isPlaying = true;
            updateIconVisibility();
          });

          audioElement.addEventListener('pause', () => {
            isPlaying = false;
            updateIconVisibility();
          });

          updateIconVisibility();
        }
      });
    } else if (type.includes('film')) {
      divContainer.querySelectorAll('p a').forEach((link) => {
        if (link.title === 'video') {
          let episodeUrl = link.parentElement?.parentElement?.nextElementSibling?.querySelector('p a')?.pathname;
          if (episodeUrl === undefined) { episodeUrl = window.location.pathname; }
          firstVideo += 1;
          const videoId = extractVideoId(link.href);
          const thumbnailObj = filmThumbnails.find((obj) => obj.path === episodeUrl);
          const posterImage = thumbnailObj?.image;

          const playButtonHTML = `
            <div class="aspect-video relative w-full h-full">
              <img src="${posterImage}" class="relative inset-0 w-full h-full object-cover" />
              <button id="play-button-${videoId}" class="absolute inset-0 flex items-center justify-center bg-opacity-50 rounded-full p-4">
                <span class = "video-play-icon icon icon-video-play"/>
              </button>
            </div>
          `;
          const linkContainer = link.parentElement;
          linkContainer.innerHTML = playButtonHTML;
          decorateIcons(linkContainer, 50, 50);

          if (linkContainer.closest('.image-full-width')) {
            linkContainer.className = 'relative lg:absolute w-full lg:w-1/2 h-full object-cover lg:right-0 lg:bottom-6';
          }

          linkContainer.querySelector(`button[id="play-button-${videoId}"]`).addEventListener('click', (e) => {
            e.preventDefault();
            toggleModalPopUp(link.href, linkContainer);
          });
          if (firstVideo === 1) buildVideoSchema(posterImage, link.href);
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

export const applyClasses = (element, classes) => element?.classList.add(...classes.split(' '));

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
  // import('./sidekick.js').then(({ initSidekick }) => initSidekick());
}

/**
 * Returns the valid public url with or without .html extension
 * @param {string} url
 * @returns new string with the formatted url
 */
export function makePublicUrl(url) {
  const isProd = window.location.hostname.includes('abcam.com');
  try {
    const newURL = new URL(url, window.location.origin);
    if (isProd) {
      if (newURL.pathname.endsWith('.html')) {
        return newURL.pathname;
      }
      newURL.pathname += '.html';
      return newURL.pathname;
    }
    if (newURL.pathname.endsWith('.html')) {
      newURL.pathname = newURL.pathname.slice(0, -5);
      return newURL.pathname;
    }
    return newURL.pathname;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Invalid URL:', error);
    return url;
  }
}

/**
 * Set the JSON-LD script in the head
 * @param {*} data
 * @param {string} name
 */
export function setJsonLd(data, name) {
  const existingScript = document.head.querySelector(`script[data-name="${name}"]`);
  if (existingScript) {
    existingScript.innerHTML = JSON.stringify(data);
    return;
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';

  script.innerHTML = JSON.stringify(data);
  script.dataset.name = name;
  document.head.appendChild(script);
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

export function createFilters({
  lists = [],
  filterNames = [],
  element,
  listActionHandler = () => {},
  clearFilterHandler = () => {},
  limit = 6,
}) {
  const output = filterNames.reduce((obj, key) => {
    obj[key] = new Set();
    return obj;
  }, {});

  lists.forEach((list) => {
    const parts = list?.tags?.split(', ');
    parts.forEach((part) => {
      const [key, value] = part.split('/');
      filterNames.forEach((name) => {
        if (key.includes(name)) {
          output[name].add(value);
        }
      });
    });
  });

  Object.keys(output).forEach((categoryKey, categoryIndex) => {
    const lists = ul({ class: 'space-y-2 mt-2' });
    [...output[categoryKey]].map((categoryValue, categoryIndex) => {
      lists.append(li(
        categoryIndex >= limit ? { class: 'hidden' } : '',
        label(
          {
            class: 'w-full flex items-center gap-3 py-1 md:hover:bg-gray-50 text-sm font-medium cursor-pointer',
            for: `${[categoryKey]}-${categoryValue}`,
          },
          input({
            class: 'accent-[#378189]',
            type: 'checkbox',
            name: [categoryKey],
            id: `${[categoryKey]}-${categoryValue}`,
            onchange: () => {
              listActionHandler(categoryKey, categoryValue);
            },
          }),
          categoryValue.replace(/-/g, ' ').replace(/^\w/, (char) => char.toUpperCase()),
        ),
      ));
    });

    // Add "Show More" button if needed
    if (limit !== 0 && output[categoryKey].length > limit) {
      lists.append(
        li(
          span(
            {
              class: 'text-sm text-[#378189] font-normal mt-2 cursor-pointer hover:underline underline-offset-1',
              onclick: (event) => {
                const parent = event.target.closest('ul');
                const hiddenItems = parent.querySelectorAll('.hidden');
                const toggle = hiddenItems.length > 0;

                parent.querySelectorAll('li').forEach((child, childIndex) => {
                  if (childIndex >= limit && childIndex !== parent.children.length - 1) {
                    child.classList.toggle('hidden', !toggle);
                  }
                });
                event.target.innerText = `Show ${toggle ? 'Less' : 'More'}`;
              },
            },
            'Show More',
          ),
        ),
      );
    }

    const accordionSection = div(
      { class: `flex flex-col px-6 py-4 border-b md:border border-gray-300 ${categoryIndex > 0 ? 'md:mt-4' : ''} md:rounded-xl [&_div:not(.hidden)~p]:mb-3 [&_div:not(.hidden)~p_.icon]:rotate-180` },
      p(
        { class: 'flex items-center justify-between my-0' },
        span({ class: 'text-base font-bold capitalize' }, categoryKey.replace('-', ' ')),
        span({
          class: 'icon icon-chevron-down size-5 cursor-pointer',
          onclick: () => {
            lists.parentElement.classList.toggle('hidden');
            lists.parentElement.previousElementSibling.children[1].classList.toggle('rotate-180');
          },
        }),
      ),
      div(
        { class: 'flex flex-col-reverse [&_ul:has(:checked)+*]:block' },
        lists,
        span({
          class: 'hidden text-xs leading-5 font-medium text-[#378189] mt-1 cursor-pointer hover:underline underline-offset-1',
          onclick: () => clearFilterHandler(categoryKey),
        }, 'Clear filters'),
      ),
    );

    if (lists.children.length > 0) element.append(accordionSection);
  });
}

export function createCard({
  titleImage,
  title = '',
  description = '',
  footerLink = '',
  bodyEl = '',
  footerEl = '',
  path = '/',
  tags = '',
  time = '',
  isStoryCard = false,
}) {
  const card = li(
    {
      class: 'card relative overflow-hidden bg-transparent',
      title,
    },
    a(
      { class: 'size-full flex flex-col justify-center group', href: path },
      titleImage,
      div(
        { class: 'flex-1' },
        h3({ class: 'text-black font-medium mt-4 break-words line-clamp-4' }, title),
        p({ class: 'line-clamp-3' }, description),
        bodyEl,
      ),
      footerLink !== ''
        ? a({
          class: 'text-base leading-5 text-[#378089] font-bold p-2 pl-0 group-hover:tracking-wide group-hover:underline transition duration-700 mt-2',
          href: path,
        }, footerLink)
        : '',
      footerEl,
    ),
  );
  if (isStoryCard) {
    let minRead;
    switch (getStoryType(tags)) {
      case 'podcast':
        minRead = ` | ${time} mins listen`;
        break;
      case 'film':
        minRead = ` | ${time} mins watch`;
        break;
      default:
        minRead = ` | ${time} mins read`;
        break;
    }
    card.querySelector('.flex-1').prepend(
      span({ class: 'capitalize font-normal text-sm' }, `${getStoryType(tags)}`),
      span({ class: 'font-normal text-sm' }, `${minRead}`),
    );
  }
  return card;
}

/**
 * Datalayer Function to get the 'page' object
 */
function getDLPage() {
  const page = {
    type: 'Content',
  };
  const path = window.location.pathname;
  if (path.includes('/en-us/stories')) {
    page.event = 'Virtual Page View';
    page.type = 'Stories';
    page.path = path;
    page.subType = null;
  }
  return page;
}

// Datalayer Start
window.dataLayer = [];
window.dataLayer.push({
  page: getDLPage(),
});
// Datalayer End

loadPage();

// Optimus Config - Start
window.OptimusConfig = {
  organizationId: 'danahernonproduction1892f3fhz',
  bearerToken: 'xx27ea823a-e994-4d71-97f6-403174ec592a',
};
