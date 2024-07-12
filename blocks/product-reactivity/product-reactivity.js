import { getProductResponse } from '../../scripts/search.js';
import {
  div, h2, span, button, img, li, ul, thead, tr, table, th, a, tbody, td,
} from '../../scripts/dom-builder.js';

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

function productPromise() {
  const productNotes = div({ class: 'product-promise-section font-semibold text-sm p-4 bg-white gap-y-4 justify-between flex items-center mb-4 ' });
  const productNotesColumn = div(
    { class: 'relative gap-x-6 gap-y-4 flex flex-wrap' },
    span({ class: 'text-xs tracking-[.0125rem] gap-x-2 flex items-center' }, 'Product promise'),
    span(
      { class: 'text-xs tracking-[.0125rem] gap-x-2 flex items-center' },
      span(img({ class: 'w-8', src: '/icons/tested.svg' })),
      span('Tested'),
    ),
    span(
      { class: 'text-xs tracking-[.0125rem] gap-x-2 flex items-center' },
      span(img({ class: 'w-4', src: '/icons/expected.svg' })),
      span('Expected'),
    ),
    span(
      { class: 'text-xs tracking-[.0125rem] gap-x-2 flex items-center' },
      span(img({ class: 'w-3', src: '/icons/predicted.svg' })),
      span('Predicted'),
    ),
    span(
      { class: 'text-xs tracking-[.0125em] gap-x-2 flex items-center' },
      span(img({ class: 'w-3', src: '/icons/not-recommended.svg' })),
      span('Not recommended'),
    ),
    button({ class: 'h-8 rounded-2xl flex pl-40 px-3 py-2 text-xs tracking-[.0125rem] border-black' }, span({ class: 'learnmore' }, 'learn more')),
  );
  productNotes.appendChild(productNotesColumn);
  return productNotes;
}

function publicationsAndImageSection(images, publicationArray) {
  const pubandimagesection = div({ class: 'flex col-span-4' });
  const publicationsection = div({ class: 'lg:w-1/2' }, div({ class: 'flex items-center justify-between' }, h2({ class: 'text-[#2A3C3C] font-semibold text-lg' }, 'Publications')));
  const publicationsContent = div();
  publicationArray.forEach((pub) => {
    const publicationData = JSON.parse(pub);
    const publicationJournalAndVolume = div(
      { class: 'flex text-gray-400 font-semibold text-xs justify-between' },
      span(`${publicationData.journal}:${publicationData.volume}:${publicationData.pages}`),
      span({ class: 'text-right' }, publicationData.publicationDate.substring(0, 4)),
    );
    publicationsContent.appendChild(div(
      { class: 'py-2 gap-4' },
      div(
        { class: ' flex-col font-normal text-sm p-4 border-t-[1px] bg-white rounded-lg justify-between min-h-32' },
        publicationJournalAndVolume,
        div({ class: 'text-black py-2' }, publicationData.name),
        div({ class: 'flex text-gray-400 font-semibold text-xs' }, publicationData.authors),
        a({ class: 'flex gap-x-1 text-gray-400 py-2 hover:underline', target: '_blank', href: `https://pubmed.ncbi.nlm.nih.gov/37192628/${publicationData.pubmedId}` }, img({ class: 'w-3', src: '/icons/share-icon.svg' }), `PubMed ${publicationData.pubmedId}`),
      ),
    ));
  });
  const ulimage = ul({ class: 'flex gap-2 justify-center overflow-hidden hover:cursor-pointer opacity-100' });
  images.forEach((image) => {
    ulimage.append(li({ class: 'bg-white hover:cursor-pointer opacity-100 text-[#00000080] bg-black focus:outline-none' }, img({ src: image, style: 'width: 100%; height: auto;' })));
  });
  const imagecolumn = div({ class: 'mt-1 mb-6 py-2' }, div({ class: 'flex gap-4 border-1 border-solid' }, ulimage));
  const imagesection = div({ class: 'lg:w-1/2 ml-5' }, h2({ class: 'text-[#2A3C3C] font-semibold text-lg ' }, 'Images'), imagecolumn);
  publicationsection.appendChild(publicationsContent);
  pubandimagesection.appendChild(publicationsection);
  pubandimagesection.appendChild(imagesection);
  return pubandimagesection;
}

function allApplicationTableData(reacttable, data, heading) {
  const tbodyContent = tbody();
  // eslint-disable-next-line no-console
  const tableHeading = table({ class: 'w-full border-separate indent-0' }, reacttable);
  data.forEach((row) => {
    const rowObj = JSON.parse(row);
    const tablerow = tr();
    tablerow.appendChild(th({ class: 'p-4 font-normal text-left bg-white w-1/5' }, rowObj.species));
    heading.forEach((name) => {
      const tableCell = td(
        { class: 'p-4 font-normal text-left bg-white w-1/5' },
        img({ class: 'w-3', src: getReactivityStatus(rowObj[name]) }),
      );
      tablerow.appendChild(tableCell);
    });
    tbodyContent.appendChild(tablerow);
    tableHeading.appendChild(tbodyContent);
  });
  return tableHeading;
}

export default async function decorate(block) {
  const response = await getProductResponse();
  const reactivityData = div(
    { class: 'relative max-w-7xl box-content' },
    h2({ class: 'font-semibold text-black text-[24px] leading-[1.33] tracking-[-.03125rem]' }, 'Reactivity Data'),
    span({ class: 'text-base tracking-wide mb-4' }, 'Select an application'),
  );
  const buttonsPanel = div({ class: 'flex gap-2 text-black tracking-[2px] font-semibold text-sm pb-5' });
  buttonsPanel.appendChild(button({ class: 'px-6 py-3 border-black boarder-solid  bg-black text-white font-semibold rounded-[28px]' }, 'All applications'));
  const reactivityApplication = response[0].raw.reactivityapplications;
  const images = response[0].raw.images.slice(0, 3);
  const tableHeading = thead();
  const tablerow = tr(th({ class: 'font-semibold text-black text-sm text-left bg-white p-4 border-b-2' }));
  reactivityApplication.forEach((name) => {
    tablerow.appendChild(th({ class: 'font-semibold text-black text-sm text-left bg-white p-4 border-b-2' }, name));
    buttonsPanel.appendChild(button({ class: 'px-6 py-3 border border-black text-black  bg-white  font-semibold rounded-[28px]' }, name));
  });

  const reactivityTable = table({ class: 'reactivityTable w-full' });
  reactivityTable.appendChild(buttonsPanel);
  tableHeading.appendChild(tablerow);
  const tablePanel = div({ class: 'tablePanel' });
  const tabPanel = div({ class: 'tabPanel gap-8 grid-cols-4 auto-rows-auto grid mt-6' });
  const tabPanelInfo = div({ class: 'mt-4 col-span-4' });
  const productInfo = productPromise();
  tabPanel.appendChild(tabPanelInfo);
  tablePanel.appendChild(tabPanel);
  tabPanelInfo.appendChild(productInfo);
  tabPanel.appendChild(tabPanelInfo);
  reactivityTable.appendChild(productInfo);
  const reactivityJson = response[0].raw.reactivitytabledata;
  const tableContent = allApplicationTableData(tableHeading, reactivityJson, reactivityApplication);
  reactivityTable.appendChild(tableContent);
  const publicationArray = response[0].raw.publicationsjson.slice(0, 2);
  const pubandimagesection = publicationsAndImageSection(images, publicationArray);
  reactivityTable.appendChild(pubandimagesection);
  block.append(reactivityData);
  block.appendChild(reactivityTable);
}
