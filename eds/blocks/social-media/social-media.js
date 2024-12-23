/* eslint-disable no-script-url */
import {
  div, p, ul, li, a, span,
} from '../../scripts/dom-builder.js';
import {
  decorateIcons,
} from '../../scripts/aem.js';

export default function decorate(block) {
  block.classList.add(...'max-w-4xl mx-auto text-gray-600'.split(' '));
  const socialLinksDiv = div({ class: 'space-y-2' });
  socialLinksDiv.prepend(
    p({ class: 'text-base font-bold text-black' }, 'Share'),
    ul(
      { class: 'flex gap-x-4' },
      li(a({ href: 'javascript:window.open(\'//twitter.com/intent/tweet?\' + location.href + \'&title=\' + encodeURI(document.title))' }, span({ class: 'icon icon-social-media-x' }))),
      li(a({ href: 'javascript:window.open("//www.linkedin.com/shareArticle?mini=true&url=" + location.href + "&title=" + document.title)' }, span({ class: 'icon icon-linkedin-circle' }))),
      li(a({ href: 'javascript:window.open(\'//www.facebook.com/sharer/sharer.php?\' + location.href + \'&title=\' + encodeURI(document.title))' }, span({ class: 'icon icon-facebook-circle' }))),
    ),
  );
  decorateIcons(socialLinksDiv);
  block.append(socialLinksDiv);
}
