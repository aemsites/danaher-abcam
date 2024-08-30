import { createOptimizedPicture } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  const imageAspectRatio = 1.7778;
  const isBottomImg = block.classList.contains('md-bottom-image');
  const isTopImg = block.classList.contains('md-top-image');

  // setup image columns and other decorations
  let img;
  [...block.children].forEach((row) => {
    if (block.className.includes('columns-2-cols')) {
      block.classList.add(...'h-full flex flex-col md:flex-row'.split(' '));
      if (window.location.pathname.includes('/en/stories/')) {
        block.firstElementChild?.classList.add(...'container max-w-7xl mx-auto gap-x-12 grid grid-cols-2'.split(' '));
      } else {
        row.classList.add(...'flex lg:flex-row gap-8'.split(' '));
      }
    }
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        img = pic;
        const moreStoriesImg = pic.querySelector('img');
        if (moreStoriesImg && window.location.pathname.includes('/en/stories/')) {
          moreStoriesImg.classList.add(...'absolute w-1/2 h-full object-cover right-0 bottom-0'.split(' '));
          // eslint-disable-next-line func-names
          moreStoriesImg.onerror = function () {
            moreStoriesImg.width = this.width;
            moreStoriesImg.height = Math.floor(this.width / imageAspectRatio);
          };
        } else {
          const optimizedPic = createOptimizedPicture(moreStoriesImg.src, 'img-alt', false, [{ width: '750' }]);
          pic.replaceWith(optimizedPic);
        }
      }
      if (window.location.pathname.includes('/en/stories/')) {
        col.classList.add(...'my-auto md:pr-16'.split(' '));
        col.querySelectorAll('h1').forEach((ele) => {
          ele.classList.add(...'font-bold text-4xl mb-6'.split(' '));
        });
        col.querySelectorAll('p').forEach((ele) => {
          ele.classList.add(...'font-normal text-xl mb-2'.split(' '));
        });
      } else {
        col.classList.add('h-full');
      }
      // Image Position
      if (isBottomImg) {
        row.classList.add(row.firstElementChild?.querySelector('picture') ? 'flex-col-reverse' : 'flex-col');
      } else if (isTopImg) {
        row.classList.add(row.firstElementChild?.querySelector('picture') ? 'flex-col' : 'flex-col-reverse');
      } else {
        row.classList.add('flex-col');
      }
      if (window.location.pathname.includes('/en/stories/')) {
        col.parentElement.classList.add('w-full');
      } else {
        if (!col.querySelector('picture')) {
          col.classList.add('flex', 'flex-col');
        } else {
          col.classList.add(...'max-w-96 grow-0 shrink-0'.split(' '));
        }
      }
      col.querySelectorAll('.button-container').forEach((anchorTag) => {
        anchorTag.classList.add('text-[#378189]', 'underline');
      });
      if (col.querySelector('em')?.querySelector('a')) {
        const moreStoriesDiv = div({ class: 'more-stories rounded-3xl bg-[#378189] px-6 py-2.5 w-72 text-white hover:bg-[#2A5F65]' });
        moreStoriesDiv.append(col.querySelector('em').querySelector('a'));
        col.append(moreStoriesDiv);
      }
    });
    if (img) block.append(img);
  });
}
