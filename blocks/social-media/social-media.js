/* eslint-disable no-script-url */
import {
  div, p, ul, li, a, span,
} from '../../scripts/dom-builder.js';
import {
  decorateIcons,
} from '../../scripts/aem.js';

export default function decorate(block) {
  block.classList.add(...'max-w-4xl mx-auto mb-8 text-gray-600 pt-4 pb-0 md:pb-10'.split(' '));
  const socialLinksDiv = div({ class: 'space-y-2' });
  socialLinksDiv.prepend(
    p({ class: 'text-base font-bold' }, 'Share'),
    ul(
      { class: 'flex gap-x-2' },
      li(a({ href: 'javascript:window.open(\'//twitter.com/intent/tweet?\' + location.href + \'&title=\' + encodeURI(document.title))' }, span({ class: 'icon icon-twitter-circle' }))),
      li(a({ href: 'javascript:window.open("//www.linkedin.com/shareArticle?mini=true&url=" + location.href + "&title=" + document.title)' }, span({ class: 'icon icon-linkedin-circle' }))),
      li(a({ href: 'javascript:window.open(\'//www.facebook.com/sharer/sharer.php?\' + location.href + \'&title=\' + encodeURI(document.title))' }, span({ class: 'icon icon-facebook-circle' }))),
    ),
  );
  decorateIcons(socialLinksDiv);
  block.append(socialLinksDiv);
}
