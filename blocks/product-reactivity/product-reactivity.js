import {
  div, h2, span, button, img, ul, li, a,
  input, table, thead, tbody, tr, th, td,
  select,
  option,
  p,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';
import { decorateModals } from '../../scripts/modal.js';
import { getProductResponse } from '../../scripts/search.js';
import { decorateDrawer, showDrawer, hideDrawer } from '../../scripts/drawer.js';
import {
  debounce, generateUUID, paginateData, paginateIndexes,
} from '../../scripts/scripts.js';
import Carousel from '../../scripts/carousel.js';

const baseOriginURL = 'https://content.abcam.com/';
let publicationDrawerContent;
let publicationDrawerFooter;
let imagesBackdropContent;
const randomUUID = generateUUID();
const perPageList = 10;
const publicationsData = [];
const publicationFilterByFields = ['name', 'journal'];
const dataContainer = ul({ class: 'h-full space-y-4 my-3 overflow-y-auto' });
const nextBtn = li({ class: 'p-2 rounded-full -rotate-90', title: 'Next' }, span({ class: 'icon icon-chevron-down block size-4' }));
const prevBtn = li({ class: 'p-2 rounded-full rotate-90', title: 'Previous' }, span({ class: 'icon icon-chevron-down block size-4' }));
const paginateIndexesTag = ul(
  { class: 'flex justify-center text-sm items-center gap-2 [&_.active]:bg-gray-400/30 hover:[&_li]:bg-gray-400/30' },
  prevBtn,
  nextBtn,
);

function decoratePaginateIndexes({
  list, currentPage, elContent, elFooter,
}) {
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
          elContent, elFooter, jsonData: list, currentPage: indexNum, perPage: perPageList,
        }),
      );
    }
    return liTag;
  });
}
/**
 * decorate allpublications and implement pagination logic.
 * @param {elContent} all publications
 * @param {jsonData} all all publications JSON data
 * @param {jsoncurrentPage} currentpag index
 * @param {perPage} number of publications per page
 * @returns {HTMLElement} DOM of the pagination fragment
 */
function decorateAllPublications({
  elContent, elFooter, jsonData, currentPage = 1, perPage = perPageList,
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
  if (elContent) {
    if (elContent.querySelector('ul')) elContent.querySelector('ul').outerHTML = dataContainer.outerHTML;
    else elContent.append(dataContainer);
    while (prevBtn.nextSibling && prevBtn.parentNode.children.length > 2) {
      prevBtn.parentNode.removeChild(prevBtn.nextSibling);
    }
    prevBtn.after(...decoratePaginateIndexes({
      list: jsonData, currentPage, elContent, elFooter,
    }));
    if (currentPage === 1 || jsonData.length === 0 || jsonData.length <= perPage) {
      prevBtn.classList.remove('cursor-pointer');
      prevBtn.classList.add('cursor-not-allowed');
    } else {
      prevBtn.classList.remove('cursor-not-allowed');
      prevBtn.classList.add('cursor-pointer');
      prevBtn.addEventListener(
        'click',
        () => decorateAllPublications({
          elContent, elFooter, jsonData, currentPage: (currentPage - 1), perPage: perPageList,
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
          elContent, elFooter, jsonData, currentPage: (currentPage + 1), perPage: perPageList,
        }),
      );
    }
  }
}
/**
 * Loads the selected image properties.
 * @param {el} details of the selected image
 * @param {image} details of the selected image
 * @returns {HTMLElement} The details of the selected image properties
 */
function selectImage(el, image) {
  const link = `${baseOriginURL}${image.seoUrl}`;
  const containerEl = el.querySelector('span.icon-close').nextElementSibling;
  containerEl.innerHTML = '';
  const content = div(
    { class: 'max-h-72 text-white overflow-scroll mt-auto mb-5' },
    p({ class: 'text-lg text-gray-400 leading-6 tracking-wide font-medium mb-2' }, 'ab1791'),
    p({ class: 'text-2xl leading-8 tracking-tight mb-4' }, image.title),
  );
  const legendDesc = p({ class: '' });
  if (image.legend) legendDesc.innerHTML = image.legend;
  content.append(legendDesc);
  containerEl.append(
    div({
      class: 'bg-[length:100%_100%] lg:bg-[length:70%_100%] bg-no-repeat bg-center bg-origin-content',
      style: `background-image: url('${link}')`,
    }),
    content,
  );
  [...el.querySelector('.carousel').children].forEach((carouselItem) => {
    if (link === carouselItem.children[0].src) carouselItem.children[0].classList.add(...'border-4 border-cyan-500'.split(' '));
    else carouselItem.children[0].classList.remove(...'border-4 border-cyan-500'.split(' '));
  });
}

/**
 * Loads the selected image properties.
 * @param {el} details of the selected image
 * @param {allImages} details of the selected image including previous
 * and next element with buttons
 * @returns {HTMLElement} The details of the selected image properties
 */
function decorateAllImages({ el, allImages }) {
  const allImageContainer = ul({
    class: 'carousel grid grid-flow-col grid overflow-x-auto auto-cols-[50%] sm:auto-cols-[33%] md:auto-cols-[25%] lg:auto-cols-[20%] xl:auto-cols-[15%] space-x-2 snap-x snap-mandatory gap-6 rounded-md scroll-smooth',
  });
  allImages.forEach((image) => {
    const linkArr = image.url.split('/');
    allImageContainer.append(
      li(
        {
          class: 'card carousel-slider size-48 relative flex flex-col rounded-lg snap-start duration-500 ease-in-out inset-0 transition-transform transform cursor-pointer',
          onclick: () => selectImage(el, image),
        },
        img({
          src: `${baseOriginURL}${image.seoUrl}`,
          alt: linkArr[linkArr.length - 1].replace('.jpg', ''),
          class: 'size-full shadow-lg rounded-md aspect-square',
        }),
        div(
          { class: 'absolute size-full hover:bg-gray-800/50 rounded-md transition duration-300' },
          span({ class: 'absolute size-4 bottom-2 right-2 icon icon-Expand' }),
        ),
      ),
    );
  });
  el.append(
    div(
      { class: 'container size-full relative mx-auto flex flex-col break-words transparent px-4 md:px-0 py-6' },
      span({
        class: 'icon icon-close block absolute size-10 cursor-pointer top-6 right-4',
        onclick: () => hideDrawer('drawer-all-images'),
      }),
      div({ class: 'flex-auto grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-6 mb-5 mt-10 md:mt-0 pt-8' }),
      div(
        { class: 'carousel-wrapper', id: randomUUID },
        div(
          { class: 'flex flex-col' },
          div(
            { class: 'w-auto flex gap-2 items-center text-base text-white' },
            'Filter by',
            select(
              { class: 'rounded-full border border-white px-4 py-2 bg-transparent' },
              option('IHC-P'),
              option('ChIP'),
              option('ICC-IF'),
              option('IP'),
              option('WB'),
            ),
          ),
          div(
            { class: 'flex flex-row justify-between my-4' },
            span({ class: 'text-white' }, `${allImages.length} Images for All applications`),
            div(
              { class: 'flex gap-x-3 shrink-0 carousel-controls' },
              button({ class: 'text-white rotate-90 rounded-full border border-white p-1', 'data-carousel-prev': '' }, span({ class: 'icon icon-chevron-down invert block size-4' })),
              button({ class: 'text-white -rotate-90 rounded-full border border-white p-1', 'data-carousel-next': '' }, span({ class: 'icon icon-chevron-down invert block size-4' })),
            ),
          ),
        ),
        allImageContainer,
      ),
    ),
  );
  selectImage(el, allImages[0]);
}

/**
 * Loads all publications with details inlcuding paginations
 * by keypressing on View All button
 * @param {event} details of the selected image
 * @param {jsonData} all publications data
 * @returns {HTMLElement} The root element of publicationdrawercontent
 */
const filterPublications = debounce(async (event, jsonData) => {
  const { value } = event.target;
  const filterPublicationData = jsonData.filter((data) => {
    const conclusion = publicationFilterByFields.map((kys) => data[kys].includes(value));
    return conclusion.includes(true);
  });
  decorateAllPublications({
    elContent: publicationDrawerContent,
    elFooter: publicationDrawerFooter,
    jsonData: filterPublicationData,
    currentPage: 1,
    perPage: perPageList,
  });
}, 800);

/**
 * Loads all imagesby keypressing on View All button
 * @param {allImageCount} number of images
 * @param {jsonData} all publications data
 * @returns {HTMLElement} The root element of publicationdrawercontent
 */
function showAllImages(allImageCount, image) {
  if (allImageCount > 0) showDrawer('drawer-all-images');
  selectImage(imagesBackdropContent, image);
  /* eslint-disable no-new */
  new Carousel({
    wrapperEl: randomUUID,
    mainEl: '.carousel',
    delay: 5000,
    previousElAction: 'button[data-carousel-prev]',
    nextElAction: 'button[data-carousel-next]',
    isAutoPlay: false,
    copyChild: 4,
  });
}

/**
 * Loads reactivitytype icon
 * @param {reactivityType} for fetching svg icon
 * @returns {HTMLElement} svg icon related to reactivitytype
 */
const getReactivityStatus = (reactivityType) => {
  if (reactivityType === 'TESTED_AND_REACTS') return '/icons/tested.svg';
  if (reactivityType === 'REACTS') return '/icons/expected.svg';
  if (reactivityType === 'EXPECTED_TO_REACT') return '/icons/predicted.svg';
  return '/icons/not-recommended.svg';
};

const getTableCSS = (reactivityType) => (reactivityType === 'TESTED_AND_REACTS' ? 'size-6' : 'size-3');
/**
 * Display product promise static content for reactivitytable data
 */
function productPromise() {
  return div(
    { class: 'w-full flex flex-col md:flex-row md:items-center gap-3 font-semibold text-sm p-4 bg-white mb-4 tracking-wide' },
    span({ class: 'flex shrink-0' }, 'Product promise'),
    ul(
      { class: 'flex flex-wrap gap-x-4 gap-y-2 text-xs md:ml-4 mr-4' },
      li(
        { class: 'gap-x-2 inline-flex items-center' },
        img({ class: 'size-8', src: '/icons/tested.svg', alt: 'Reactivity Tested' }),
        'Tested',
      ),
      li(
        { class: 'gap-x-2 inline-flex items-center' },
        img({ class: 'size-4', src: '/icons/expected.svg', alt: 'Reactivity Expected' }),
        'Expected',
      ),
      li(
        { class: 'gap-x-2 inline-flex items-center' },
        img({ class: 'size-3', src: '/icons/predicted.svg', alt: 'Reactivity Predicted' }),
        'Predicted',
      ),
      li(
        { class: 'gap-x-2 inline-flex items-center' },
        img({ class: 'size-3', src: '/icons/not-recommended.svg', alt: 'Reactivity Not Recommended' }),
        'Not recommended',
      ),
    ),
    decorateModals(a(
      {
        class: 'w-max h-8 inline-flex items-center shrink-0 gap-x-2 px-4 mt-2 md:mt-0 md:ml-auto rounded-full text-base border border-black',
        href: '/modals/product-promise',
      },
      'Learn more',
      img({ class: 'size-4', src: '/icons/plus.svg', alt: 'plus' }),
    )),
  );
}
/**
 * Loads all publications and images for reactivity data
 * @param {images} fetching image under image section
 * @param {publications} fetching publications under publications section
 * @param {allPublicationCount} displaying all publication in View All button
 * @param {allImageCount} displaying all images in View All button
 * @returns {HTMLElement} publications and images section in reactivitydata table
 */
function publicationsAndImageSection({
  images, publications, allPublicationCount = 0, allImageCount = 0,
}) {
  const publicationsContent = ul({ class: 'space-y-4' });
  const imagesContent = ul({ class: 'grid grid-cols-3 gap-4' });

  if (publications && publications.length > 0) {
    publications.forEach((pub) => {
      publicationsContent.appendChild(
        li(
          { class: 'flex-col font-normal text-sm p-4 border-t bg-white rounded-lg justify-between min-h-32' },
          div(
            { class: 'flex justify-between text-xs text-gray-700 font-semibold' },
            span(`${pub.journal}:${pub.volume}:${pub.pages}`),
            span({ class: 'text-right' }, pub.publicationDate.substring(0, 4)),
          ),
          div({ class: 'text-black py-2' }, pub.name),
          div({ class: 'flex text-gray-700 font-semibold text-xs' }, pub.authors),
          a(
            {
              class: 'flex gap-x-1 text-gray-700 py-2 hover:underline',
              target: '_blank',
              href: `https://pubmed.ncbi.nlm.nih.gov/37192628/${pub.pubmedId}`,
            },
            img({ class: 'size-3', src: '/icons/share-icon.svg', alt: 'Share Link' }),
            `PubMed ${pub.pubmedId}`,
          ),
        ),
      );
    });
  }

  if (images && images.length > 0) {
    images.forEach((image) => {
      const linkArr = image.url.split('/');
      imagesContent.append(
        li(
          {
            class: 'relative inline-flex cursor-pointer',
            onclick: () => showAllImages(allImageCount, image),
          },
          img({
            src: `${baseOriginURL}${image.seoUrl}`,
            alt: linkArr[linkArr.length - 1].replace('.jpg', ''),
            class: 'size-full shadow-lg rounded aspect-square',
          }),
          div(
            { class: 'absolute size-full hover:bg-gray-800/50 rounded transition duration-300' },
            span({ class: 'absolute size-4 bottom-2 right-2 icon icon-Expand' }),
          ),
        ),
      );
    });
  }

  return div(
    { class: 'flex flex-col lg:flex-row mt-6 gap-y-6 gap-x-8' },
    div(
      { class: 'w-full space-y-4' },
      div(
        { class: 'flex items-center justify-between' },
        h2({ class: 'text-slate-900 font-semibold text-lg' }, 'Publications'),
        button(
          {
            type: 'button',
            onclick: () => {
              if (allPublicationCount > 0) showDrawer('drawer-all-publications');
            },
            class: 'inline-flex items-center px-4 py-1.5 text-sm font-medium text-center text-white bg-black/80 rounded-full hover:bg-black/90',
          },
          'View all',
          span(
            { class: 'inline-flex items-center justify-center h-4 ms-2 p-1 text-xs font-semibold tracking-wider bg-neutral-500/50 rounded-full' },
            allPublicationCount,
          ),
        ),
      ),
      publicationsContent,
    ),
    div(
      { class: 'w-full space-y-4' },
      div(
        { class: 'flex items-center justify-between' },
        h2({ class: 'text-slate-900 font-semibold text-lg' }, 'Images'),
        button(
          {
            type: 'button',
            onclick: () => showAllImages(allImageCount),
            class: 'inline-flex items-center px-4 py-1.5 text-sm font-medium text-center text-white bg-black/80 rounded-full hover:bg-black/90',
          },
          'View all',
          span(
            { class: 'inline-flex items-center justify-center h-4 ms-2 p-1 text-xs font-semibold tracking-wider bg-neutral-500/50 rounded-full' },
            allImageCount,
          ),
        ),
      ),
      imagesContent,
    ),
  );
}

/**
 * display all application reactivity data for primary-antibodies
 * @param {tableData} fetching for all reactivitydataf from this JSON
 * @param {application} Fetching individual application name
 * for application buttons
 * @returns {HTMLElement} for reactivitydata for primary-antibodies
 */
function allApplicationTableData(tableData, application) {
  const allTabData = div({ class: 'individualdata overflow-scroll' });
  const tableColumn = thead();
  const tableHeadingRow = tr(th({ class: 'font-semibold text-black text-sm bg-white border border-b-2 px-2 py-3' }));
  application.forEach((name) => {
    tableHeadingRow.appendChild(th({ class: 'font-semibold text-black text-sm bg-white border border-b-2 px-2 py-3' }, name));
  });
  tableColumn.appendChild(tableHeadingRow);
  const tbodyContent = tbody();
  const tableHeading = table({ class: 'w-full table-auto md:table-fixed border-separate indent-2 text-left' }, tableColumn);
  tableData.forEach((row) => {
    const tablerow = tr();
    tablerow.appendChild(th(
      { class: 'p-4 text-sm font-semibold break-words bg-white md:p-2' },
      row.species,
    ));
    application.forEach((name) => {
      const tableCell = td(
        { class: 'p-4 font-normal bg-white' },
        img({
          class: getTableCSS(row[name].suitability),
          src: getReactivityStatus(row[name].suitability),
          alt: row[name].suitability,
        }),
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
  const response = await getProductResponse();
  const {
    reactivitytabledata = [], publicationsjson = '', imagesjson = '',
    reactivityapplications, numpublications,
  } = response[0].raw;
  const parsedImages = JSON.parse(imagesjson);
  const parsedPublications = JSON.parse(publicationsjson);
  const reactivityData = div(
    { class: 'relative w-full box-content ' },
    h2({ class: 'font-semibold text-black text-2xl leading-5 tracking-tight mb-4' }, 'Reactivity Data'),
    span({ class: 'text-base tracking-wide mb-4' }, 'Select an application'),
  );
  let imagesBackdropBlockEl;
  let publicationDrawerBlockEl;
  const reactivityApplicationWrapper = div({ class: 'reactivityApplicationWrapper w-full mt-4' });

  if (reactivityapplications && reactivitytabledata.length > 0) {
    const buttonsPanel = div(
      { class: 'w-full flex flex-wrap gap-2 text-black tracking-wide font-semibold text-sm pb-5' },
      button({ class: 'px-6 py-2 border-black boarder-solid  bg-black text-white rounded-full' }, 'All applications'),
    );
    const filteredPublications = paginateData(parsedPublications, 1, 2);
    const filteredImages = paginateData(parsedImages, 1, 3);
    const blockSection = publicationsAndImageSection({
      images: filteredImages,
      publications: filteredPublications,
      allPublicationCount: numpublications,
      allImageCount: parsedImages.length,
    });
    reactivityapplications.forEach((name) => {
      buttonsPanel.appendChild(button({ class: 'px-6 py-2 border border-black text-black rounded-full' }, name));
    });
    const reactivityJson = JSON.parse(reactivitytabledata);
    const tableContent = allApplicationTableData(reactivityJson, reactivityapplications);
    reactivityApplicationWrapper.appendChild(buttonsPanel);
    const productInfo = productPromise();
    reactivityApplicationWrapper.appendChild(productInfo);
    reactivityApplicationWrapper.appendChild(tableContent);
    reactivityApplicationWrapper.appendChild(blockSection);
  }
  if (typeof parsedPublications === 'object' && parsedPublications.length > 0) {
    const searchBar = div(
      { class: 'relative' },
      input({
        type: 'text',
        class: 'block w-full py-2 pl-3 pe-8 text-sm text-gray-600 tracking-wide bg-white border border-slate-300 focus-visible:outline-none focus-visible:border-sky-500 focus-visible:ring-1 focus-visible:ring-sky-500 rounded-full',
        placeholder: 'Search by topic, author or PubMed ID',
        onkeyup: (e) => filterPublications(e, parsedPublications),
      }),
      span({ class: 'icon icon-search w-5 h-5 absolute end-2.5 bottom-2.5 cursor-pointer' }),
    );
    const { block: publicationDrawerBlock, drawerBody, drawerFooter } = await decorateDrawer({
      id: 'drawer-all-publications', title: 'Publications', isBackdrop: true,
    });
    publicationDrawerContent = drawerBody;
    publicationDrawerFooter = drawerFooter;
    if (publicationDrawerContent) {
      publicationDrawerContent.append(searchBar);
      decorateAllPublications({
        elContent: publicationDrawerContent,
        elFooter: publicationDrawerFooter,
        jsonData: parsedPublications,
      });
      publicationDrawerFooter.append(paginateIndexesTag);
    }
    publicationDrawerBlockEl = publicationDrawerBlock;
  }

  if (typeof parsedImages === 'object' && parsedImages.length > 0) {
    const { block: imagesBackdropBlock, backdrop: imagesContentContainer } = await decorateDrawer({
      id: 'drawer-all-images',
      title: 'Images',
      isBackdrop: false,
      isDrawer: false,
      closeBackdrop: false,
      isNeeded: false,
      existedEl: publicationDrawerBlockEl,
    });
    imagesBackdropContent = imagesContentContainer;
    if (imagesBackdropContent) {
      decorateAllImages({ el: imagesBackdropContent, allImages: parsedImages });
    }
    imagesBackdropBlockEl = imagesBackdropBlock;
  }

  block.classList.add(...'container mx-auto px-6 md:px-0'.split(' '));
  block.append(
    publicationDrawerBlockEl,
    imagesBackdropBlockEl,
    reactivityData,
    reactivityApplicationWrapper,
  );
  decorateIcons(block);
}
