import { getProductResponse } from '../../scripts/search.js';
import {
  div, h2, span, button, img, li, ul, thead, tr, table, th, a, tbody, td,
} from '../../scripts/dom-builder.js';
import { decorateModals } from '../../scripts/modal.js';

let drawerContent;
const perPageList = 10;
let publicationsData = [];
const publicationFilterByFields = ['name', 'journal'];
const dataContainer = ul({ class: 'h-3/4 space-y-4 my-3 overflow-y-auto' });
const nextBtn = li({ class: 'p-2 rounded-full -rotate-90', title: 'Next' }, span({ class: 'icon icon-chevron-down size-3' }));
const prevBtn = li({ class: 'p-2 rounded-full rotate-90', title: 'Previous' }, span({ class: 'icon icon-chevron-down size-3 size-3' }));
const paginateIndexesTag = ul(
  { class: 'flex justify-center text-sm items-center gap-2 [&_.active]:bg-gray-400/30 hover:[&_li]:bg-gray-400/30' },
  prevBtn,
  nextBtn,
);

function decoratePaginateIndexes({ list, currentPage, element }) {
  const indexesArr = paginateIndexes({
    listLength: list.length, currentPage, perPage: perPageList,
  });
  return indexesArr.map((indexNum) => {
    const isEllipsis = typeof indexNum === 'string';
    const liTag = li(
      { class: `px-4 py-2 rounded-full ${isEllipsis ? 'cursor-not-allowed' : 'cursor-pointer'} ${currentPage === indexNum ? 'active' : ''}` },
      indexNum,
    );
    if (!isEllipsis) {
      liTag.setAttribute('title', indexNum);
      liTag.addEventListener(
        'click',
        // eslint-disable-next-line no-use-before-define
        () => decorateAllPublications({
          el: element, jsonData: list, currentPage: indexNum, perPage: perPageList,
        }),
      );
    }
    return liTag;
  });
}

function decorateAllPublications({
  el, jsonData, currentPage = 1, perPage = perPageList,
}) {
  const paginatedList = paginateData(jsonData, currentPage, perPage);
  dataContainer.innerHTML = '';
  paginatedList.forEach((list) => {
    const newDate = new Date(list.publicationDate);
    const liTag = li(
      { class: 'flex gap-4' },
      div(
        { class: 'min-h-32 flex flex-col justify-between flex-1 p-4 font-normal text-sm rounded-lg border bg-white' },
        div(
          { class: 'flex justify-between text-xs text-gray-400 font-semibold' },
          span(`${list.journal} ${list.pages}`),
          span(newDate.getFullYear()),
        ),
        div({ class: 'text-black py-2' }, list.name),
        div(
          { class: 'flex flex-col gap-y-2 text-xs text-gray-400 font-semibold' },
          list.authors && list.authors.length > 0 && div(list.authors[0]),
          a({ class: 'flex gap-x-1 shrink-0 hover:underline', href: '#' }, `PubMed ${list.pubmedId}`),
        ),
      ),
    );
    dataContainer.append(liTag);
  });
  if (el) {
    if (el.querySelector('ul')) el.querySelector('ul').outerHTML = dataContainer.outerHTML;
    else el.append(dataContainer);
    while (prevBtn.nextSibling && prevBtn.parentNode.children.length > 2) {
      prevBtn.parentNode.removeChild(prevBtn.nextSibling);
    }
    prevBtn.after(...decoratePaginateIndexes({ list: jsonData, currentPage, element: el }));
    if (currentPage === 1 || jsonData.length === 0 || jsonData.length <= perPage) {
      prevBtn.classList.remove('cursor-pointer');
      prevBtn.classList.add('cursor-not-allowed');
    } else {
      prevBtn.classList.remove('cursor-not-allowed');
      prevBtn.classList.add('cursor-pointer');
      prevBtn.addEventListener(
        'click',
        () => decorateAllPublications({
          el, jsonData, currentPage: (currentPage - 1), perPage: perPageList,
        }),
      );
    }
    if (
      Math.ceil(publicationsData.length / perPageList) === currentPage
      || jsonData.length === 0
      || jsonData.length <= perPage
    ) {
      nextBtn.classList.remove('cursor-pointer');
      nextBtn.classList.add('cursor-not-allowed');
    } else {
      nextBtn.classList.remove('cursor-not-allowed');
      nextBtn.classList.add('cursor-pointer');
      nextBtn.addEventListener(
        'click',
        () => decorateAllPublications({
          el, jsonData, currentPage: (currentPage + 1), perPage: perPageList,
        }),
      );
    }
  }
}

const filterPublications = debounce(async (event, jsonData) => {
  const { value } = event.target;
  const filterPublicationData = jsonData.filter((data) => {
    const conclusion = publicationFilterByFields.map((kys) => data[kys].includes(value));
    return conclusion.includes(true);
  });
  decorateAllPublications({
    el: drawerContent, jsonData: filterPublicationData, currentPage: 1, perPage: perPageList,
  });
}, 800);

function parsedPublications(jsonData) {
  let parsedPublicationsData;
  try {
    let appendedStr = '';
    parsedPublicationsData = jsonData.map((pub) => {
      if (pub.indexOf('{') > -1 && pub.indexOf('}') > -1) {
        if (appendedStr === '') {
          return JSON.parse(pub);
        }
      } else {
        appendedStr += pub;
        if (appendedStr.indexOf('{') > -1 && appendedStr.indexOf('}') > -1) {
          const parsedStr = JSON.parse(appendedStr);
          appendedStr = '';
          return parsedStr;
        }
      }
      return undefined;
    }).filter(Boolean);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
  return parsedPublicationsData;
}

const getReactivityStatus = (reactivityType) => {
  if (reactivityType === 'Tested') {
    return '/icons/tested.svg';
  } if (reactivityType === 'REACTS') {
    return '/icons/expected.svg';
  }
  if (reactivityType === 'EXPECTED_TO_REACT') {
    return '/icons/predicted.svg';
  }

  return '/icons/not-recommended.svg';
};

const getTableCSS = (reactivityType) => {
  if (reactivityType === 'Tested') {
    return 'w-6';
  }
  return 'w-3';
};

function productPromise() {
  const productNotes = div({ class: 'product-promise-section font-semibold text-sm p-4 bg-white gap-y-4 justify-between flex items-center mb-4 max-[959px]:flex-col max-[959px]:w-[100%] max-[959px]:items-start' });
  const productNotesColumn = div(
    { class: 'relative gap-x-6 gap-y-4 flex flex-wrap' },
    span({ class: 'text-xs tracking-[.0125rem] gap-x-2 flex items-center max-[959px]:w-full' }, 'Product promise'),
    span(
      { class: 'text-xs tracking-[.0125rem] gap-x-2 flex items-center' },
      span(img({ class: 'w-8', src: '/icons/tested.svg', alt: 'Reactivity Tested' })),
      span('Tested'),
    ),
    span(
      { class: 'text-xs tracking-[.0125rem] gap-x-2 flex items-center' },
      span(img({ class: 'w-4', src: '/icons/expected.svg', alt: 'Reactivity Expected' })),
      span('Expected'),
    ),
    span(
      { class: 'text-xs tracking-[.0125rem] gap-x-2 flex items-center' },
      span(img({ class: 'w-3', src: '/icons/predicted.svg', alt: 'Reactivity Predicted' })),
      span('Predicted'),
    ),
    span(
      { class: 'text-xs tracking-[.0125em] gap-x-2 flex items-center' },
      span(img({ class: 'w-3', src: '/icons/not-recommended.svg', alt: 'Reactivity Not Recommended' })),
      span('Not recommended'),
    ),
  );
  const tablebutton = a(
    { class: 'button h-8 flex items-center rounded-[16px] px-3 py-2 text-base tracking-[.0125rem] border border-black max-[959px]:w-fit', href: '/modals/product-promise' },
    span({ class: 'learnmore align-center' }, 'Learn more'),
    span({ class: 'arrow-icon icon icon-chevron-down-white rotate-0' }),
    span(img({ class: 'w-4', src: '/icons/plus.svg' })),
  );
  decorateModals(tablebutton);
  productNotes.appendChild(productNotesColumn);
  productNotes.appendChild(tablebutton);
  return productNotes;
}

function publicationsAndImageSection(images, publicationArray) {
  const pubandimagesection = div({ class: 'col-span-4 lg:flex lg:space-x-8' });
  const publicationsContent = div();
  if (publicationArray) {
    publicationArray.forEach((pub) => {
      const publicationData = JSON.parse(pub);
      const publicationJournalAndVolume = div(
        { class: 'flex text-gray-700 font-semibold text-xs justify-between' },
        span(`${publicationData.journal}:${publicationData.volume}:${publicationData.pages}`),
        span({ class: 'text-right' }, publicationData.publicationDate.substring(0, 4)),
      );
      publicationsContent.appendChild(div(
        { class: 'py-2 gap-4' },
        div(
          { class: ' flex-col font-normal text-sm p-4 border-t-[1px] bg-white rounded-lg justify-between min-h-32' },
          publicationJournalAndVolume,
          div({ class: 'text-black py-2' }, publicationData.name),
          div({ class: 'flex text-gray-700 font-semibold text-xs' }, publicationData.authors),
          a({ class: 'flex gap-x-1 text-gray-700 py-2 hover:underline', target: '_blank', href: `https://pubmed.ncbi.nlm.nih.gov/37192628/${publicationData.pubmedId}` }, img({ class: 'w-3', src: '/icons/share-icon.svg', alt: 'Share Link' }), `PubMed ${publicationData.pubmedId}`),
        ),
      ));
    });
  }
  const ulimage = ul({ class: 'flex gap-2 overflow-hidden hover:cursor-pointer opacity-100' });
  images.forEach((image) => {
    ulimage.append(li({ class: 'bg-white w-1/3 aspect-square hover:cursor-pointer opacity-100 text-[#00000080] bg-black focus:outline-none' }, img({ src: image, alt: 'Product Detail Graphic', style: 'width: 100%; height: auto;' })));
  });
  const imagecolumn = div({ class: 'mt-1 mb-6 py-2' }, div({ class: 'flex gap-4 border-1 border-solid' }, ulimage));
  const imagesection = div({ class: 'w-1/2 max-[959px]:w-[100%]' }, h2({ class: 'text-[#2A3C3C] font-semibold text-lg mt-4' }, 'Images'), imagecolumn);
  if (publicationArray.length) {
    const publicationsection = div(
      { class: 'w-1/2 max-[959px]:w-[100%] mt-4 space-y-4' },
      div(
        { class: 'flex items-center justify-between' },
        h2({ class: 'text-[#2A3C3C] font-semibold text-lg' }, 'Publications'),
        button(
          {
            type: 'button',
            onclick: () => {
              showDrawer('drawer-eg');
            },
            class: 'inline-flex items-center px-4 py-1.5 text-sm font-medium text-center text-white bg-black/80 rounded-full hover:bg-black/90',
          },
          'View all',
          span(
            { class: 'inline-flex items-center justify-center h-4 ms-2 p-1 text-xs font-semibold tracking-wider bg-neutral-500/50 rounded-full' },
            allCount,
          ),
        ),
      ),
    );
    publicationsection.appendChild(publicationsContent);
    pubandimagesection.appendChild(publicationsection);
  }
  pubandimagesection.appendChild(imagesection);
  return pubandimagesection;
}

function allApplicationTableData(tableData, application) {
  const allTabData = div({ class: 'individualdata' });
  const tableColumn = thead();
  const tableHeadingRow = tr(th({ class: 'font-semibold text-black text-sm text-left bg-white p-4 boarder border-b-2 max-[959px]:p-2' }));
  application.forEach((name) => {
    tableHeadingRow.appendChild(th({ class: 'font-semibold text-black text-sm text-left bg-white p-4 boarder border-b-2 max-[959px]:p-2' }, name));
  });
  tableColumn.appendChild(tableHeadingRow);
  const tbodyContent = tbody();
  const tableHeading = table({ class: 'w-full border-separate indent-2' }, tableColumn);
  tableData.forEach((row) => {
    const rowObj = JSON.parse(row);
    const tablerow = tr();
    tablerow.appendChild(th(
      { class: 'p-4 font-normal text-left bg-white w-1/5 max-[959px]:p-2' },
      span({ class: 'text-sm font-semibold' }, rowObj.species),
    ));
    application.forEach((name) => {
      const tableCell = td(
        { class: 'p-4 font-normal text-left bg-white w-1/5' },
        img({ class: getTableCSS(rowObj[name]), src: getReactivityStatus(rowObj[name]) }),
      );
      tablerow.appendChild(tableCell);
    });
    tbodyContent.appendChild(tablerow);
    tableHeading.appendChild(tbodyContent);
  });
  allTabData.appendChild(tableHeading);
  return allTabData;
}

export default async function decorate(block) {
  block.classList.add(...'mx-auto w-[87%] max-[768px]:w-full'.split(' '));
  const response = await getProductResponse();
  const {
    reactivitytabledata = [], publicationsjson, images,
    reactivityapplications, numpublications,
  } = response[0].raw;
  const reactivityData = div(
    { class: 'relative w-full box-content ' },
    h2({ class: 'font-semibold text-black text-[24px] leading-[1.33] tracking-[-.03125rem] mb-4' }, 'Reactivity Data'),
    span({ class: 'text-base tracking-wide mb-4' }, 'Select an application'),
  );
  const buttonsPanel = div({ class: 'flex gap-2 flex-wrap text-black tracking-[2px] font-semibold text-sm pb-5 max-[959px]:w-[100%]' });
  buttonsPanel.appendChild(button({ class: 'px-6 py-3 border-black boarder-solid  bg-black text-white font-semibold rounded-[28px] tracking-[.2px]' }, 'All applications'));
  const reactivityApplication = reactivityapplications;
  if (reactivityApplication) {
    reactivityApplication.forEach((name) => {
      buttonsPanel.appendChild(button({ class: 'px-6 py-3 border border-black text-black font-semibold rounded-[28px] tracking-[.2px]' }, name));
    });

    const reactivityApplicationWrapper = div({ class: 'reactivityApplicationWrapper w-full mt-4' });
    reactivityApplicationWrapper.appendChild(buttonsPanel);
    const productInfo = productPromise();
    reactivityApplicationWrapper.appendChild(productInfo);
    const reactivityJson = reactivitytabledata;
    const tableContent = allApplicationTableData(reactivityJson, reactivityApplication);
    reactivityApplicationWrapper.appendChild(tableContent);
    const publicationArray = publicationsjson
      ? publicationsjson.slice(0, 2) : [];
    const newImages = images ? images.slice(0, 3) : [];
    const blockSection = publicationsAndImageSection(newImages, publicationArray, numpublications);

    if (publicationsjson.length > 2) {
      publicationsData = parsedPublications(publicationsjson);
      const searchBar = div(
        { class: 'relative' },
        input({
          type: 'text',
          class: 'block w-full py-2 pl-3 pe-8 text-sm text-gray-600 tracking-wide bg-white border border-slate-300 focus-visible:outline-none focus-visible:border-sky-500 focus-visible:ring-1 focus-visible:ring-sky-500 rounded-full',
          placeholder: 'Search by topic, author or PubMed ID',
          onkeyup: (e) => filterPublications(e, publicationsData),
        }),
        span({ class: 'icon icon-search w-5 h-5 absolute end-2.5 bottom-2.5 cursor-pointer' }),
      );
      const drawerEl = await decorateDrawer({ id: 'drawer-eg', title: 'Publications', isBackdrop: true });
      drawerContent = drawerEl.querySelector('#drawer-eg .drawer-body');
      if (drawerContent) {
        drawerContent.append(searchBar);
        decorateAllPublications({ el: drawerContent, jsonData: publicationsData });
        drawerContent.append(paginateIndexesTag);
      }
      decorateIcons(drawerEl);
      block.append(drawerEl);
    }

    reactivityApplicationWrapper.appendChild(blockSection);
    block.append(reactivityData);
    block.appendChild(reactivityApplicationWrapper);
  }
}
