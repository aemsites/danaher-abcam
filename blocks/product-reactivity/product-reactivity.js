import { getProductResponse } from '../../scripts/search.js';
import {
  div, h2, span, button, img, li, ul, thead, tr, table, th, a
} from '../../scripts/dom-builder.js';

const applicationsMap = {
  'IHC-P': 'ihc_p',
  WB: 'wb',
  IP: 'ip',
};

const getReactivityStatus = (reactivityType) => {
  if (reactivityType === 'TESTED_AND_REACTS') {
    return 'Tested';
  } if (reactivityType === 'REACTS') {
    return 'Expected';
  }
  if (reactivityType === 'EXPECTED_TO_REACT"') {
    return 'Predicted';
  }
  else {
    return 'Not recommended';
  }

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
    span({ class: 'text-xs tracking-[.0125rem] gap-x-2 flex items-center' },
      span(img({ class: 'w-4', src: '/icons/expected.svg' })), span('Expected')),
    span({ class: 'text-xs tracking-[.0125rem] gap-x-2 flex items-center' },
      span(img({ class: 'w-3', src: '/icons/predicted.svg' })), span('Predicted')),
    span({ class: 'text-xs tracking-[.0125em] gap-x-2 flex items-center' },
      span(img({ class: 'w-3', src: '/icons/not-recommended.svg' })), span('Not recommended'),

    ), button({ class: 'h-8 rounded-2xl flex pl-40 px-3 py-2 text-xs tracking-[.0125rem] border-black' }, span({ class: 'learnmore' }, 'learn more')));
  productNotes.appendChild(productNotesColumn);
  return productNotes;
}

function publicationsAndImageSection(images, publicationArray) {
  const pubandimagesection = div({ class: 'flex col-span-4' });
  const publicationsection = div({ class: 'lg:w-1/2' }, div({ class: 'flex items-center justify-between' }, h2({ class: 'text-[#2A3C3C] font-semibold text-lg' }, 'Publications')));
  console.log('full response');
  console.log(publicationArray);
  const publicationsContent = div();
  publicationArray.forEach((pub) => {
    const publicationData = JSON.parse(pub);
    const publicationJournalAndVolume = div({ class: 'flex text-gray-400 font-semibold text-xs justify-between' },
      span(publicationData.journal + ':' + publicationData.volume + ':' + publicationData.pages), span({ class: 'text-right' }, publicationData.publicationDate.substring(0, 4)))
    publicationsContent.appendChild(div({ class: 'py-2 gap-4' },
      div({ class: ' flex-col font-normal text-sm p-4 border-t-[1px] bg-white rounded-lg justify-between min-h-32' },
        publicationJournalAndVolume,
        div({ class: 'text-black py-2' }, publicationData.name),
        div({ class: 'flex text-gray-400 font-semibold text-xs' },
          publicationData.authors),
        a({ class: 'flex gap-x-1 text-gray-400 py-2 hover:underline', target: '_blank', href: `https://pubmed.ncbi.nlm.nih.gov/37192628/${publicationData.pubmedId}` }, img({ class: 'w-3', src: '/icons/share-icon.svg' }), `PubMed ${publicationData.pubmedId}`))));
  });
  const ulimage = ul({ class: 'flex gap-2 justify-center overflow-hidden hover:cursor-pointer opacity-100' });
  images.forEach((image) => {
    ulimage.append(li({ class: 'bg-white hover:cursor-pointer opacity-100 text-[#00000080] bg-black focus:outline-none' }, img({ src: image })));
  });
  const imagecolumn = div({ class: 'mt-1 mb-6 py-2' }, div({ class: 'flex gap-4 border-1 border-solid' }, ulimage));
  const imagesection = div({ class: 'lg:w-1/2 ml-5' }, h2({ class: 'text-[#2A3C3C] font-semibold text-lg ' }, 'Images'), imagecolumn);
  publicationsection.appendChild(publicationsContent);
  pubandimagesection.appendChild(publicationsection);
  pubandimagesection.appendChild(imagesection);
  return pubandimagesection;
}

function allApplicationTabeData(app) {
  const tablerow = thead(tr());
  const table1 = table({ class: 'w-full border-separate indent-0' }, 'hello table');
  return table1;
}

export default async function decorate(block) {
  const response = await getProductResponse();

  const reactivityData = div({ class: 'relative max-w-7xl box-content' }, h2(
    { class: 'font-semibold text-black text-[24px] leading-[1.33] tracking-[-.03125rem]' },
    'Reactivity Data',
  ), span({ class: 'text-base tracking-wide mb-4' }, 'Select an application'));

  const buttonsPanel = div({ class: 'flex gap-2 text-black tracking-[2px] font-semibold text-sm pb-5' });
  buttonsPanel.appendChild(button({ class: 'px-6 py-3 border-black boarder-solid  bg-black text-white font-semibold rounded-[28px]' }, 'All applications'));
  const jsonData = JSON.parse(JSON.stringify(response));
  const reactivityHeadingButtons = jsonData[0].raw.reactivityapplications;
  const reactivityApplication = JSON.parse(jsonData[0].raw.reactivityjson);
  const { speciesReactivity } = reactivityApplication;
  console.log('application data');
  console.log(reactivityApplication.applications);
  console.log('speciesReactivity');
  console.log(speciesReactivity);
  const images = jsonData[0].raw.images.slice(0, 3);
  const { applications } = reactivityApplication;
  const tableHeading = thead();
  const tablerow = tr();
  tablerow.appendChild(th({ class: 'text-black font-semibold text-sm text-left p-4 bg-white' }));
  reactivityHeadingButtons.forEach((name) => {
    buttonsPanel.appendChild(button({ class: 'px-6 py-3 border-black text-black  bg-black text-white boarder-black boarder-solid font-semibold rounded-[28px]' }, name));
  });
  const reactivityTable = div({ class: 'reactivityTable' });
  reactivityTable.appendChild(buttonsPanel);
  // tablecontent logic start
  const tableData = [];
  const reactivity = JSON.parse(response[0].raw.reactivityjson);
  const applicationTable = table({ class: 'w-full' });
  const tableHead = thead();
  const tableRow = tr();
  const tableTH = th(th({ class: 'text-black font-semibold text-sm text-left p-4 bg-white' }));
  tableRow.appendChild(tableTH);
  tableHead.appendChild(tableRow);
  applicationTable.appendChild(tableHead);
  reactivity.speciesReactivity.forEach((species) => {
    const speciesName = species.speciesDetail.name;
    const speciesReactivityStatus = getReactivityStatus(species.reactivityType);

    const existingEntry = tableData.find((entry) => entry.species === speciesName);
    if (!existingEntry) {
      const newEntry = {
        species: speciesName,
        ihc_p: speciesReactivityStatus,
        wb: speciesReactivityStatus,
        ip: speciesReactivityStatus,
      };

      tableData.push(newEntry);
    }

    reactivity.applications.forEach((app) => {
      app.species.forEach((appSpecies) => {
        if (appSpecies.speciesDetail.name === speciesName) {
          const appKey = applicationsMap[app.name];
          const speciesEntry = tableData.find((entry) => entry.species === speciesName);
          const reactivityStatus = getReactivityStatus(appSpecies.suitability);
          speciesEntry[appKey] = reactivityStatus;
        }
      });
    });
  });
  console.log('Application Table');
  console.log(applicationTable);
  console.log('tableData');
  console.log(tableData);
  // tablecontent logic end
  const reactivityJSON = JSON.parse(response[0].raw.reactivityjson);
  const tablePanel = div({ class: 'tablePanel' });
  const tabPanel = div({ class: 'tabPanel gap-8 grid-cols-4 auto-rows-auto grid mt-6' });
  const tabPanelInfo = div({ class: 'mt-4 col-span-4' });

  const productInfo = productPromise();
  tabPanel.appendChild(tabPanelInfo);
  tablePanel.appendChild(tabPanel);
  tabPanelInfo.appendChild(productInfo);
  tabPanel.appendChild(tabPanelInfo);
  reactivityTable.appendChild(productInfo);
  const tableContent = allApplicationTabeData(applications);
  reactivityTable.appendChild(tableContent);
  const publicationArray = response[0].raw.publicationsjson.slice(0, 2)
  const pubandimagesection = publicationsAndImageSection(images, publicationArray);
  reactivityTable.appendChild(pubandimagesection);
  block.append(reactivityData);
  block.appendChild(reactivityTable);
}
