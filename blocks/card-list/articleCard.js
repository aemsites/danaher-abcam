import { imageHelper } from '../../scripts/scripts.js';
import {
  li, a, p, div, h3,
} from '../../scripts/dom-builder.js';

function createCard(article, firstCard = false) {
  const cardTitle = article.title.indexOf('| Danaher Life Sciences') > -1
    ? article.title.split('| Danaher Life Sciences')[0]
    : article.title;

  const cardWrapper = a(
    { class: 'group h-full', href: article.path, title: article.title },
    imageHelper(article.image, article.title, firstCard),
    div(
      { class: 'py-2' },
      h3(
        {
          class:
            'text-black font-medium mt-4 line-clamp-3 break-words !h-16',
        },
        cardTitle,
      ),
      p({ class: 'text-sm font-normal line-clamp-3 break-words !h-28' }, article.description),
      div(
        {
          class:
            'mt-auto inline-flex w-full pb-5 text-base text-danaherpurple-500 font-semibold',
        },
        'Read Article →',
      ),
    ),
  );

  return li(
    {
      class:
        'w-full h-full article flex flex-col col-span-1 relative mx-auto justify-center overflow-hidden bg-white transform transition duration-500 hover:scale-105',
    },
    cardWrapper,
  );
}
export default createCard;