import { createOptimizedPicture } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];

  // setup image columns and other decorations
  [...block.children].forEach((row) => {
    row.classList.add('flex', 'md:grid', 'md:grid-cols-2', 'gap-8');
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      row.classList.add(row.firstElementChild?.querySelector('picture') ? 'flex-col-reverse' : 'flex-col');
      if (pic) {
        const moreStoriesImg = pic.querySelector('img');
        const optimizedPic = createOptimizedPicture(moreStoriesImg.src, 'img-alt', false, [{ width: '750' }]);
        pic.replaceWith(optimizedPic);
      } else {
        const moreStoriesDiv = div({ class: 'more-stories rounded-3xl bg-[#378189] px-6 py-2.5 w-72 text-white hover:bg-[#2A5F65]' });
        moreStoriesDiv.append(col.querySelector('em').querySelector('a'));
        col.classList.add('flex', 'flex-col', 'gap-[18px]');
        col.querySelectorAll('.button-container').forEach((anchorTag) => {
          anchorTag.classList.add('text-[#378189]', 'underline');
        });
        col.append(moreStoriesDiv);
      }
    });
  });
}
