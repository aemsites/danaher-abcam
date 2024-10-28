import {
  div, span, a, h3, img, option, select,
  button,
} from './dom-builder.js';
import { getFullResponse } from './search.js';

let gSelectedApp = ''; let productCode;
let productTitle;

// To create slider images
function createImage(imageSrc) {
  return img({
    src: imageSrc,
    alt: 'img',
    class: 'image-sample w-full md:w-auto h-full md:h-64 object-contain m-auto',
  });
}

// To show image descriptions
function imageDescription(imageSrc, imagesJsonObj) {
  const leftImage = document.querySelector('.left-container');
  if (leftImage !== undefined && leftImage !== null) {
    leftImage.innerHTML = '';
    leftImage.appendChild(createImage(imageSrc));
    const imageDesc = document.querySelector('.image-description');
    const baseUrl = 'https://content.abcam.com/';
    const result = imageSrc.substring(baseUrl.length);
    const matchingObject = imagesJsonObj.find((obj) => obj.seoUrl === result);
    imageDesc.innerHTML = matchingObject.legend ? matchingObject.legend : '';
    imageDesc.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.95))';
  }
}

// Image Filter upon selecting the Application
function filterImage(imagesFilterSliderContainer, imagesJsonObj, selectedApp, imageSlider) {
  let filteredImagesArr = [];
  imagesFilterSliderContainer.querySelector(`.${imageSlider}`).innerHTML = '';
  gSelectedApp = selectedApp;

  if (selectedApp === undefined || selectedApp === '' || selectedApp === 'All Applications') filteredImagesArr = imagesJsonObj;
  else filteredImagesArr = imagesJsonObj.filter((obj) => obj.application === selectedApp);

  filteredImagesArr.forEach((image) => {
    const imageUrl = `https://content.abcam.com/${image.seoUrl}`;
    imagesFilterSliderContainer.querySelector(`.${imageSlider}`).append(
      div({ class: 'w-44 h-44 bg-gray-200 flex items-center justify-center m-2' }, createImage(imageUrl)),
    );
  });

  if (imageSlider === 'overlay-image-slider') {
    const imageUrl = `https://content.abcam.com/${filteredImagesArr[0].seoUrl}`;
    imageDescription(imageUrl, filteredImagesArr);
  }
}

// Application DropDown and Overlay
function applicationFilter(
  imagesFilterSliderContainer,
  imagesJsonObj,
  placement,
  overlayImageSlider,
) {
  const applicationSet = new Set();
  applicationSet.add('All Applications');
  imagesJsonObj?.forEach((imgObj) => {
    if (imgObj.application) applicationSet.add(imgObj.application);
  });
  filterImage(imagesFilterSliderContainer, imagesJsonObj, gSelectedApp, overlayImageSlider);
  applicationSet.forEach((app) => {
    imagesFilterSliderContainer.querySelector(`.${placement}`).append(
      option({ class: `${placement}-application`, value: app }, app),
    );
  });
  imagesFilterSliderContainer.querySelector(`.${placement}`).addEventListener('change', (event) => {
    filterImage(imagesFilterSliderContainer, imagesJsonObj, event.target.value, overlayImageSlider);
  });
  if (overlayImageSlider !== 'overlay-image-slider') {
    imagesFilterSliderContainer.querySelector(`.${overlayImageSlider}`).addEventListener('click', (event) => {
      const blackOverlay = div(
        { class: 'black-overlay fixed top-0 left-0 w-screen h-full overflow-y-scroll z-50 bg-black p-12 md:p-6 md:pt-4' },
        div(
          { class: 'flex flex-row items-center justify-center md:justify-end gap-x-16 md:gap-x-80' },
          a({ class: 'rounded-2xl text-white text-xs justify-center px-4 font-semibold py-2.5 my-4 leading-4 items-center tracking-wider leading-10 bg-[#378189] hover:bg-[#2A5F65]', href: origin.concat('/en-us/products/primary-antibodies/') }, 'Full product info'),
          button({ class: 'close-overlay px-5 py-1.5 font-semibold border border-white bg-black text-white rounded-3xl hover:bg-white hover:text-black' }, 'Exit'),
        ),
        div(
          { class: 'flex flex-col md:flex-row' },
          div({ class: 'left-container flex-none md:w-3/5' }, createImage(event.target.closest('.image-sample').src)),
          div(
            { class: 'right-container flex-none md:w-2/5' },
            div(
              { class: 'right-top-container flex flex-col' },
              div({ class: 'sku-container text-[#65797c] text-grey-20' }, productCode),
              div({ class: 'product-title text-white "mb-4 font-semibold text-2xl pr-7' }, productTitle),
              div({ class: 'image-description flex flex-col h-36 overflow-y-scroll text-body-small text-white mb-5 pr-7' }),
              div(
                { class: 'overlay-dropdown flex flex-row gap-x-3 items-center pb-2.5' },
                div({ class: 'overlay-dropdown-label text-white' }, 'Filter By'),
                select({ class: 'overlay-dropdown-filter px-1.5 py-1.5 border border-white bg-black text-white rounded-3xl text-xs flex flex-row items-center' }),
              ),
              div({ class: 'total-image text-white' }, '14 Images for All applications'),
              div(
                { class: 'flex flex-nowrap overflow-x-auto h-72 scrollbar-hide touch-pan-x select-none mt-2.5' },
                div({ class: 'overlay-image-slider flex px-2 flex-nowrap col-gap-5  transition-transform duration-500 ease-in-out' }),
              ),
            ),
          ),
        ),
      );
      blackOverlay.querySelector('.close-overlay')?.addEventListener('click', () => {
        document.querySelector('.black-overlay').remove();
      });
      blackOverlay.querySelector('.overlay-image-slider')?.addEventListener('click', (overLayImage) => {
        imageDescription(overLayImage.target.closest('.image-sample').src, imagesJsonObj);
      });
      applicationFilter(blackOverlay, imagesJsonObj, 'overlay-dropdown-filter', 'overlay-image-slider');
      if (gSelectedApp === '') blackOverlay.querySelector('.overlay-dropdown-filter').value = 'All Applications';
      else blackOverlay.querySelector('.overlay-dropdown-filter').value = gSelectedApp;
      document.body.append(blackOverlay);
      imageDescription(event.target.closest('.image-sample').src, imagesJsonObj);
      event.stopImmediatePropagation();
    });
  }
}

// Decorating Overview
function decorateOverview(
  quickLookDrawer,
  drawerBody,
  isotype,
  hostspecies,
  formulation,
  clonality,
  target,
  immunogenObject,
  imagesjson,
) {
  const overviewSection = div({ class: 'product-overview tab-item' });
  const imagesJsonObj = Object.keys(imagesjson).length !== 0 ? JSON.parse(imagesjson) : [];
  const { href } = window.location;
  const totalImagesCount = imagesJsonObj.length;

  // Top Section of Overview
  const imagesFilterSliderContainer = div(
    { class: 'images-filter-slider-container' },
    div(
      { class: 'images-filter-dropdown flex justify-between mb-3.5' },
      div(
        { class: 'flex flex-col mt-1' },
        h3({ class: 'font-semibold text-ui-small text-stroke-opaque' }, 'Filter by'),
        div(
          { class: 'ml-[2px]' },
          div(
            { class: 'mb-2' },
            select(
              { class: 'filter-dropdown pl-1.5 py-1.5 border border-black rounded-3xl text-xs flex flex-row items-center' },
            ),
          ),
          div({ class: 'font-semibold' }, `${totalImagesCount} Images for All applications`),
        ),
      ),
    ),
    div(
      { class: 'flex flex-nowrap overflow-x-auto scrollbar-hide touch-pan-x select-none mt-2.5 relative -left-2' },
      div(
        { class: 'images-slider flex px-2 flex-nowrap col-gap-5' },
        div({ class: 'gallery flex transition-transform duration-500 ease-in-out' }),
      ),
    ),
    div(
      { class: 'applications-reactive-species flex' },
      div(
        { class: 'flex flex-col mt-4 pr-3.5 w-1/2 text-body-xmedium text-black-0' },
        span({ class: 'font-semibold' }, 'Applications'),
      ),
      div(
        { class: 'reactive-species flex flex-col mt-4 pr-3.5 w-1/2 text-body-xmedium text-black-0' },
        span({ class: 'font-semibold' }, 'Reactive species'),
      ),
    ),
  );
  applicationFilter(imagesFilterSliderContainer, imagesJsonObj, 'filter-dropdown', 'gallery');

  // Overview Bottom part
  const overviewBottomPart = div(
    { class: 'overview-Bottom-part flex flex-wrap px-8 gap-x-20 pt-4 bg-white' },
    div(
      { class: 'w-2/5' },
      div(
        { class: 'pr-3 my-4 text-black-0 text-body-xmedium' },
        div(
          { class: 'font-semibold' },
          'Isotype',
          div({ class: 'font-light' }, isotype),
        ),
      ),
    ),
    div(
      { class: 'w-2/5' },
      div(
        { class: 'pr-3 my-4 text-black-0 text-body-xmedium' },
        div(
          { class: 'font-semibold' },
          'Host species',
          div({ class: 'font-light' }, hostspecies),
        ),
      ),
    ),
    div(
      { class: 'w-2/5' },
      div(
        { class: 'pr-3 my-4 text-black-0 text-body-xmedium' },
        div(
          { class: 'font-semibold' },
          'Storage buffer',
          div({ class: 'font-light' }, formulation),
        ),
      ),
    ),
    div(
      { class: 'w-2/5' },
      div(
        { class: 'pr-3 my-4 text-black-0 text-body-xmedium' },
        div(
          { class: 'font-semibold' },
          'Clonality',
          div({ class: 'font-light' }, clonality),
        ),
      ),
    ),
    div(
      { class: 'w-full' },
      div(
        { class: 'pr-3 my-4 text-black-0 text-body-xmedium' },
        div(
          { class: 'font-semibold' },
          'Immunogen',
          div({ class: 'font-light' }, immunogenObject),
        ),
      ),
    ),
  );
  const targetInfo = div(
    { class: 'flex flex-wrap px-8 pt-4 bg-white' },
    div(
      { class: 'w-full border-t' },
      div(
        { class: 'flex flex-col pr-3 my-4 text-black-0 text-body-xmedium' },
        div(
          { class: 'mb-3 font-semibold' },
          'Target data',
          a(
            { class: 'w-fit inline-flex items-center underline text-[#378189]', href },
            target,
            span({ class: 'icon icon-share-icon ml-2' }),
          ),
        ),
      ),
    ),
  );
  overviewSection.append(imagesFilterSliderContainer);
  overviewSection.append(overviewBottomPart);
  overviewSection.append(targetInfo);
  drawerBody.append(overviewSection);
}

// Publications
function decoratePublications(drawerBody) {
  const publicationsSection = div({ class: 'product-publications tab-item hidden' }, 'Publications');
  // const drawerBody = quickLookDrawer.querySelector('#drawer-quickLook .drawer-body');
  drawerBody.append(publicationsSection);
}

// Rewviews and Ratings
function decorateReviewsAndRatings(drawerBody) {
  const reviewsAndRatingsSection = div({ class: 'product-reviews tab-item hidden' }, 'Ratings and Reviews');
  // const drawerContent = quickLookDrawer.querySelector('#drawer-quickLook .drawer-body');
  drawerBody.append(reviewsAndRatingsSection);
}

// Tab Controller
function toggleTabs(event, quickLookDrawer) {
  const contentSections = quickLookDrawer.querySelectorAll('.tab-item');
  const selectedTab = event.target.closest('.product-tab')?.classList[0];
  contentSections.forEach((element) => {
    if (element.classList.contains(selectedTab)) element.classList.remove('hidden');
    else element.classList.add('hidden');
  });
  const allProductTabs = quickLookDrawer.querySelectorAll('.product-tab');
  allProductTabs.forEach((element) => {
    if (element.classList.contains(selectedTab)) element.classList.add('active', 'border-b-8', 'border-[#ff7223]');
    else element.classList.remove('active', 'border-b-8', 'border-[#ff7223]');
  });
}

// Creating Tabs on Drawer
function decorateTabs(quickLookDrawer) {
  const tabsContainer = div(
    { class: 'tabs-container flex flex-row' },
    div(
      { class: 'flex justify-end font-semibold md:border-none' },
      div({ class: 'product-overview product-tab active border-b-8 border-[#ff7223] min-h-pdpTabs first-of-type:ml-0 ml-5 mr-5 pt-1 pb-1 text-black-0 whitespace-nowrap cursor-pointer shadow-tab-active-thin' }, 'Overview'),
      div({ class: 'product-publications product-tab min-h-pdpTabs first-of-type:ml-0 ml-5 mr-5 pt-1 pb-1 text-black-0 whitespace-nowrap cursor-pointer' }, 'Publications'),
      div({ class: 'product-reviews product-tab min-h-pdpTabs first-of-type:ml-0 ml-5 mr-5 pt-1 pb-1 text-black-0 whitespace-nowrap cursor-pointer' }, 'Reviews'),
    ),
  );
  tabsContainer.addEventListener('click', (event) => {
    toggleTabs(event, quickLookDrawer);
  });
  quickLookDrawer.querySelector('.drawer-header-container').append(tabsContainer);
}

export default async function decorateProductQuickLook(
  quickLookDrawer,
  drawerBody,
  selectedProduct,
  slug,
) {
  productCode = selectedProduct.querySelector('.product-code').textContent;
  productTitle = selectedProduct.querySelector('.product-title').textContent;
  const { origin } = window.location;
  const headerContainer = div(
    { class: 'drawer-header-container flex flex-col items-start' },
    div(
      { class: 'text-code z-10 flex items-end text-left border-2 border-transparent' },
      span({ class: 'font-medium text-[#65797c] text-grey-20' }, productCode),
    ),
    div(
      { class: 'text-title z-10 flex items-end text-left border-2 border-transparent' },
      span({ class: 'font-semibold text-black-0 text-xl mt-1.5' }, productTitle),
    ),
    a({ class: 'rounded-2xl text-white text-xs justify-center px-4 font-semibold py-2.5 my-4 leading-4 items-center tracking-wider leading-10 bg-[#378189] hover:bg-[#2A5F65]', href: origin.concat(`/en-us/products/primary-antibodies/${slug}`) }, 'Full product info'),
  );
  quickLookDrawer.querySelector('.drawer-header')?.prepend(headerContainer);
  const response = await getFullResponse(slug);
  const {
    isotype = '', hostspecies = '', formulation = '', clonality = '', imagesjson = '', target = '', immunogenjson = {},
  } = response.results[0].raw;
  const immunogenObject = Object.keys(immunogenjson).length !== 0 ? JSON.parse(immunogenjson).sensitivity : '';
  gSelectedApp = '';
  decorateOverview(
    quickLookDrawer,
    drawerBody,
    isotype,
    hostspecies,
    formulation,
    clonality,
    target,
    immunogenObject,
    imagesjson,
  );
  decoratePublications(drawerBody);
  decorateReviewsAndRatings(drawerBody);
  decorateTabs(quickLookDrawer);
  drawerBody.querySelector('.gallery').addEventListener('click', applicationFilter);
  return quickLookDrawer;
}
