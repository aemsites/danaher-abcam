import { getContentType, imageHelper } from '../../scripts/scripts.js';
import {
  li, a, p, div, h3, span,
} from '../../scripts/dom-builder.js';

export default function createCard(article, firstCard = false, cardType = 'story') {
  const titleImage = imageHelper(article.image, article.title, firstCard);
  const { title } = article;
  const { description } = article;
  const { path } = article;
  const { tags } = article;
  const time = article.readingTime;

  let footerLink;
  let minRead;
  switch (getContentType(tags)) {
    case 'podcast':
      footerLink = 'Listen to podcast';
      minRead = ` | ${time} mins listen`;
      break;
    case 'film':
      footerLink = 'Watch film';
      minRead = ` | ${time} mins watch`;
      break;
    case 'upcoming-webinar':
      footerLink = 'Register';
      break;
    case 'on-demand-webinar':
      footerLink = 'Watch webinar';
      minRead = ` | ${time} mintues`;
      break;
    default:
      footerLink = 'Read article';
      minRead = ` | ${time} mins read`;
      break;
  }

  const card = li(
    {
      class: 'card relative overflow-hidden bg-transparent transform transition duration-500 hover:scale-105',
      title,
    },
    a(
      { class: 'size-full flex flex-col justify-center group', href: path },
      titleImage,
      div(
        { class: 'flex-1' },
        title && h3({ class: 'text-black font-medium mt-4 break-words line-clamp-4' }, title),
        description && p({ class: 'text-sm line-clamp-3' }, description),
      ),
      footerLink !== ''
        ? a({
          class: 'text-base leading-5 text-[#378189] font-bold p-2 pl-0 group-hover:tracking-wide group-hover:underline transition duration-700 mt-2',
          href: path,
        }, footerLink)
        : '',
    ),
  );
  if (cardType === 'story') {
    card.querySelector('.flex-1').prepend(
      span({ class: 'capitalize font-normal text-sm text-[#65697C] font-["rockwell"]' }, `${getContentType(tags)}`),
      span({ class: 'font-normal text-sm text-[#65697C] font-["rockwell"]' }, `${minRead}`),
    );
  }
  return card;
}
