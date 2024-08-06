import { getProductResponse } from '../../scripts/search.js';
import {
  h3, h6, p, button, div, span, hr, ul, li,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { getStarRating } from '../product-overview/product-overview.js';

function createSliderNavigation() {
  const prevButton = div(
    { class: 'slider-button absolute z-[1] left-[-3%] top-[44%] cursor-pointer prev hidden rotate-90' },
    span({ class: 'icon icon-chevron-down' }),
  );
  const nextButton = div(
    { class: 'slider-button absolute z-[1] right-[-3%] top-[44%] cursor-pointer next hidden rotate-[270deg]' },
    span({ class: 'icon icon-chevron-down' }),
  );
  decorateIcons(prevButton);
  decorateIcons(nextButton);
  return { prevButton, nextButton };
}

function createSlides(productsArray) {
  const container = div({
    class: 'slider-wrapper flex gap-4 group transition-transform duration-300 ease-in-out w-full pl-[5px] pr-[55px] max-[768px]:pl-[7px] max-[768px]:pr-[8px] max-[848px]:pr-[15px] max-[1024px]:pr-[10px] max-[1215px]:pr-[15px] max-[1280px]:pr-[8px]',
  });

  productsArray.forEach((product) => {
    const slide = div({
      class: 'slide-item flex-none bg-white w-full lg:w-[49%] xl:w-[25%]',
    });

    const ratingContainer = div({ class: 'flex items-center mt-2 gap-x-1' });

    if (product.numberOfReviews > 0) {
      const rating = getStarRating(product.aggregatedRating, ratingContainer, 'w-4');
      rating.append(span({ class: 'text-xs text-[#65797c]' }, `(${product.numberOfReviews || 0} reviews)`));
      decorateIcons(ratingContainer);
    } else {
      ratingContainer.classList.add('hidden');
    }

    const recentlyContainer = button(
      {
        class: 'h-full flex flex-col align-center p-4 bg-white w-full border border-interactive-grey-transparent-active rounded-4px hover:bg-[#0000000d] cursor-pointer text-left',
      },
      div(
        { class: 'h-5/6' },
        div(
          { class: 'flex gap-2' },
          p({ class: 'w-fit px-2 py-1 rounded-4px text-xs font-semibold bg-[#edf6f7] text-[#2c656b] border-blue-70 border' }, `${product.category}`),
        ),
        div(
          { class: 'flex flex-col font-semibold' },
          h6({ class: 'mt-4 text-xs text-[#65797c]' }, `${product.code}`),
          p({ class: 'mb-4 mt-2 text-sm text-black-0' }, `${product.title}`),
        ),
      ),
      div(
        { class: 'rating-section h-1/5 w-full' },
        hr({ class: 'h-[1px] bg-interactive-grey-active my-0' }),
        ratingContainer,
      ),
    );

    slide.appendChild(recentlyContainer);
    container.appendChild(slide);
  });

  return container;
}

function createDots(totalSlides) {
  const dotsContainer = ul({ class: 'dots flex justify-center gap-2 mt-8' });
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isTablet = window.matchMedia('(min-width: 769px) and (max-width: 1024px)').matches;

  if (totalSlides <= 1) {
    dotsContainer.classList.add('hidden');
    return dotsContainer;
  }

  let totalDots;
  if (isTablet) {
    totalDots = totalSlides;
  } else {
    totalDots = isMobile ? totalSlides : Math.ceil((totalSlides - 4) / 1) + 1;
  }

  Array.from({ length: totalDots }).forEach(() => {
    const dot = li({ class: 'dot w-[10px] h-[10px] rounded-full bg-gray-400 cursor-pointer' });
    dotsContainer.appendChild(dot);
  });

  return dotsContainer;
}

function updateDots(dotsContainer, currentIndex) {
  const dots = Array.from(dotsContainer.children);

  dots.forEach((dot) => {
    dot.classList.remove('bg-gray-600');
    dot.classList.add('bg-gray-400');
  });

  if (dots[currentIndex]) {
    dots[currentIndex].classList.add('bg-gray-600');
  }
}

function initializeSlider(sliderContainer, wrapper, prevButton, nextButton, dotsContainer) {
  let index = 0;
  const totalSlides = wrapper.children.length;

  function updateSlider() {
    if (totalSlides === 0) return;

    let slideWidth;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const isTablet = window.matchMedia('(min-width: 769px) and (max-width: 1024px)').matches;
    const isMedium = window.matchMedia('(min-width: 1025px) and (max-width: 1280px)').matches;

    if (isMobile) {
      slideWidth = wrapper.clientWidth / 1;
    } else if (isTablet) {
      slideWidth = wrapper.clientWidth / 2;
    } else if (isMedium) {
      slideWidth = wrapper.clientWidth / 3;
    } else {
      slideWidth = wrapper.clientWidth / 4;
    }

    if (index === 0) {
      wrapper.style.transform = 'translateX(0)';
    } else {
      wrapper.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    const isSingleSlideMobile = isMobile && totalSlides <= 1;
    const isFewSlidesDesktop = !isMobile && totalSlides <= 4;

    if (isSingleSlideMobile || isFewSlidesDesktop || isMobile || isTablet) {
      prevButton.classList.add('hidden');
      nextButton.classList.add('hidden');
    } else if (isMedium) {
      prevButton.classList.add('hidden');
      nextButton.classList.add('hidden');
    } else {
      prevButton.classList.toggle('cursor-pointer', index > 0);
      prevButton.classList.toggle('cursor-default', index === 0);
      prevButton.classList.toggle('hidden', index === 0);

      const slidesToShow = isMobile ? 1 : 4;
      nextButton.classList.toggle('cursor-pointer', index < totalSlides - slidesToShow);
      nextButton.classList.toggle('cursor-default', index >= totalSlides - slidesToShow);
      nextButton.classList.toggle('hidden', index >= totalSlides - slidesToShow);
    }

    updateDots(dotsContainer, index);
  }

  prevButton.addEventListener('click', () => {
    if (index > 0) {
      index -= 1;
      updateSlider();
      initializeSlider();
    }
  });

  nextButton.addEventListener('click', () => {
    if (index < totalSlides - (window.matchMedia('(max-width: 768px)').matches ? 1 : 4)) {
      index += 1;
      updateSlider();
      initializeSlider();
    }
  });

  Array.from(dotsContainer.children).forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      index = dotIndex;
      updateSlider();
    });
  });

  window.addEventListener('resize', () => {
    updateSlider();
  });

  updateSlider();
}

export default async function decorate(block) {
  const response = await getProductResponse();
  const responseData = response[0].raw;

  block.classList.add('relative');
  block.classList.add('m-auto', 'w-[87%]', 'max-[768px]:w-[100%]');

  const sliderContainer = div({ class: 'slider-container w-full overflow-hidden py-5' });
  const { prevButton, nextButton } = createSliderNavigation();

  sliderContainer.appendChild(prevButton);
  sliderContainer.appendChild(nextButton);

  let productsArray = JSON.parse(localStorage.getItem('products')) || [];

  const productCategory = responseData.categorytype;
  const productCode = responseData.productcode ? responseData.productcode.trim() : '';
  const productTitle = responseData.title ? responseData.title : '';
  let agrRating = null;
  let numOfReviews;

  const reviewSummary = responseData.reviewssummaryjson
    ? JSON.parse(responseData.reviewssummaryjson)
    : null;

  if (reviewSummary) {
    agrRating = reviewSummary.aggregatedRating;
    numOfReviews = reviewSummary.numberOfReviews;
  }

  const existingProduct = productsArray.find((product) => product.code === productCode);

  if (!existingProduct) {
    productsArray.push({
      category: productCategory,
      code: productCode,
      title: productTitle,
      aggregatedRating: agrRating,
      numberOfReviews: numOfReviews,
    });

    localStorage.setItem(
      'products',
      JSON.stringify(productsArray),
    );
  }

  function findFirstIndex(product, self) {
    return self.findIndex((productIndex) => productIndex.code === product.code);
  }

  function isFirstOccurrence(product, index, self) {
    const firstIndex = findFirstIndex(product, self);
    return index === firstIndex;
  }

  function filterUniqueProducts(products) {
    return products.filter((product, index, self) => isFirstOccurrence(product, index, self));
  }

  productsArray = filterUniqueProducts(productsArray);

  const filteredProductsArray = productsArray.filter((product) => product.code !== productCode);

  if (filteredProductsArray.length > 0) {
    const recentlyHead = h3({ class: 'text-[1.3125rem] text-[#2a3c3c]' }, 'Recently Viewed');
    block.append(recentlyHead);

    const blogsCardContainer = createSlides(filteredProductsArray);
    sliderContainer.appendChild(blogsCardContainer);
    block.appendChild(sliderContainer);

    const sliderWrapper = sliderContainer.querySelector('.slider-wrapper');
    if (!sliderWrapper) {
      return;
    }

    const dotsContainer = createDots(filteredProductsArray.length);
    sliderContainer.appendChild(dotsContainer);

    initializeSlider(sliderContainer, sliderWrapper, prevButton, nextButton, dotsContainer);
  }
}
