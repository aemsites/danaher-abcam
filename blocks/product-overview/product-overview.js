import { decorateIcons } from '../../scripts/aem.js';
import {
  div, h6, p, h3, ul, li, span, a as anchorElement, button,
} from '../../scripts/dom-builder.js';
import { getProductResponse } from '../../scripts/search.js';
import { decorateModals } from '../../scripts/modal.js';
import { toolTip } from '../../scripts/scripts.js';
import { decorateDrawer, showDrawer } from '../../scripts/drawer.js';

function toRGBA(waveLength) {
  let r; let g; let b; let a;

  if (Number.isNaN(waveLength) || waveLength < 380 || waveLength > 780) {
    r = 0;
    g = 0;
    b = 0;
    a = 0;
  } else if (waveLength >= 380 && waveLength < 440) {
    r = (-1 * (waveLength - 440)) / (440 - 380);
    g = 0;
    b = 1;
  } else if (waveLength >= 440 && waveLength < 490) {
    r = 0;
    g = (waveLength - 440) / (490 - 440);
    b = 1;
  } else if (waveLength >= 490 && waveLength < 510) {
    r = 0;
    g = 1;
    b = (-1 * (waveLength - 510)) / (510 - 490);
  } else if (waveLength >= 510 && waveLength < 580) {
    r = (waveLength - 510) / (580 - 510);
    g = 1;
    b = 0;
  } else if (waveLength >= 580 && waveLength < 645) {
    r = 1;
    g = (-1 * (waveLength - 645)) / (645 - 580);
    b = 0.0;
  } else if (waveLength >= 645 && waveLength <= 780) {
    r = 1;
    g = 0;
    b = 0;
  } else {
    r = 0;
    g = 0;
    b = 0;
  }

  if (waveLength > 780 || waveLength < 380) {
    a = 0;
  } else if (waveLength > 700) {
    a = (780 - waveLength) / (780 - 700);
  } else if (waveLength < 420) {
    a = (waveLength - 380) / (420 - 380);
  } else {
    a = 1;
  }

  return {
    r, g, b, a,
  };
}

function createColourIndicator(waveLength) {
  if (!waveLength) {
    return span({ class: '' });
  }
  const {
    r, g, b, a,
  } = toRGBA(waveLength);
  return span(
    {
      class: 'inline-block w-3 h-1 mb-1 mr-1',
      style: `background-color: rgba(${r * 100}%, ${g * 100}%, ${b * 100}%, ${a});`,
    },
  );
}

function createKeyFactElement(key, value) {
  return div(
    { class: '' },
    h6({ class: 'text-base font-semibold text-[#2a3c3c] mb-1' }, key),
    p({ class: 'text-base text-black' }, value),
  );
}
export function getStarRating(rating, starParent, size = 'size-7') {
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 5; i++) {
    const spanEl = span();
    if (i <= rating) {
      spanEl.classList.add('icon', 'icon-star-rating', size, 'h-auto');
    } else {
      spanEl.classList.add('icon', 'icon-star-rating-empty', size, 'h-auto');
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
      anchorElement({
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
    buttonAlternative.appendChild(p({ class: 'mt-4 mx-4 text-xs text-[#65797c]' }, productCode));
    buttonAlternative.appendChild(p({ class: 'pb-4 mt-2 mx-4 text-sm text-black-0' }, name));
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
    const insteadbtn = titleDiv.appendChild(anchorElement(
      { class: 'font-2xl mt-4', href: '/modals/consider-this-alternative' },
      span({ class: 'learnmore align-center mt-4 underline text-[#378189]' }, 'why should I try this instead?'),
    ));
    decorateModals(insteadbtn);
    titleDiv.appendChild(insteadbtn);
    return titleDiv;
  }
  return '';
}

export default async function decorate(block) {
  const response = await getProductResponse();
  const rawData = response?.at(0)?.raw;

  const variationsObject = rawData.variationsjson;
  const variationsArray = JSON.parse(variationsObject);

  const conjFormulationLength = variationsArray.length;
  const variationsContainer = div({ class: 'variations-content h-[90%] overflow-y-auto overflow-x-hidden' });
  const conjProducts = ul({});
  variationsArray.forEach((products) => {
    const { product, relationship } = products;
    const emission = (product.conjugation && product.conjugation.emission) || '';
    const colourIndicator = createColourIndicator(emission);
    const conjProductsLink = anchorElement(
      { class: 'cursor-pointer hover:underline', href: product.productSlug },
      span({ class: 'text-sm lowercase text-gray-400' }, product.productCode),
      span({ class: 'px-3 py-2 text-xs rounded-xs bg-gray-200 text-slate-400 ml-2' }, relationship),
      div(
        { class: 'pt-2 font-normal text-black' },
        colourIndicator,
        product.name,
      ),
    );
    const listConj = li({ class: 'py-3 pl-8 -mt-px list-none border-t border-b' }, conjProductsLink);
    conjProducts.appendChild(listConj);
  });
  variationsContainer.appendChild(conjProducts);

  const targetJson = rawData?.targetjson;
  // Extracting alternativeNames array
  const targetJsonData = targetJson ? JSON.parse(targetJson) : [];
  const alternativeNames = targetJsonData.alternativeNames
    ? div({ class: 'text-[#575757] font-thin break-words' }, (`Alternative names=${targetJsonData.alternativeNames}`)) : '';
  // for variationLink onclick showDrawer is goes here
  const variationLink = variationsObject
    ? button({
      type: 'button',
      onclick: () => {
        showDrawer('conj-formulations');
      },
      class: 'text-[#378189] break-words underline',
    }, (`See all related conjugates and formulations (${conjFormulationLength})`)) : '';

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
      variationLink,
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
      variationLink,
      div(
        { class: 'grid pt-10 max-[799px]:grid-cols-1' },
        div({ class: 'grid grid-cols-3 gap-x-3 gap-y-10' }, ...keyFactsElements),
      ),
      dataImmunogen,
      buttonAlternative,
    );
    // conjugates and formulations integration with drawer
    const { block: publicationDrawerBlock, drawerBody } = await decorateDrawer({
      id: 'conj-formulations', title: 'Related conjugates and formulations', isBackdrop: true,
    });
    drawerBody.append(variationsContainer);
    decorateIcons(publicationDrawerBlock);
    block.append(publicationDrawerBlock);

    decorateIcons(overviewContainer);
    block.appendChild(overviewContainer);
  }
}
