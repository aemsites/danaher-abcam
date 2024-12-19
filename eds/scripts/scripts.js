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
import { yetiToPWSurlsMap } from './pws.js';

const LCP_BLOCKS = ['hero', 'hero-video', 'carousel']; // add your LCP blocks to the list
let ytPlayer;

export function getCookie(name) {
  const cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    const cookie = cookieArr[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

export function getContentType(pageTags) {
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
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to?.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes]
      .map(({ nodeName }) => nodeName)
      .filter((attr) => attr.startsWith('data-aue-') || attr.startsWith('data-richtext-')),
  );
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
  'webinar',
  'guide',
  'guides-hub',
  'topic',
  'cross-sell-hub'
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

function decorateGuidePage(main) {
  const sectionEl = main.querySelector(':scope > div.section.chapter-links-container.sidelinks-container');
  if (sectionEl) {
    const toBeRemoved = ['chapter-links-wrapper', 'sidelinks-wrapper'];
    const rightSideElements = div({ class: 'w-full pr-0 lg:pr-8' });
    const sticky = div({ class: 'sticky top-0 space-y-12 pt-6' });
    const divEl = div({ class: 'ml-0 lg:ml-4 xl:ml-4 min-w-60 lg:max-w-72 flex flex-col gap-y-2 z-20' }, sticky);

    toBeRemoved.forEach((ele) => {
      const existingEl = sectionEl?.querySelector(`.${ele}`);
      sticky.append(existingEl);
    });
    Array.from(sectionEl?.children).forEach((element) => {
      if (!toBeRemoved.includes(element.classList[0])) {
        rightSideElements.append(element);
      }
    });
    sectionEl?.prepend(divEl);
    sectionEl?.append(rightSideElements);
  }
}

function decorateTopicPage(main) {
  const sectionEl = main.querySelector(':scope > div.section.related-articles-container.sidelinks-container');
  if (sectionEl) {
    const toBeRemoved = ['related-articles-wrapper', 'sidelinks-wrapper'];
    const rightSideElements = div({ class: 'w-full pr-0 lg:pr-8' });
    const sticky = div({ class: 'sticky top-0 space-y-12 pt-6' });
    const divEl = div({ class: 'ml-0 lg:ml-4 xl:ml-4 min-w-60 lg:max-w-72 flex flex-col gap-y-2 z-20' }, sticky);

    toBeRemoved.forEach((ele) => {
      const existingEl = sectionEl?.querySelector(`.${ele}`);
      sticky.append(existingEl);
    });
    Array.from(sectionEl?.children).forEach((element) => {
      if (!toBeRemoved.includes(element.classList[0])) {
        rightSideElements.append(element);
      }
    });
    sectionEl?.prepend(divEl);
    sectionEl?.append(rightSideElements);
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
    stickySection.classList.add('max-w-full');
    const stricyBlock = stickySection.querySelector('.sticky-right-navigation-wrapper')?.firstElementChild;
    stricyBlock?.classList.add('w-full');
    [...stickySection.children].forEach((child, index, childs) => {
      if (index !== childs.length - 1) divEl.append(child);
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

// Function to check if the video is playing
function checkVideoStatus() {
  const state = ytPlayer.getPlayerState();
  if (state === 1) {
    ytPlayer.pauseVideo();
  }
}

let currentlyPlayingAudio = null; // Global variable to track the currently playing audio
let previousPlayingAudio = null;

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
    previousPlayingAudio = null;
  }
}

// Function to get OG image
async function getOgImage() {
  const articles = await ffetch('/en-us/stories/query-index.json')
    .filter((item) => item.tags.includes('content-type/film'))
    .all();
  return articles;
}

// This function is to add the title to the audio if it not the link
function isValidUrl(string) {
  const urlPattern = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,}(:\d+)?(\/[^\s]*)?$/i;
  return urlPattern.test(string);
}

function decorateGenericVideo(main) {
  main.querySelectorAll(".section a[title='video']").forEach((link) => {
    const linkContainer = link.parentElement;
    linkContainer.classList.add('h-full');
    let embedURL;
    let showControls = 0;
    embedURL = link.href + '?controls=' + showControls;
    const embedHTML = `
      <div class="video-container relative w-full">
        <iframe src="${embedURL}"
          class="w-full aspect-video multi-player" 
          allow="autoplay; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" 
          scrolling="no" title="Content from Vimeo" loading="lazy"></iframe>
          <button id="play-button-${embedURL}" class="video-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50 rounded-full p-4 flex items-center justify-center w-[126px] h-[126px]">
            <span class="video-play-icon icon icon-video-play"></span>
          </button>
        </div>
      </div>`;
    linkContainer.innerHTML = embedHTML;
    decorateIcons(linkContainer, 50, 50);

    const playButton = document.getElementById(`play-button-${embedURL}`);
    const iframe = document.querySelector('.multi-player');
    const overlay = document.querySelector('.video-overlay');
    playButton.addEventListener('click', function () {
      let videoSrc = iframe.src;
      if (!videoSrc.includes('autoplay=1')) {
        videoSrc = videoSrc.replace('controls=0', 'controls=1');
        iframe.src = videoSrc.includes('?')
          ? videoSrc + '&autoplay=1'
          : videoSrc + '?autoplay=1';
        overlay.classList.add('hidden');
      }
    });
  });
  document.querySelectorAll('.video-container')?.forEach(() => {
    document.querySelectorAll('.video-script')?.forEach((ele) => {
      ele.classList.remove('hidden');
    });
  });
}

async function decorateVideo(main) {
  const template = getMetadata('template');
  if (template == "stories") {
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
              const embedURL = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
              const embedHTML = `
              <div class="relative w-full h-0 pt-[56.25%]">
                <iframe id="youtubePlayer" src="${embedURL}"
                class="absolute h-full w-full top-0 left-0 border-0"
                allow="autoplay; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture"
                scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
              </div>`;
              linkContainer.innerHTML = embedHTML;
              const scriptTag = document.createElement('script');
              scriptTag.src = 'https://www.youtube.com/iframe_api';
              const firstScriptTag = document.getElementsByTagName('script')[0];
              firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
              window.onYouTubeIframeAPIReady = function () {
                ytPlayer = new YT.Player('youtubePlayer', {
                  events: {
                    onStateChange: onPlayerStateChange,
                  },
                });
              };
              function onPlayerStateChange(event) {
                if (event.data === 1 || event.data === -1) {
                  currentlyPlayingAudio = previousPlayingAudio;
                  pauseCurrentAudio();
                }
              }
            } else {
              const embedHTML = `<div class="relative w-full h-full">
                <iframe src="${link.href}"
                class="relative w-full h-full border-0 top-0 left-0" 
                allow="autoplay; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" 
                scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
              </div>`;
              linkContainer.innerHTML = embedHTML;
            }
          } else if (link.title === 'audio') {
            const h3El = link.closest('div.grid')?.querySelector('h3');
            let linkTitle = isValidUrl(link.textContent) ? '' : link.textContent;
            const audioContainer = div(
              { class: 'flex flex-col' },
              p({ class: 'audio-label text-black no-underline ' }, linkTitle || ''),
              span({ class: 'checkStatus audio-play-icon cursor-pointer w-14 icon icon-Play' }),
              span({ class: 'checkStatus audio-play-pause-icon hidden cursor-pointer w-14 icon icon-play-pause' }),
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
                if (playIcon.closest('.columns')) {
                  playIcon.style.display = 'none';
                  pauseIcon.style.display = 'none';
                }
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
              if (previousPlayingAudio) previousPlayingAudio.pause();
              previousPlayingAudio = audioElement;
              checkVideoStatus();        
              isPlaying = true;
              updateIconVisibility();
            });

            audioElement.addEventListener('pause', () => {
              if (audioElement === previousPlayingAudio) previousPlayingAudio = null;
              isPlaying = false;
              updateIconVisibility();
            });

            updateIconVisibility();
            audioContainer.querySelector('.checkStatus')?.addEventListener('click', checkVideoStatus);

            playIcon.addEventListener('click', () => h3El.after(audioPlayer));
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
                <img src="${posterImage}" class="relative inset-0 w-full h-full object-cover" alt="More episodes in the Series" aria-label="More episodes in the Series"/>
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
            const publishDate = getMetadata('publishdate');
            const publishTime = getMetadata('published-time');
            const videoPublishDate = publishDate ? new Date(publishDate) : new Date(publishTime);
            if (firstVideo === 1) buildVideoSchema(videoPublishDate, posterImage, link.href);
            const modalPopUp = createModalPopUp(link.href, linkContainer);
            linkContainer.appendChild(modalPopUp);
          }
        });
      }
    });
  } else decorateGenericVideo(main);
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
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      setTimeout(() => {
        decorateVideo(main);
      }, 3000);
    }
  });
  observer.observe(main);
  decorateStickyRightNav(main);
  decorateStoryPage(main);
  decorateGuidePage(main);
  decorateTopicPage(main) 
  
}

export const applyClasses = (element, classes) => element?.classList.add(...classes.split(' '));

export function postFormAction(link = '') {
  // Show the download links (if any)
  document.querySelectorAll('.downloads-wrapper .downloads .icon-arrow-down-circle')?.forEach((downloadLink) => {
    downloadLink.classList.remove('hidden');
  });
  const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);;
  sessionStorage.setItem('ELOUQA', token);
  const mainEl = document.querySelector('main');
  if (mainEl && link) 
    decorateGenericVideo(mainEl);
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
export function formatTime(date) {
  const timeOptions = {
    hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/New_York', // ET format
  };
  const lastModifiedDate = new Date(Number(date) * 1000);
  const timeFormatted = new Intl.DateTimeFormat('en-us', timeOptions).format(lastModifiedDate);
  const timeWithET = timeFormatted ? `${timeFormatted} ET` : '';
  return timeWithET;
}

// Changes date format from Unix Epoch to date
export function formatDate(date) {
  const options = {
    month: 'long', day: '2-digit', year: 'numeric', timeZone: 'UTC',
  };
  const lastModifiedDate = new Date(Number(date) * 1000);
  const formattedDate = new Intl.DateTimeFormat('en-us', options).format(lastModifiedDate);
  const formatDate = formattedDate.replace(/,/g, '');
  return formatDate;
}

export function removeAbcamTitle(ogTitle){
  let title;
  if(ogTitle.indexOf('| abcam') > -1) {
    title = ogTitle.split('| abcam')[0];
  } else if(ogTitle.indexOf('| Abcam') > -1) {
    title = ogTitle.split('| Abcam')[0];
  } else {
    title = ogTitle;
  }
  return title;
}

// Check if OneTrust is accepted
export function isOTEnabled() {
  const otCookie = getCookie("OptanonConsent");
  if (typeof otCookie === "string") {
      return otCookie.includes("C0002:1")
  }
  return true;
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
  sort = 'ASC',
  dateRange = '',
}) {
  const tempArr = {};
  let startDate = new Date();
  let endDate = new Date();
  let appliedFilters = {}; // Keep track of applied filters

  if (dateRange !== '' && filterNames.includes(dateRange)) {
    lists.sort((listA, listB) => listB.publishDate - listA.publishDate);
    startDate = lists[0].publishDate;
    endDate = lists[lists.length - 1].publishDate;
    appliedFilters[dateRange] = { from: startDate, to: endDate }; // Track the date filter
  }
  lists.forEach((list) => {
    const parts = list?.tags?.split(', ');
    parts.forEach((part) => {
      const [key, value] = part.split('/');
      filterNames.forEach((name) => {
        if (key.includes(name)) {
          if (!(name in tempArr)) tempArr[name] = [];
          if (!tempArr[name].includes(value)) tempArr[name].push(value);
          if (name in tempArr && tempArr[name].length > 0) {
            sort.toUpperCase() === 'ASC'
              ? tempArr[name].sort()
              : tempArr[name].sort().reverse()
          }
        } else if (dateRange !== '' && filterNames.includes(dateRange)) {
          tempArr[dateRange] = dateRange;
        }
      });
    });
  });

  Object.keys(tempArr).forEach((categoryKey, categoryIndex) => {
    const listsEl = ul({ class: 'space-y-2 mt-2' });
    if (typeof tempArr[categoryKey] === 'object') {
      [...tempArr[categoryKey]].map((categoryValue, categoryIndex) => {  
        listsEl.append(li(
          categoryIndex >= limit ? { class: 'hidden' } : '',
          label(
            {
              class: 'w-full flex items-center gap-3 py-1 md:hover:bg-gray-50 text-sm font-medium cursor-pointer z-[5] relative',
              for: `${[categoryKey]}-${categoryValue}`,
            },
            input({
              class: 'accent-[#378189] z-[1] cursor-pointer',
              type: 'checkbox',
              name: [categoryKey],
              id: `${[categoryKey]}-${categoryValue}`,
              onchange: () => listActionHandler(categoryKey, categoryValue),
            }),
            categoryValue.replace(/-/g, ' ').replace(/^\w/, (char) => char.toUpperCase()),
          ),
        ));
      });
    } else if (typeof tempArr[categoryKey] === 'string') {
      const fromDate = input({
        class: 'bg-gray-50 border rounded-md p-2',
        type: 'date',
        id: 'date-from',
        value: new Date(startDate).toLocaleDateString(), // Ensure it's a valid date format for the input
        'data-start-value': new Date(startDate).toLocaleDateString(),
      });
      const toDate = input({
        class: 'bg-gray-50 border rounded-md p-2',
        type: 'date',
        id: 'date-to',
        value: new Date(endDate).toLocaleDateString(),
      });
      const dateFilterSection = li({ class: 'mt-2 flex flex-col gap-2' },
        label(
          { class: 'flex flex-col text-sm font-medium text-gray-700' },
          'From',
          fromDate,
        ),
        label(
          { class: 'flex flex-col text-sm font-medium text-gray-700' },
          'To',
          toDate,
        ),
        button({
          class: 'mt-3 text-sm font-medium text-black bg-white hover:!bg-gray-50 border border-px border-black px-4 py-2 rounded-full cursor-pointer',
          onclick: () => {
            const formatFromDate = new Date(fromDate.value).getTime();
            const formatToDate = new Date(toDate.value).getTime();

            // Ensure both from and to dates are selected before applying the filter
            if (formatFromDate && formatToDate) {
              listActionHandler('listed-within', { from: formatFromDate, to: formatToDate });
              appliedFilters[dateRange] = { from: formatFromDate, to: formatToDate }; // Track date filter
            }
          }
        }, 'Apply'),
      );
      listsEl.append(dateFilterSection);

      // Add "Clear filter" logic for the date filter (listed-within)
      if (appliedFilters[dateRange]) {
        listsEl.append(
          li(
            span({
              class: 'text-xs leading-5 font-medium text-[#378189] mt-1 cursor-pointer hover:underline underline-offset-1',
              onclick: () => {
                // Reset date range filters
                appliedFilters[dateRange] = null;
                listActionHandler('listed-within', {}); // Reset the date range filter action
                
                // Reset the from and to date inputs
                fromDate.value = new Date(startDate).toLocaleDateString(); // Reset to default
                toDate.value = new Date(endDate).toLocaleDateString(); // Reset to default
              },
            }, 'Clear filter'),
          ),
        );
      }
    }

    // Add "Show More" button if needed
    if (limit !== 0 && tempArr[categoryKey].length > limit && typeof tempArr[categoryKey] === 'object') {
      listsEl.append(
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
        {
          class: 'flex items-center justify-between my-0 cursor-pointer',
          onclick: () => {
            listsEl.parentElement.classList.toggle('hidden');
            listsEl.parentElement.previousElementSibling.children[1].classList.toggle('rotate-180');
          },
        },
        span({ class: 'text-base font-bold capitalize' }, categoryKey.replace('-', ' ')),
        span({ class: 'icon icon-chevron-down size-5 rotate-180' }),
      ),
      div(
        { class: 'flex flex-col-reverse [&_ul:has(:checked)+*]:block' },//conditional-wise css implementation
        listsEl,
        span({
          class: 'hidden text-xs leading-5 font-medium text-[#378189] mt-1 cursor-pointer hover:underline underline-offset-1',
          onclick: () => clearFilterHandler(categoryKey),
        }, 'Clear filters'),
      ),
    );

    if (listsEl.children.length > 0) element.append(accordionSection);
  });
}


export function createCard({
  titleImage = '',
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
        title && h3({ class: 'text-black font-medium mt-4 break-words line-clamp-4' }, title),
        description && p({ class: 'text-sm line-clamp-3' }, description),
        bodyEl,
      ),
      footerLink !== ''
        ? a({
          class: 'text-base leading-5 text-[#378189] font-bold p-2 pl-0 group-hover:tracking-wide group-hover:underline transition duration-700 mt-2',
          href: path,
        }, footerLink)
        : '',
      footerEl,
    ),
  );
  if (isStoryCard) {
    let minRead;
    switch (getContentType(tags)) {
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
      span({ class: 'capitalize font-normal text-sm text-[#65697C] font-["rockwell"]' }, `${getContentType(tags)}`),
      span({ class: 'font-normal text-sm text-[#65697C] font-["rockwell"]' }, `${minRead}`),
    );
  }
  return card;
}

/**
 * Fetches an HTML fragment from the given URL
 * @param {string} url
 * @returns the HTML text of the fragment
 */
export async function getFragmentFromFile(url) {
  const response = await fetch(url);
  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.error('error loading fragment details', response);
    return null;
  }
  const text = await response.text();
  if (!text) {
    // eslint-disable-next-line no-console
    console.error('fragment details empty', url);
    return null;
  }
  return text;
}

// Add hreflang tags

const currentPath = window.location.pathname;
const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}-[a-z]{2}\//, '/');
let pwsUrl = currentPath;
if (yetiToPWSurlsMap.hasOwnProperty(pathWithoutLocale)) {
  pwsUrl = yetiToPWSurlsMap[pathWithoutLocale];
}

const hrefAlt = document.createElement('link');
hrefAlt.rel = 'alternate';
hrefAlt.hreflang = 'en-us';
hrefAlt.href = 'https://www.abcam.com' + window.location.pathname;
document.head.appendChild(hrefAlt);

const hrefDefault = document.createElement('link');
hrefDefault.rel = 'alternate';
hrefDefault.hreflang = 'x-default';
hrefDefault.href = 'https://www.abcam.com' + window.location.pathname;
document.head.appendChild(hrefDefault);

const hrefChina = document.createElement('link');
hrefChina.rel = 'alternate';
hrefChina.hreflang = 'zh-cn';
hrefChina.href = 'https://www.abcam.cn' + pwsUrl;
document.head.appendChild(hrefChina);

const hrefJapan = document.createElement('link');
hrefJapan.rel = 'alternate';
hrefJapan.hreflang = 'ja-jp';
hrefJapan.href = 'https://www.abcam.co.jp' + pwsUrl;
document.head.appendChild(hrefJapan);

loadPage();

// Optimus Config - Start
window.OptimusConfig = {
  organizationId: 'danahernonproduction1892f3fhz',
  bearerToken: 'xx27ea823a-e994-4d71-97f6-403174ec592a',
};
