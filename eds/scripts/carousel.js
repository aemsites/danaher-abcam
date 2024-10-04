import { debounce } from './scripts.js';

export default function Carousel({
  wrapperEl,
  mainEl,
  previousElAction,
  nextElAction,
  onChange,
  delay = 5000,
  isAutoPlay = true,
}) {
  const wrapper = document.getElementById(wrapperEl);
  if (!wrapper) throw new Error('Carousel not initialised properly');
  else {
    const carousel = wrapper?.querySelector(mainEl);
    const carouselChildrens = [...carousel.children];
    const originalSlidesCount = carouselChildrens.length;
    if (originalSlidesCount <= 1) return;
    let isDragging = false;
    let startX;
    let startScrollLeft;
    let timeoutId;

    const firstCardWidth = carousel.querySelector('.carousel-slider').offsetWidth;
    // Get the number of cards that can fit in the carousel at once
    const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    const copiesLastThree = carouselChildrens.slice(-cardPerView).reverse();
    copiesLastThree.map((card) => {
      const clonedCard = card.cloneNode(true);
      carousel.prepend(clonedCard);
      return null;
    });
    // Insert copies of the first few cards to end of carousel for infinite scrolling
    const copiesFirstThree = carouselChildrens.slice(0, cardPerView);
    copiesFirstThree.map((card) => {
      const clonedCard = card.cloneNode(true);
      carousel.append(clonedCard);
      return null;
    });
    // Add event listeners for the arrow buttons to scroll the carousel left and right
    const totalItems = originalSlidesCount; // Count original slides and clones
    wrapper.querySelector(previousElAction)?.addEventListener('click', () => {
      const value = firstCardWidth;
      carousel.scrollLeft -= value;
      if (onChange) {
        onChange({ target: carousel.children[Math.floor(carousel.scrollLeft / value) - 1] });
      }
    });
    wrapper.querySelector(nextElAction)?.addEventListener('click', () => {
      const value = firstCardWidth;
      carousel.scrollLeft += value;
      // Calculate the current scroll position
      const currentScrollLeft = carousel.scrollLeft;
      // Calculate nextIndex based on current scroll position
      const nextIndex = Math.floor(currentScrollLeft / value);
      // Use modulo to wrap around if reaching the end
      const nextItemIndex = nextIndex % totalItems;
      // If currentScrollLeft exceeds total width, reset
      if (nextItemIndex < nextIndex) {
        carousel.scrollLeft = value; // Reset to first item
      }
      // Call onChange with the updated target
      if (onChange) {
        onChange({ target: carousel.children[nextItemIndex] });
      }
    });
    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.remove('scroll-smooth', 'snap-x', 'snap-mandatory');
      carousel.classList.add('dragging', 'snap-none', 'scroll-auto');
      // Records the initial cursor and scroll position of the carousel
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };
    const dragging = (e) => {
      if (!isDragging) return; // if isDragging is false return from here
      // Updates the scroll position of the carousel based on the cursor movement
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };
    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove('dragging', 'snap-none', 'scroll-auto');
      carousel.classList.add('scroll-smooth', 'snap-x', 'snap-mandatory');
    };
    const autoPlay = () => {
      // Return if window is smaller than 800 or isAutoPlay is false
      if (window.innerWidth < 800 || !isAutoPlay) return;
      clearTimeout(timeoutId);
      // Autoplay the carousel after every {delay} ms
      const value = firstCardWidth;
      timeoutId = setTimeout(() => {
        if (carousel.scrollLeft + value >= carousel.scrollWidth) {
          carousel.scrollLeft = value; // Reset to the first card if reached the end
        }
        autoPlay(); // Recursively call autoPlay
      }, delay);
    };
    const infiniteScroll = debounce(() => {
      const value = firstCardWidth;
      // [ ELSE IF ] the carousel is at the end, scroll to the beginning
      const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
      if (carousel.scrollLeft <= 10) {
        // Jump to the end
        carousel.scrollLeft = maxScrollLeft;
      }
      if (Math.ceil(carousel.scrollLeft) >= maxScrollLeft) {
        // Jump to the beginning
        carousel.scrollLeft = value; // Reset to first item
      }
      // Update the visible item based on the current scroll position
      const currentScrollLeft = carousel.scrollLeft;
      //const totalItems = originalSlidesCount;
      const currentIndex = Math.floor(currentScrollLeft / value) % totalItems;
      if (onChange) {
        onChange({ target: carousel.children[currentIndex] });
      }
      // Clear existing timeout & start autoplay if mouse is not hovering over carousel
      clearTimeout(timeoutId);
      if (wrapper && !wrapper.matches(':hover') && isAutoPlay) {
        autoPlay();
      }
    });
    if (isAutoPlay) autoPlay();
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('mousemove', dragging);
    wrapper.addEventListener('mouseup', dragStop);
    carousel.addEventListener('scroll', infiniteScroll);
    if (isAutoPlay) wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
    if (isAutoPlay) wrapper.addEventListener('mouseleave', autoPlay);
  }
}
