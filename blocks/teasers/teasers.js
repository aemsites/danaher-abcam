import { decorateIcons } from '../../scripts/aem.js';
import { generateUUID } from '../../scripts/scripts.js';
import {
  div, h3, h6, span, a,
} from '../../scripts/dom-builder.js';

function createTeaserBlock(
  { title, subTitle },
  { prefixedIconClass, openCloseIconClass },
  uuid,
  index,
  isLink,
) {
  const divEl = div({ id: `teaser-item-${index}`, class: 'teaser-item group relative bg-gray-400/10 rounded-2xl box-border text-black-0 max-w-screen-lg [&:has(:focus-visible)]:shadow-interactiveElement cursor-pointer' });
  const prefixedIcon = prefixedIconClass ? span({ class: `icon ${prefixedIconClass} flex size-7 absolute left-8 fill-current text-gray-400` }) : '';
  const openCloseIcon = span({ class: 'arrow-icon icon icon-chevron-down-white block -rotate-90 text-gray-400 fill-current size-5 group-hover:translate-x-0.5 transform transition-all' });
  const summaryContent = a(
    {
      title,
      href: isLink,
      'aria-controls': `teaser-${uuid}-${index}`,
      class: 'flex items-center justify-between w-full text-left font-semibold px-8 py-10',
    },
    prefixedIcon,
    div(
      { class: `space-y-2 ${prefixedIconClass ? 'ms-16' : ''} ${openCloseIconClass ? 'me-20' : ''}` },
      (title ? h3({ class: 'w-[90%] text-2xl leading-5 group-hover:underline text-teal-800/70 font-bold tracking-wider mb-5 max-[767px]:w-[75%] max-[375px]:break-words', title }, title) : ''),
      (subTitle ? h6({ class: 'w-[90%] text-black font-normal tracking-wide max-[767px]:w-[75%]', title: subTitle }, subTitle) : ''),
    ),
    div({ class: 'p-3 rounded-full absolute right-12 bg-teal-700/80 group-hover:bg-teal-700 max-[767px]:right-8' }, openCloseIcon),
  );
  divEl.append('', summaryContent, '');
  return divEl;
}
/**
* loads and decorates the header, mainly the nav
* @param {Element} block The header block element
*/
export default async function decorate(block) {
  
}
