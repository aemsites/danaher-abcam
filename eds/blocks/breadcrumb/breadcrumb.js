import { getMetadata } from '../../scripts/aem.js';
import {
  div, nav, ul, li, a, span,
} from '../../scripts/dom-builder.js';

export default function decorate(block) {
  const path = window.location.pathname.split('/').slice(2);
  const ogTitle = getMetadata('og:title');
  const title = ogTitle.indexOf('| abcam') > -1 ? ogTitle.split('| abcam')[0] : ogTitle;
  const newUrl = new URL(window.location);
  if (window.location.pathname.indexOf('technical-resources/guides') > -1) {
    newUrl.pathname = window.location.pathname.substring(0, window.location.pathname.indexOf('/technical-resources/guides/'));
  }
  const { length } = path;
  if (length > 0) {
    const breadcrumbLiLinks = li();
    let url = '';
    let breadcrumbLinks = '';
    for (let i = 0; i < length; i += 1) {
      let underline = 'underline';
      if (i !== length - 1) underline = `hover:${underline}`;
      url = `${url}/${path[i]}`;
      let link = i === length - 1 ? title : path[i].charAt(0).toUpperCase() + path[i].slice(1);
      link = link.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
      //if (i !== 0) link = ` / ${link}`;
      if (i !== length - 1) breadcrumbLinks = a({ class: '\'breadcrumblink hover:underline  text-lg\'', href: newUrl + url }, (`${link}`));
      else { breadcrumbLinks = span({ class: '\'breadcrumblink underline text-lg\'', href: newUrl + url }, (`${link}`)); }
      breadcrumbLiLinks.appendChild(breadcrumbLinks);
      if( i !== length-1)
        breadcrumbLiLinks.append(' / ');
      
    }
    const breadcrumNav = nav(
      { class: 'breadcrumb-wrapper relative z-10 flex max-w-max flex-1 items-center' },
      div({ style: 'position:relative' }, ul(breadcrumbLiLinks)),
    );
    block.classList.add(...'px-[30px] m-auto font-sans text-base flex flex-col justify-center'.split(' '));
    block.appendChild(breadcrumNav);
  }
}
