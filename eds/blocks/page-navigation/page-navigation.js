import {
  div, a, p, strong, img,
} from '../../scripts/dom-builder.js';
import { getMetadata } from '../../scripts/aem.js';

async function fetchPostData() {
  try {
    const response = await fetch('/drafts/query-index.json');
    const jsonData = await response.json();
    return jsonData.data;
  } catch (error) {
    return [];
  }
}

function findCurrentPageIndex(str) {
  const currentPage = window.location.pathname;
  const mainNavlink = div({ class: 'flex place-content-between' });
  const previousLink = div({ class: 'flex-one' });
  const nextLink = div({ class: 'flex-one' });
  let previousPageIndex;
  let nextPageIndex;
  str.forEach((post, i) => {
    if (currentPage === post.path) {
      if (i > 0) previousPageIndex = i - 1;
      if (str.length - 1 > i) nextPageIndex = i + 1;
    }
    return true;
  });
  if (previousPageIndex + 1) {
    previousLink.appendChild(div(
      { class: 'flex place-content-start' },
      a({ class: 'flex font-semibold text-2xl justify-center items-center w-11 h-11 mx-1 hover:bg-[#f2f2f2] border-[1.5px] rounded-full rotate-90', href: str[previousPageIndex].path }, img({ 'data-icon-name': 'chevron-left-white', src: '/icons/chevron-down.svg' })),
      div(
        { class: 'px-0.5 py-0.5' },
        p({ class: 'text-gray-400 font-bold text-[12px] leading-6 tracking-[.03125rem]' }, 'Previous Page'),
        strong(str[previousPageIndex].title),
      ),
    ));
  }
  if (nextPageIndex) {
    nextLink.appendChild(div(
      { class: 'flex place-content-end' },
      div(
        { class: 'text-right  px-0.5 py-0.5' },
        p({ class: 'text-gray-400 font-bold text-[12px] leading-6 tracking-[.03125rem]' }, 'Next Page'),
        strong(str[nextPageIndex].title),
      ),
      a({ class: 'flex font-semibold text-2xl justify-center items-center w-11 h-11 mx-1 hover:bg-[#f2f2f2] border-[1.5px] rounded-full rotate-[270deg]', href: str[nextPageIndex].path }, img({ 'data-icon-name': 'chevron-right', src: '/icons/chevron-down.svg' })),
    ));
  }
  mainNavlink.appendChild(previousLink);
  mainNavlink.appendChild(nextLink);
  return mainNavlink;
}

export default async function decorate(block) {
  const postData = await fetchPostData();
  const wrapper = div();
  const sortedResults = getMetadata('type');
  const filteredResults = postData.filter((item) => item.path.includes('/technical-resources/guides') && sortedResults === item.type);
  const bottomPageNavigation = findCurrentPageIndex(filteredResults);
  if (sortedResults === 'Guides') {
    wrapper.append(bottomPageNavigation);
    block.appendChild(wrapper);
  }
}
