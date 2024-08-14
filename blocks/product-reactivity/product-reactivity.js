import { getProductResponse } from '../../scripts/search.js';
import {
  div, h2, span, button, img, li, ul, thead, tr, table, th, a, tbody, td,
} from '../../scripts/dom-builder.js';
import { decorateModals } from '../../scripts/modal.js';
import { paginateData } from '../../scripts/scripts.js';

const getReactivityStatus = (reactivityType) => {
  if (reactivityType === 'Tested') return '/icons/tested.svg';
  if (reactivityType === 'REACTS') return '/icons/expected.svg';
  if (reactivityType === 'EXPECTED_TO_REACT') return '/icons/predicted.svg';
  return '/icons/not-recommended.svg';
};

const getTableCSS = (reactivityType) => (reactivityType === 'Tested' ? 'w-6' : 'w-3');

function productPromise() {
  return div(
    { class: 'product-promise-section font-semibold text-sm p-4 bg-white gap-y-4 justify-between flex items-center mb-4 max-[959px]:flex-col max-[959px]:w-[100%] max-[959px]:items-start' },
    div(
      { class: 'relative gap-x-6 gap-y-4 flex flex-wrap text-xs' },
      span({ class: 'tracking-wide gap-x-2 flex items-center max-[959px]:w-full' }, 'Product promise'),
      span(
        { class: 'tracking-wide gap-x-2 inline-flex items-center' },
        img({ class: 'w-8', src: '/icons/tested.svg', alt: 'Reactivity Tested' }),
        'Tested',
      ),
      span(
        { class: 'tracking-wide gap-x-2 inline-flex items-center' },
        img({ class: 'w-4', src: '/icons/expected.svg', alt: 'Reactivity Expected' }),
        'Expected',
      ),
      span(
        { class: 'tracking-wide gap-x-2 inline-flex items-center' },
        img({ class: 'w-3', src: '/icons/predicted.svg', alt: 'Reactivity Predicted' }),
        'Predicted',
      ),
      span(
        { class: 'tracking-wide gap-x-2 inline-flex items-center' },
        img({ class: 'w-3', src: '/icons/not-recommended.svg', alt: 'Reactivity Not Recommended' }),
        'Not recommended',
      ),
    ),
    decorateModals(a(
      { class: 'button h-8 flex items-center gap-x-2 rounded-full px-3 py-2 text-base tracking-wide border border-black', href: '/modals/product-promise' },
      span({ class: 'learnmore align-center' }, 'Learn more'),
      img({ class: 'w-4', src: '/icons/plus.svg', alt: 'plus' }),
    )),
  );
}

function pubAndImageSection(images, publicationArray, allCount) {
  const pubandimagesection = div({ class: 'col-span-4 lg:flex lg:space-x-8' });
  const publicationsContent = div();
  if (publicationArray) {
    publicationArray.forEach((pub) => {
      const publicationData = pub;
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
  const imagesection = div(
    { class: 'w-full lg:w-1/2 mt-4 space-y-4' },
    div(
      { class: 'flex items-center justify-between' },
      h2({ class: 'text-[#2A3C3C] font-semibold text-lg' }, 'Images'),
      button(
        {
          type: 'button',
          onclick: () => {
          },
          class: 'inline-flex items-center px-4 py-1.5 text-sm font-medium text-center text-white bg-black/80 rounded-full hover:bg-black/90',
        },
        'View all',
        span(
          { class: 'inline-flex items-center justify-center h-4 ms-2 p-1 text-xs font-semibold tracking-wider bg-neutral-500/50 rounded-full' },
          images.length,
        ),
      ),
    ),
    imagecolumn,
  );
  if (publicationArray.length) {
    const publicationsection = div(
      { class: 'w-full lg:w-1/2 mt-4 space-y-4' },
      div(
        { class: 'flex items-center justify-between' },
        h2({ class: 'text-[#2A3C3C] font-semibold text-lg' }, 'Publications'),
        button(
          {
            type: 'button',
            onclick: () => {
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
    reactivitytabledata = [], publicationsjson = '', images = [],
    reactivityapplications, numpublications,
  } = response[0].raw;
  const parsedPublications = JSON.parse(publicationsjson);
  if (
    reactivityapplications
    && (typeof parsedPublications === 'object' && parsedPublications.length > 0)
    && images.length > 0
  ) {
    const reactivityData = div(
      { class: 'relative w-full box-content ' },
      h2({ class: 'font-semibold text-black text-[24px] leading-[1.33] tracking-[-.03125rem] mb-4' }, 'Reactivity Data'),
      span({ class: 'text-base tracking-wide mb-4' }, 'Select an application'),
    );
    const buttonsPanel = div(
      { class: 'flex gap-2 flex-wrap text-black tracking-[2px] font-semibold text-sm pb-5 max-[959px]:w-[100%]' },
      button({ class: 'px-6 py-3 border-black boarder-solid  bg-black text-white font-semibold rounded-[28px] tracking-[.2px]' }, 'All applications'),
    );

    reactivityapplications.forEach((name) => {
      buttonsPanel.appendChild(button({ class: 'px-6 py-3 border border-black text-black font-semibold rounded-[28px] tracking-[.2px]' }, name));
    });

    const reactivityApplicationWrapper = div({ class: 'reactivityApplicationWrapper w-full mt-4' });
    reactivityApplicationWrapper.appendChild(buttonsPanel);
    const productInfo = productPromise();
    reactivityApplicationWrapper.appendChild(productInfo);
    const reactivityJson = reactivitytabledata;
    const tableContent = allApplicationTableData(reactivityJson, reactivityapplications);
    reactivityApplicationWrapper.appendChild(tableContent);
    const filteredPublications = paginateData(parsedPublications, 1, 2);
    const filteredImages = paginateData(images, 1, 3);
    const pubandimages = pubAndImageSection(filteredImages, filteredPublications, numpublications);
    reactivityApplicationWrapper.appendChild(pubandimages);
    block.append(reactivityData);
    block.appendChild(reactivityApplicationWrapper);
  }
}
