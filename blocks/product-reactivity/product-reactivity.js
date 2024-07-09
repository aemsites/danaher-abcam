import { getProductResponse } from '../../scripts/search.js';
import {
  div, h2, span, button, img, li, ul, thead, tr, table, th,
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
    span({ class: 'text-xs tracking-[.0125rem] gap-x-2 flex items-center' }, span(img({ class: 'w-4', src: '/icons/expected.svg' })), span('Expected')),
    span(
      { class: 'text-xs tracking-[.0125rem] gap-x-2 flex items-center' },
      span(img({ class: 'w-3', src: '/icons/predicted.svg' })),
      span('Predicted'),
      span({ class: 'text-xs tracking-[.0125em] gap-x-2 flex items-center' }, span(img({ class: 'w-3', src: '/icons/not-recommended.svg' })), span('Not recommended')),
      button({ class: 'h-8 rounded-2xl flex pl-40 px-3 py-2 text-xs tracking-[.0125rem] border-black' }, span({ class: 'learnmore' }, 'learn more')),
    ),
  );
  productNotes.appendChild(productNotesColumn);
  return productNotes;
}

function publicationsAndImageSection(images) {
  const pubandimagesection = div({ class: 'flex col-span-4' });
  const publicationsection = div({ class: 'lg:w-1/2' }, div({ class: 'flex items-center justify-between' }, h2({ class: 'text-[#2A3C3C] font-semibold text-lg' }, 'Publications')));
  const publicationsContent = ul({ class: 'gap-4' }, div({ class: 'flex bg-white rounded-lg justify-between' }, 'Loss of GGN leads to pre-implantation embryonic lethality and compromised male meiotic DNA double strand break repair in the mouse.'));
  const ulimage = ul({ class: 'flex bg-white gap-4 justify-center overflow-hidden' });
  images.forEach((image) => {
    ulimage.append(li({ class: 'hover:cursor-pointer opacity-100' }, img({ src: image })));
  });
  const imagecolumn = div({ class: 'mt-4 mb-6 ' }, div({ class: 'flex gap-4' }, ulimage));
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
    buttonsPanel.appendChild(button({ class: 'relative px-6 py-3 border-black text-black  bg-black text-white boarder-black boarder-solid font-semibold rounded-[28px]' }, name));
  });
  const reactivityTable = div({ class: 'reactivityTable' });
  reactivityTable.appendChild(buttonsPanel);
  // tablecontent logic start
  const tableData = [];
  const reactivity = JSON.parse(response[0].raw.reactivityjson);

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
  const pubandimagesection = publicationsAndImageSection(images);
  reactivityTable.appendChild(pubandimagesection);
  block.append(reactivityData);
  block.appendChild(reactivityTable);
}
