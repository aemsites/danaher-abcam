import { div, p, ul, li, a, span } from '../../scripts/dom-builder.js';
import { decorateIcons, getMetadata } from '../../scripts/aem.js';

function goBack() {
  const backArr = window.location.pathname.split('/');
  const backNavigationPath = backArr.slice(0, (backArr.length - 1)).join('/');
  return `${window.location.origin}${backNavigationPath}`;
}

export default function decorate(block) {
  const articleType = getMetadata('template').toLowerCase();
  block.classList.add(...'max-w-4xl mx-auto mb-8 text-gray-600 pt-4 pb-0 md:pb-10'.split(' '));
  // // eslint-disable-next-line no-script-url
  // const goParentBack = a({ class: 'my-auto text-base text-danaherpurple-500 font-semibold', href: goBack() }, `← Back to ${articleType}`);
  // block.prepend(goParentBack);
  // block.parentElement.classList.add(...'col-span-12'.split(' '));
  // document.querySelector('main .col-12-container-block')?.prepend(block.parentElement);
  const socialLinksDiv = div({ class: 'space-y-2' });
  socialLinksDiv.prepend(
    p({ class: 'text-base font-bold' }, 'Share'),
    ul(
      { class: 'flex gap-x-2' },
      li(a({ href: 'javascript:window.open("//www.linkedin.com/shareArticle?mini=true&url=" + location.href + "&title=" + document.title)' }, span({ class: 'icon icon-linkedin-circle' }))),
      li(a({ href: 'javascript:window.open(\'//twitter.com/intent/tweet?\' + location.href + \'&title=\' + encodeURI(document.title))' }, span({ class: 'icon icon-twitter-circle' }))),
      li(a({ href: 'javascript:window.open(\'//www.facebook.com/sharer/sharer.php?\' + location.href + \'&title=\' + encodeURI(document.title))' }, span({ class: 'icon icon-facebook-circle' }))),
    ),
  );
  decorateIcons(socialLinksDiv);
  block.append(socialLinksDiv);
}
