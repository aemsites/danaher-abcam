/* eslint-disable no-script-url */
import {
  a, div, li, p, span, ul,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

export default function decorate(block) {
  const firstDivEl = block.querySelector(':scope > div > div');
  if (firstDivEl?.childElementCount === 0) {
    const button = block.querySelector('.button-container');
    firstDivEl?.append(button);
  }
  block.classList.add(...'px-6 py-8 w-full border-y'.split(' '));
  block.querySelector('div')?.classList.add(...'flex flex-col md:flex-row md:justify-between pt-0'.split(' '));
  block.querySelector('h3')?.parentElement?.classList.add('max-w-3xl');
  block.querySelector('h3')?.classList.add('text-xl', 'font-bold', 'mb-4');
  block.querySelector('p')?.classList.add('text-base', 'font-normal', 'mb-4');

  const socialLinksDiv = div({ class: 'max-w-56 pt-10 lg:pt-0' });
  socialLinksDiv.prepend(
    p(
      { class: 'text-base font-bold' },
      'Share',
    ),
    ul(
      { class: 'flex gap-x-2' },
      li(a({ href: 'javascript:window.open(\'//twitter.com/intent/tweet?\' + location.href + \'&title=\' + encodeURI(document.title))' }, span({ class: 'icon icon-twitter-circle' }))),
      li(a({ href: 'javascript:window.open("//www.linkedin.com/shareArticle?mini=true&url=" + location.href + "&title=" + document.title)' }, span({ class: 'icon icon-linkedin-circle' }))),
      li(a({ href: 'javascript:window.open(\'//www.facebook.com/sharer/sharer.php?\' + location.href + \'&title=\' + encodeURI(document.title))' }, span({ class: 'icon icon-facebook-circle' }))),
    ),
  );
  decorateIcons(socialLinksDiv);
  block.querySelector('div').append(socialLinksDiv);
}
