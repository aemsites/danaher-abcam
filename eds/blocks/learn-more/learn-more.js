import {
  a, div, li, p, span, ul,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
 
export default function decorate(block) {
  block.classList.add(...'px-6 py-8 w-full border-y'.split(' '));
  block.querySelector('div')?.classList.add(...'flex flex-col sm:flex-row md:flex-row md:justify-between pt-0 pb-8'.split(' '));
  block.querySelector('h3')?.parentElement?.classList.add('learnmore-content');
  block.querySelector('h3')?.classList.add('text-xl', 'font-bold');
  block.querySelector('div > p:not(div.button-container > p)')?.classList.add('text-base', 'font-normal');
 
  const socialLinksDiv = div({ class: 'md:w-1/4 pt-10 lg:pt-0 md:pl-8' });
  socialLinksDiv.prepend(
    p(
      { class: 'text-base font-bold' },
      'Share',
    ),
    ul(
      { class: 'flex gap-x-4' },
      li(a({ href: 'javascript:window.open(\'//twitter.com/intent/tweet?\' + location.href + \'&title=\' + encodeURI(document.title))' }, span({ class: 'icon icon-social-media-x' }))),
      li(a({ href: 'javascript:window.open("//www.linkedin.com/shareArticle?mini=true&url=" + location.href + "&title=" + document.title)' }, span({ class: 'icon icon-linkedin-circle' }))),
      li(a({ href: 'javascript:window.open(\'//www.facebook.com/sharer/sharer.php?\' + location.href + \'&title=\' + encodeURI(document.title))' }, span({ class: 'icon icon-facebook-circle' }))),
    ),
  );
  const firstDivEl = block.querySelector(':scope > div > div');
  const button = block.querySelector('.button-container');
  if (firstDivEl?.childElementCount === 0 && !button) {
    socialLinksDiv.classList.add(...'flex flex-col w-full items-center m-auto'.split(' '));
    decorateIcons(socialLinksDiv, 50, 50);
  } else {
    if (button) {
      firstDivEl?.append(button);
      button.classList.add('!justify-self-start');
    }
    block.querySelector('div')?.classList.add(...'flex flex-col md:flex-row md:flex-row md:justify-between pt-0 pb-8 md:px-8'.split(' '));
    block.querySelector('h3')?.parentElement?.classList.add('max-w-3xl');
    block.querySelector('h3')?.classList.add('text-xl', 'font-bold');
    block.querySelector('p')?.parentElement?.classList.add('md:w-3/4');
    block.querySelector('p')?.classList.add('explore-para', 'mt-0', 'text-sm', '!font-bold', 'leading-7', 'tracking-[0.3px]');
   
    block.querySelector('div > p:not(div.button-container > p)')?.classList.add('text-base', 'font-normal', 'mb-5');
    decorateIcons(socialLinksDiv);
  }
  const exploreElm = block.querySelector('.button-container');
  const learnMoreElm = block.querySelector('.learnmore-content');
  const learnMorePara = block.querySelector('.learnmore-content p').classList.add('mb-6', 'mt-0');
 
  if (exploreElm && learnMoreElm) {
    exploreElm.insertAdjacentElement('beforebegin', learnMoreElm);
  }
  block.querySelector('div').append(socialLinksDiv);
}