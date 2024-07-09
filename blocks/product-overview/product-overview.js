import { decorateIcons } from '../../scripts/aem.js';
import {
  div, h6, p, h3, h5, ul, li, button, span,
} from '../../scripts/dom-builder.js';
import { getProductResponse } from '../../scripts/search.js';

function createKeyFactElement(key, value) {
  return div(
    { class: '' },
    h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, key),
    p({ class: 'text-base text-black' }, value),
  );
}

export default async function decorate(block) {
  const response = await getProductResponse();
  const rawData = response[0].raw;
  const targetJson = response[0].raw.targetjson;

  // Extracting alternativeNames array
  const data = JSON.parse(targetJson);
  const { alternativeNames } = data;
  const { title } = rawData;
  const { description } = rawData;
  const reviewSummary = JSON.parse(rawData.reviewssummaryjson);
  const { aggregatedRating, numberOfReviews } = reviewSummary;
  const dataIsotype = rawData.isotype;
  const { hostspecies } = rawData;
  const storageBuffer = rawData.formulation;
  const dataForm = rawData.form;
  const dataClonality = rawData.clonality;
  const immunogenObject = JSON.parse(rawData.immunogenjson);
  const dataImmunogen = immunogenObject.sensitivity;
  const directAlternativeData = rawData.directreplacementproductjson;
  const directAlternative = JSON.parse(directAlternativeData);
  const { name } = directAlternative;
  const { productCode } = directAlternative;
  const { categoryType } = directAlternative;
  const keyFactsElements = [];
  // if(aggregatedRating !== null || aggregatedRating !== undefined) {
  //   generateStarRating(aggregatedRating);
  // }
  if (dataIsotype) {
    keyFactsElements.push(createKeyFactElement('Isotype', dataIsotype));
  }
  if (dataIsotype) {
    keyFactsElements.push(createKeyFactElement('Host Species', hostspecies));
  }
  if (dataIsotype) {
    keyFactsElements.push(createKeyFactElement('Storage Buffer', storageBuffer));
  }
  if (dataForm) {
    keyFactsElements.push(createKeyFactElement('Form', dataForm));
  }
  if (dataClonality) {
    keyFactsElements.push(createKeyFactElement('Clonality', dataClonality));
  }

  block.classList.add('h-full', 'bg-white', 'col-span-7');

  // Constructing the container with title, description, alternative names, and key-value pairs
  const main = document.querySelector('main');
  if (main.querySelectorAll('div.section[data-tabname="Overview"]')) {
    const overviewContainer = div(
      { class: 'font-sans' },
      div({ class: 'text-black text-5xl pb-4 font-bold' }, title),
      div({ class: 'text-black text-xl font-normal tracking-wide' }, description),
      button(
        { class: 'flex items-end appearance-none my-4' },
        span({ class: 'relative pr-2 font-semibold top-[3px] text-black text-3xl' }, aggregatedRating),
        span({ class: 'pl-2 underline text-xl text-blue-950 font-lighter' }, `(${numberOfReviews} Reviews)`),
      ),
      div({ class: 'border-t-[1px] border-[#dde1e1] my-6' }),
      div({ class: 'text-[#9ca0a0] font-thin break-words' }, (`Alternative names=${alternativeNames}`)),
      div(
        { class: 'grid pt-10 max-[799px]:grid-cols-1' },
        div({ class: 'grid grid-cols-3 gap-x-3 gap-y-10' }, ...keyFactsElements),
      ),
      div({ class: 'mt-8 mb-2' }, createKeyFactElement('Immunogen', dataImmunogen)),
      div({ class: 'border-t-[1px] border-[#dde1e1] my-6' }),
      h3({ class: 'mb-6 font-semibold text-2xl text-[#2a3c3c]' }, 'Consider this alternative'),
      ul(
        { class: 'relative flex w-full overflow-x-auto overflow-y-hidden select-none scrollbar-hide flex-nowrap rounded-md gap-4 touch-pan-x' },
        li(
          { class: 'w-full h-44 bg-white' },
          button(
            { class: 'bg-white w-full border border-interactive-grey-transparent-active rounded-md hover:bg-[#0000000d] cursor-pointer text-left' },
            div({ class: 'h-[5px] mb-4', style: 'background: linear-gradient(90deg, #4ba6b3 0, #c9d3b7 35%, #ff8730 70%, #c54428)' }),
            p({ class: 'w-fit mx-4 px-2 py-1 rounded-md text-xs font-semibold bg-[#edf6f7] text-[#2c656b] border-blue-70 border ' }, categoryType),
            h5({ class: 'mt-4 mx-4 text-xs text-[#65797c]' }, (productCode)),
            h5({ class: 'pb-4 mt-2 mx-4 text-sm text-black-0' }, name),
            p({ class: 'border-t-[1px] border-[#dde1e1] my-6 mx-4' }),
          ),
        ),
      ),
    );
    decorateIcons(overviewContainer);
    block.appendChild(overviewContainer);
  } else if (main.querySelectorAll('div.section[data-tabname="Datasheet"]')) {
    const datasheetContainer = div(
      { class: 'font-sans' },
      div({ class: 'text-black text-5xl pb-4 font-bold' }, title),
      div({ class: 'text-black text-xl font-normal' }, description),
      div({ class: 'border-t-[1px] border-[#dde1e1] my-6' }),
      div({ class: 'text-[#9ca0a0] font-thin break-words' }, (`Alternative names=${alternativeNames}`)),
    );
    block.appendChild(datasheetContainer);
  } else {
    const supportContainer = div(
      { class: 'font-sans' },
      div({ class: 'text-black text-5xl pb-4 font-bold' }, title),
      div({ class: 'text-black text-xl font-normal' }, description),
      div({ class: 'border-t-[1px] border-[#dde1e1] my-6' }),
    );
    block.appendChild(supportContainer);
  }
}
