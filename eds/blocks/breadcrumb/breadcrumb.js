import { getMetadata } from '../../scripts/aem.js';
import {
  div, nav, ul, li, a,
} from '../../scripts/dom-builder.js';
// breadcrumb functionality implementation
export default function decorate(block) {
  const path = window.location.pathname.split('/').slice(1);
  const title = getMetadata('og:title');
  const navigation = getMetadata('navigation');
  if (navigation !== 'false' || navigation === null) {
    const { length } = path;
    const breadcrumbLiLinks = li();
    let url = '';
    let breadcrumbLinks = '';
    for (let i = 0; i < length; i += 1) {
      let underline = 'underline';
      if (i !== length - 1) underline = `hover:${underline}`;
      url = `${url}/${path[i]}`;
      let link = i === length - 1 ? title : path[i].charAt(0).toUpperCase() + path[i].slice(1);
      link = link.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
      if (i !== 0) link = ` / ${link}`;
      if (i !== length - 1) breadcrumbLinks = a({ class: '\'breadcrumblink hover:underline  text-lg\'', href: url }, (`${link}`));
      else { breadcrumbLinks = a({ class: '\'breadcrumblink underline text-lg\'', href: url }, (`${link}`)); }
      breadcrumbLiLinks.appendChild(breadcrumbLinks);
    }
    const breadcrumNav = nav(
      { class: 'breadcrumb-wrapper relative z-10 flex max-w-max flex-1 items-center' },
      div({ style: 'position:relative' }, ul(breadcrumbLiLinks)),
    );
    block.classList.add(...'w-3/4 m-auto mt-20 font-sans text-base flex flex-col justify-center'.split(' '));
    block.appendChild(breadcrumNav);
  }
}
