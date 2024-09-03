import { getProductResponse } from '../../scripts/search.js';
import {
  h3, p, div, span, hr, ul, li,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { getStarRating } from '../product-overview/product-overview.js';

function createSliderNavigation() {
  const prevButton = div(
    { class: 'slider-button size-8 absolute z-[1] left-[-3%] top-[44%] cursor-pointer prev hidden rotate-90' },
    span({ class: 'icon icon-chevron-down' }),
  );
  const nextButton = div(
    { class: 'slider-button size-8 absolute z-[1] right-[-3%] top-[44%] cursor-pointer next hidden -rotate-90' },
    span({ class: 'icon icon-chevron-down' }),
  );
  decorateIcons(prevButton);
  decorateIcons(nextButton);
  return { prevButton, nextButton };
}

function createSlides(productsArray) {
  const container = ul({
    class: 'slider-wrapper w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-transform duration-300 ease-in-out',
  });

  productsArray.forEach((product) => {
    const ratingContainer = div({ class: 'flex items-center mt-2 gap-x-1' });

    if (product.numberOfReviews > 0) {
      const rating = getStarRating(product.aggregatedRating, ratingContainer, 'size-5');
      rating.append(span({ class: 'text-sm text-[#65797c] tracking-wide' }, `(${product.numberOfReviews || 0} reviews)`));
      decorateIcons(ratingContainer);
    } else ratingContainer.classList.add('hidden');

    const slide = li(
      { class: 'h-auto size-full flex flex-col align-center text-left p-4 bg-white border border-[#0711121a] rounded hover:bg-[#0000000d] cursor-pointer' },
      p(
        { class: 'w-fit px-2 py-1 rounded text-xs text-emerald-800 border border-emerald-900 bg-[#edf6f7]' },
        product.category,
      ),
      p({ class: 'mt-4 text-xs text-[#65797c] font-medium font-sans lowercase' }, product.code),
      p({ class: 'mb-4 mt-2 text-sm text-black font-medium line-clamp-2' }, product.title),
      div(
        { class: 'mt-auto' },
        hr({ class: 'h-px border-b border-[#0711121a]' }),
        ratingContainer,
      ),
    );
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
      prevButton?.classList.add('hidden');
      nextButton?.classList.add('hidden');
    } else if (isMedium) {
      prevButton?.classList.add('hidden');
      nextButton?.classList.add('hidden');
    } else {
      prevButton?.classList.toggle('cursor-pointer', index > 0);
      prevButton?.classList.toggle('cursor-default', index === 0);
      prevButton?.classList.toggle('hidden', index === 0);

      const slidesToShow = isMobile ? 1 : 4;
      nextButton?.classList.toggle('cursor-pointer', index < totalSlides - slidesToShow);
      nextButton?.classList.toggle('cursor-default', index >= totalSlides - slidesToShow);
      nextButton?.classList.toggle('hidden', index >= totalSlides - slidesToShow);
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

  const sliderContainer = div({ class: 'slider-container w-full overflow-hidden py-5' });

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

    localStorage.setItem('products', JSON.stringify(productsArray));
  }

  function filterUniqueProducts(products) {
    return products.filter((product, index, self) => {
      const firstIndex = self.findIndex((productIndex) => productIndex.code === product.code);
      return index === firstIndex;
    });
  }

  productsArray = filterUniqueProducts(productsArray);

  const filteredProductsArray = productsArray.filter((product) => product.code !== productCode);

  if (filteredProductsArray.length > 0) {
    const recentlyHead = h3({ class: 'text-xl text-black' }, 'Recently Viewed');
    block.append(recentlyHead);

    const { prevButton = '', nextButton = '' } = filteredProductsArray.length > 4 ? createSliderNavigation() : '';

    const blogsCardContainer = createSlides(filteredProductsArray);
    sliderContainer.append(
      prevButton,
      blogsCardContainer,
      nextButton,
    );
    block.append(sliderContainer);

    const sliderWrapper = sliderContainer.querySelector('.slider-wrapper');
    if (!sliderWrapper) return;

    const dotsContainer = createDots(filteredProductsArray.length);
    sliderContainer.appendChild(dotsContainer);

    if (filteredProductsArray.length > 4) {
      initializeSlider(sliderContainer, sliderWrapper, prevButton, nextButton, dotsContainer);
    }
  }
}
