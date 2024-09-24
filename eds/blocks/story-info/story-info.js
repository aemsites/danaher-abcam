import {
  div, input, span,
} from '../../../eds/scripts/dom-builder.js';
import {
  getMetadata, decorateIcons,
} from '../../../eds/scripts/aem.js';

export default function decorate(block) {
  block.innerHTML = '';
  const authorName = getMetadata('authorname');
  const publishDate = getMetadata('published-time');
  const readingTime = getMetadata('readingtime');
  const expectedPublishFormat = new Date(publishDate);

  block.append(
    div(
      { class: 'storyinfo' },
      div(
        { class: 'max-w-4xl mx-auto' },
        div(
          { class: 'items-center flex justify-start my-4 w-full col-span-2' },
          div(
            { class: 'space-y-1 text-lg leading-6' },
            div({ class: 'text-danaherblack-500 font-medium' }, authorName),
          ),
        ),
        div(
          { class: 'w-max items-center flex justify-end col-span-1 text-sm mr-4 my-4 text-danaherblack-500' },
          `${expectedPublishFormat.getDate()} ${expectedPublishFormat.toLocaleString('default', { month: 'long' })}, ${expectedPublishFormat.getFullYear()}`,
          input({ id: 'publishdate', class: 'hidden', value: publishDate }),
        ),
        div(
          { class: 'items-center flex justify-start col-span-1 my-4' },
          span({ class: 'icon icon-reading size-6 items-center' }),
          div(
            { class: 'text-sm text-danaherblack-500 pl-1 pb-[.25rem]' },
            span({ id: 'timetoread' }, `${readingTime} Mins`),
          ),
        ),
      ),
    ),
  );
  decorateIcons(block);
}
