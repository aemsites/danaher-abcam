import { decorateIcons } from '../../scripts/aem.js';
import {
  div, h6, p, h3, h5, ul, li, span,
  a,
} from '../../scripts/dom-builder.js';
import { getProductResponse } from '../../scripts/search.js';
import { toolTip } from '../../scripts/scripts.js';

function createKeyFactElement(key, value) {
  return div(
    { class: '' },
    h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, key),
    p({ class: 'text-base text-black' }, value),
  );
}
export function getStarRating(rating, starParent, width = 'w-7') {
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 5; i++) {
    const spanEl = span();
    if (i <= rating) {
      spanEl.classList.add('icon', 'icon-star-rating', `${width}`, 'h-auto');
    } else {
      spanEl.classList.add('icon', 'icon-star-rating-empty', `${width}`, 'h-auto');
    }
    decorateIcons(spanEl);
    starParent.append(spanEl);
  }
  return starParent;
}

// Function to generate star ratings based on aggregatedRating
function getReviewsRatings(ratings, numOfReviews) {
  if (ratings === 0) {
    const noReviewsDiv = div(
      { class: 'mt-4' },
      span({ class: 'font-normal text-grey-dark' }, 'This product has no reviews yet! '),
      a({
        class: 'text-[#378189] underline font-normal', href: '#',
      }, ' Submit a review'),
    );
    return noReviewsDiv;
  }
  const starButton = document.createElement('button');
  starButton.classList.add(...'flex items-end appearance-none'.split(' '));
  starButton.appendChild(span({ class: 'relative pr-2 font-semibold top-[3px] text-black text-2xl' }, ratings));
  getStarRating(ratings, starButton);
  starButton.appendChild(span({ class: 'pl-2 underline text-xl text-[rgb(55,129,137)] font-lighter' }, `(${numOfReviews} Reviews)`));
  return starButton;
}

// Function to generate alternative button
function getButtonAlternative(rawData, title) {
  const buttonAlternative = document.createElement('button');
  const titleDiv = document.createElement('div');
  if (rawData) {
    const directAlternative = JSON.parse(rawData);
    const { name } = directAlternative;
    const { productCode } = directAlternative;
    const { categoryType } = directAlternative;
    buttonAlternative.classList.add(...'bg-white w-full border border-interactive-grey-transparent-active rounded-md hover:bg-[#0000000d] cursor-pointer text-left'.split(' '));
    buttonAlternative.appendChild(div({ class: 'h-[5px] mb-4', style: 'background: linear-gradient(90deg, #4ba6b3 0, #c9d3b7 35%, #ff8730 70%, #c54428)' }));
    buttonAlternative.appendChild(p({ class: 'w-fit mx-4 px-2 py-1 rounded-md text-xs font-semibold bg-[#edf6f7] text-[#2c656b] border-blue-70 border ' }, categoryType));
    buttonAlternative.appendChild(h5({ class: 'mt-4 mx-4 text-xs text-[#65797c]' }, (productCode)));
    buttonAlternative.appendChild(h5({ class: 'pb-4 mt-2 mx-4 text-sm text-black-0' }, name));
    buttonAlternative.appendChild(p({ class: 'border-t-[1px] border-[#dde1e1] my-6 mx-4' }));
    titleDiv.appendChild(h3(
      { class: 'mb-6 font-semibold text-2xl text-[#2a3c3c]' },
      title,
    ));
    titleDiv.appendChild(ul(
      { class: 'relative flex w-full overflow-x-auto overflow-y-hidden select-none scrollbar-hide flex-nowrap rounded-md gap-4 touch-pan-x' },
      li(
        { class: 'w-full h-44 bg-white' },
        buttonAlternative,
      ),
    ));
    return titleDiv;
  }
  return '';
}

export default async function decorate(block) {
  const response = await getProductResponse();
  const rawData = response?.at(0)?.raw;
  const targetJson = rawData?.targetjson;
  // Extracting alternativeNames array
  const targetJsonData = targetJson ? JSON.parse(targetJson) : [];
  const alternativeNames = targetJsonData.alternativeNames
    ? div({ class: 'text-[#575757] font-thin break-words' }, (`Alternative names=${targetJsonData.alternativeNames}`)) : '';
  const { title } = rawData;
  const description = rawData.description
    ? div({ class: 'text-black text-xl font-normal' }, rawData.description) : '';
  const reviewSummary = JSON.parse(rawData.reviewssummaryjson);
  const { aggregatedRating, numberOfReviews } = reviewSummary;
  const dataIsotype = rawData.isotype;
  const { hostspecies } = rawData;
  const storageBuffer = rawData.formulation;
  const dataForm = rawData.form;
  const dataClonality = rawData.clonality;
  const immunogenObject = rawData?.immunogenjson ? JSON.parse(rawData.immunogenjson) : {};
  const dataImmunogen = immunogenObject.sensitivity
    ? div({ class: 'mt-8 mb-2' }, createKeyFactElement('Immunogen', immunogenObject.sensitivity)) : '';
  const buttonAlternative = getButtonAlternative(rawData.directreplacementproductjson, 'Consider this alternative');
  const productTags = rawData?.producttags;
  const keyFactsElements = [];
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
  // Constructing the product tags
  const productTagsDiv = div({ class: 'flex flex-wrap pb-4 gap-2' });
  productTags?.forEach((item) => {
    const productTagsButton = document.createElement('button');
    productTagsButton.classList.add(...'appearance-none px-2 py-1 rounded-e text-xs font-semibold tracking-wider break-keep bg-[rgb(237,246,247)] text-[rgb(44,101,107)] border-[rgb(44,101,107)] border'.split(' '));
    productTagsButton.appendChild(span({ class: 'pt-0' }, item));
    productTagsDiv.appendChild(productTagsButton);
  });

  // Constructing the container with title, description, alternative names, and key-value pairs
  const overviewTitle = toolTip('overviewtitle', 'overviewtooltip', title, null);
  const datasheetTitle = toolTip('datasheettitle', 'datasheettooltip', title, null);
  const supportAndDownloadTitle = toolTip('supportanddownloadtitle', 'supportanddownloadtooltip', title, null);
  if (block.classList.contains('datasheet')) {
    const datasheetContainer = div(
      { class: 'font-sans' },
      div({ class: 'text-black text-4xl pb-4 font-bold' }, datasheetTitle),
      div({ class: 'text-black text-xl font-normal' }, description),
      productTagsDiv,
      alternativeNames,
    );
    block.appendChild(datasheetContainer);
  } else if (block.classList.contains('download')) {
    const supportContainer = div(
      { class: 'font-sans' },
      div({ class: 'text-black text-4xl pb-4 font-bold' }, supportAndDownloadTitle),
      productTagsDiv,
    );
    block.appendChild(supportContainer);
  } else {
    const overviewContainer = div(
      { class: 'font-sans py-6' },
      div({ class: 'text-black text-4xl pb-4 font-bold' }, overviewTitle),
      div({ class: 'text-black text-xl font-normal tracking-wide' }, description),
      getReviewsRatings(aggregatedRating, numberOfReviews),
      div({ class: 'border-t-[1px] border-[#dde1e1] my-6' }),
      productTagsDiv,
      alternativeNames,
      div(
        { class: 'grid pt-10 max-[799px]:grid-cols-1' },
        div({ class: 'grid grid-cols-3 gap-x-3 gap-y-10' }, ...keyFactsElements),
      ),
      dataImmunogen,
      buttonAlternative,
    );
    decorateIcons(overviewContainer);
    block.appendChild(overviewContainer);
  }
}
