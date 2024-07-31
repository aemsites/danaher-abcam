import { decorateIcons, getMetadata } from '../../scripts/aem.js';
import {
  a, div, li, p, span, ul,
} from '../../scripts/dom-builder.js';
import { fetchPostData } from '../child-page/child-page.js';

let allPathways = [];
const perPageList = 9;
const nextBtn = li({ class: 'p-2 rounded-full -rotate-90', title: 'Previous' }, span({ class: 'icon icon-chevron-down' }));
const prevBtn = li({ class: 'p-2 rounded-full rotate-90', title: 'Next' }, span({ class: 'icon icon-chevron-down' }));
const paginateIndexes = ul(
  { class: 'flex justify-center items-center gap-2 mt-8 [&_.active]:bg-gray-400/30 hover:[&_li]:bg-gray-400/30' },
  prevBtn,
  nextBtn,
);
const body = div({ class: 'py-8' }, ul({ class: 'space-y-8' }), paginateIndexes);

function paginate(list, currentPage, perPage) {
  return list.slice((currentPage - 1) * perPage, currentPage * perPage);
}

function updatedPaginateIndexes(currentPage, existedIndexes) {
  existedIndexes.forEach((elementTag) => {
    if (parseInt(elementTag.title, 10) === currentPage) elementTag.classList.add('active');
    else elementTag.classList.remove('active');
  });
}

function decoratePaginateIndexes(currentPage) {
  return [...Array(Math.ceil(allPathways.length / perPageList)).keys()].map((indexNum) => {
    const newIndex = indexNum + 1;
    return li(
      {
        class: `px-4 py-2 rounded-full cursor-pointer ${currentPage === newIndex ? 'active' : ''}`,
        title: newIndex,
        // eslint-disable-next-line no-use-before-define
        onclick: () => decorateLists(allPathways, newIndex, perPageList),
      },
      indexNum + 1,
    );
  });
}

function decorateLists({
  lists, currentPage = 1, perPage = perPageList, tagEl,
}) {
  const paginatedList = paginate(lists, currentPage, perPage);
  const ulTag = body.querySelector('ul');
  ulTag.innerHTML = '';
  ulTag.append(
    ...paginatedList.map((res) => {
      const parsedDate = new Date(parseInt(`${res.lastModified}000`, 10));
      const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      });
      return (
        li(
          { class: 'tracking-wide' },
          a({ class: 'text-teal-600/90 font-semibold text-lg tracking-wider', href: res.path }, res.title),
          p({ class: 'text-black/30 text-sm mb-2 mt-3' }, dateTimeFormatter.format(parsedDate)),
          p({ class: 'text-black/90 text-base' }, res.description),
        )
      );
    }),
  );
  if (tagEl.querySelectorAll('li.px-4')?.length === 0) prevBtn.after(...decoratePaginateIndexes(currentPage));
  else updatedPaginateIndexes(currentPage, tagEl.querySelectorAll('li.px-4'));
  if (currentPage === 1) {
    prevBtn.classList.remove(...'cursor-pointer'.split(' '));
    prevBtn.classList.add(...'cursor-not-allowed'.split(' '));
  } else {
    prevBtn.classList.remove(...'cursor-not-allowed'.split(' '));
    prevBtn.classList.add(...'cursor-pointer'.split(' '));
    prevBtn.addEventListener('click', () => {
      decorateLists({
        lists: allPathways, currentPage: (currentPage - 1), perPage: perPageList, tagEl,
      });
    });
  }
  if (Math.ceil(allPathways.length / perPageList) === currentPage) {
    nextBtn.classList.remove(...'cursor-pointer'.split(' '));
    nextBtn.classList.add(...'cursor-not-allowed'.split(' '));
  } else {
    nextBtn.classList.remove(...'cursor-not-allowed'.split(' '));
    nextBtn.classList.add(...'cursor-pointer'.split(' '));
    nextBtn.addEventListener('click', () => {
      decorateLists({
        lists: allPathways, currentPage: (currentPage + 1), perPage: perPageList, tagEl,
      });
    });
  }
  tagEl.append(body);
}

export default async function decorate(block) {
  const metaType = getMetadata('type');
  const postData = await fetchPostData();
  allPathways = postData.filter((item) => item.path.includes('/technical-resources/pathways/') && metaType === item.type);
  decorateLists({ lists: allPathways, tagEl: block });
  decorateIcons(body);
}
