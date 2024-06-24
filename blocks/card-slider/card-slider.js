import {
  div, a, p,
  h5,
  h6,
  span,
} from '../../scripts/dom-builder.js';
import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';

async function fetchPostData() {
  try {
    const response = await fetch('/drafts/query-index.json');
    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    return [];
  }
}

function createAnniversaryBlogCard(post) {
  const card = div({ class: 'blog-card bg-white overflow-hidden m-2 flex-shrink-0 w-full sm:w-1/2 lg:w-1/3' });
  const image = div(
    { class: 'blog-card-content relative pb-2/3 absolute inset-0 w-full object-cover' },
    a({
      href: post.path,
      title: post.title,
    }, createOptimizedPicture(post.image, post.title)),
  );
  const textContainer = div({ class: 'slider-text py-8' });
  const type = h6(span({ class: 'text-gray-600 text-sm' }, post.category));
  const title = h5(
    { class: 'blog-title text-lg font-bold mb-2' },
    a({ href: post.path, class: 'hover:underline' }, post.title),
  );
  const description = p(
    { class: 'blog-description text-gray-700 text-base' },
    a({ href: post.path }, post.description),
  );
  textContainer.appendChild(type);
  textContainer.appendChild(title);
  textContainer.appendChild(description);

  card.appendChild(image);
  card.appendChild(textContainer);
  return card;
}

function createAnniversaryBlogs(posts) {
  const container = div({ class: 'slider-wrapper flex transition-transform duration-300 ease-in-out' });
  posts.forEach((post) => {
    const card = createAnniversaryBlogCard(post);
    container.appendChild(card);
  });
  return container;
}

function createSliderNavigation() {
  const prevButton = div({ class: 'slider-button prev bg-gray-100 text-black p-2 w-10 pl-3.5 rounded-full mx-2' }, '<');
  const nextButton = div({ class: 'slider-button next bg-gray-100 text-black p-2  w-10 pl-3.5 rounded-full mx-2' }, '>');
  return { prevButton, nextButton };
}

function initializeSlider(sliderContainer, wrapper, prevButton, nextButton) {
  let index = 0;
  const slides = wrapper.children;
  const totalSlides = slides.length;

  function updateSlider() {
    // const containerWidth = sliderContainer.offsetWidth;
    const slideWidth = slides[0].offsetWidth;

    wrapper.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  prevButton.addEventListener('click', () => {
    if (index > 0) {
      index -= 1;
      updateSlider();
    }
  });

  nextButton.addEventListener('click', () => {
    if (index < totalSlides - 1) {
      index += 1;
      updateSlider();
    }
  });

  window.addEventListener('resize', updateSlider);
  updateSlider();
}

function createHeroComponent(post) {
  const hero = div({ class: 'hero p-5 mb-5' });
  const image = div(
    { class: 'hero-image w-full bg-center mb-5' },
    a({
      href: post.path,
      title: post.title,
    }, div({ class: '[&_img]:w-full object-cover' }, createOptimizedPicture(post.image, post.title))),
  );
  hero.querySelector('picture > img')?.classList.add('w-full');
  const textContainer = div({ class: 'text-center' });
  const type = h6(span({ class: 'text-[#999] text-lg' }, post.category));
  const title = h5(
    { class: 'hero-title text-5xl font-bold mb-2' },
    a({ href: post.path }, post.title),
  );
  const description = p(
    { class: 'hero-description text-2xl font-normal text-black' },
    a({ href: post.path }, post.description),
  );
  textContainer.appendChild(type);
  textContainer.appendChild(title);
  textContainer.appendChild(description);

  hero.appendChild(image);
  hero.appendChild(textContainer);
  return hero;
}

export default async function decorate(block) {
  const postData = await fetchPostData();
  const wrapper = div({ class: 'content' });

  const sliderContainer = div({ class: 'slider-container relative w-full overflow-hidden py-5' });
  const { prevButton, nextButton } = createSliderNavigation();

  // Create "View All" option
  const viewAllContainer = div({ class: 'view-all-container flex gap-4 items-center mb-2' });
  const moreStories = div({ class: 'font-bold w-1/2 text-xl text-black-0 justify-start' }, 'More Stories');
  const viewAll = div({ class: 'flex w-1/2 justify-end' }, a({ href: '/all-blogs', class: 'view-all block  mr-16 font-bold text-xl text-black-0 hover:underline' }, 'View All'));
  viewAllContainer.appendChild(moreStories);
  viewAllContainer.appendChild(viewAll);
  viewAll.appendChild(prevButton);
  viewAll.appendChild(nextButton);

  const blogsContainer = div({ class: 'col recent-blogs' });
  const sortedResults = getMetadata('type');
  const filteredResults = postData.filter((item) => item.path.includes('/about-us/blogs/') && sortedResults === item.type);
  if (filteredResults.length) {
    // Create Hero Component
    const heroComponent = createHeroComponent(filteredResults[0]);
    wrapper.appendChild(heroComponent);

    // Remove the first element for the slider
    filteredResults.shift();

    const blogsCardContainer = createAnniversaryBlogs(filteredResults);
    sliderContainer.appendChild(viewAllContainer);
    sliderContainer.appendChild(blogsCardContainer);
  }
  blogsContainer.appendChild(sliderContainer);
  wrapper.appendChild(blogsContainer);
  block.innerText = '';
  block.appendChild(wrapper);

  // Initialize custom slider
  const sliderWrapper = sliderContainer.querySelector('.slider-wrapper');
  initializeSlider(sliderContainer, sliderWrapper, prevButton, nextButton);
}
