import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';
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
    // if (block.className.includes('columns-2-cols')) {
      block.classList.add(...'h-full flex flex-col md:flex-row gap-y-6 px-6 md:px-0'.split(' '));
      row.classList.add(...'flex flex-col lg:flex-row'.split(' '));
      if (window.location.pathname.includes('/en/stories')) {
        row.classList.add(...'container max-w-7xl mx-auto'.split(' '));
        const pageTags = getMetadata('pagetags');
        const tagName = pageTags?.split('/');
        const tag = tagName.pop();
        block.firstElementChild?.firstElementChild?.prepend(div({ class: 'font-normal text-sm leading-4 text-[#8B8B8B] capitalize mb-2' }, tag));
      }
    // }
    [...row.children].forEach((col, index, arr) => {
      col.classList.add('pb-10');
      if(index !== arr.length - 1) col.classList.add('lg:pr-16');
      if (block.className.includes('columns-2-cols')) col.classList.add('lg:w-1/2');
      if (window.location.pathname.includes('/en/stories')) {
        col.classList.add('my-auto');
      } else {
        col.classList.add('h-full');
      }
      
      const pic = col.querySelector('picture');
      if (pic) {
        img = pic;
        const moreStoriesImg = pic.querySelector('img');
        createOptimizedPicture(moreStoriesImg.src, 'img-alt', false, [{ width: '750' }]);
        if (moreStoriesImg && window.location.pathname.includes('/en/stories')) {
          moreStoriesImg.classList.add(...'relative lg:absolute w-full lg:w-1/2 h-full object-cover lg:right-0 lg:bottom-6'.split(' '));
          // eslint-disable-next-line func-names
          moreStoriesImg.onerror = function () {
            moreStoriesImg.width = this.width;
            moreStoriesImg.height = Math.floor(this.width / imageAspectRatio);
          };
        } else {
          // const optimizedPic = createOptimizedPicture(moreStoriesImg.src, 'img-alt', false, [{ width: '750' }]);
          // pic.replaceWith(optimizedPic);
        }
      }else{
        col.classList.add('mx-auto');
      }
      
      // Image Position
      // if (isBottomImg) {
      //   row.classList.add(row.firstElementChild?.querySelector('picture') ? 'flex-col-reverse' : 'flex-col');
      // } else if (isTopImg) {
      //   row.classList.add(row.firstElementChild?.querySelector('picture') ? 'flex-col' : 'flex-col-reverse');
      // } else {
        // row.classList.add('flex-col');
      // }
      // if (!col.querySelector('picture')) {
      //   col.classList.add('flex', 'flex-col');
      // } else {
      //   col.classList.add(...'max-w-96 grow-0 shrink-0'.split(' '));
      // }
      // col.querySelectorAll('.button-container').forEach((anchorTag) => {
      //   anchorTag.classList.add('text-[#378189]', 'underline');
      // });
      // if (col.querySelector('em')?.querySelector('a')) {
      //   const moreStoriesDiv = div({ class: 'more-stories rounded-3xl bg-[#378189] px-6 py-2.5 w-72 text-white hover:bg-[#2A5F65]' });
      //   moreStoriesDiv.append(col.querySelector('em').querySelector('a'));
      //   col.append(moreStoriesDiv);
      // }
    });
    // if (img) block.append(img);
  });
}
