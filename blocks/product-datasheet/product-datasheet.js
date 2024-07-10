import { getProductResponse } from '../../scripts/search.js';
import {
  div, h2, h6, p, a,
} from '../../scripts/dom-builder.js';

function createParagraph(heading, value, isNotes = false) {
  if (isNotes) {
    return p({ class: 'text-base text-black mb-2' }, value);
  }
  return div(
    {},
    h6({ class: 'text-base text-black mb-2' }, heading),
    p({ class: 'text-base text-black mb-2' }, value),
  );
}

export default async function decorate(block) {
  const response = await getProductResponse();
  const dataResponse = response[0].raw;

  const dataNotesObj = dataResponse.notesjson ? JSON.parse(dataResponse.notesjson) : [];

  const dataNotes = [];

  dataNotesObj.forEach((noteObj) => {
    const statementText = noteObj.statement;

    statementText.split(/<\/?(?:p|a|ul|li|sup)>/).forEach((ele) => {
      const updated = ele.replace('<p>', '').trim();
      if (updated.length > 0) {
        dataNotes.push(createParagraph('Note', updated, true));
      }
    });
  });

  const { href } = window.location;
  const dataIsotype = dataResponse.isotype;
  const dataForm = dataResponse.form;
  const dataClonality = dataResponse.clonality;
  const dataCloneNumber = dataResponse.clonenumber;
  const immunogenObject = dataResponse.immunogenjson ? JSON.parse(dataResponse.immunogenjson) : {};
  const dataImmunogen = immunogenObject.sensitivity;
  const purificationObject = JSON.parse(dataResponse.purityjson);
  const dataPurity = purificationObject.purificationTechnique;
  const dataReagent = purificationObject.purificationTechniqueReagent;
  const antibodyAttributesObj = JSON.parse(dataResponse.antibodyattributesjson);
  const specificityHTML = antibodyAttributesObj.specificity;
  const domParser = new DOMParser();
  const docConvert = domParser.parseFromString(specificityHTML, 'text/html');
  const specificityText = docConvert.body.textContent || '';
  const storageObject = JSON.parse(dataResponse.storagejson);
  const dataStorage = storageObject.shippedAtConditions;
  const dataStorageDuration = storageObject.appropriateShortTermStorageDuration;
  const dataShorttermDuration = storageObject.appropriateShortTermStorageConditions;
  const dataStorageConditions = storageObject.appropriateLongTermStorageConditions;
  const dataAliquoting = storageObject.aliquotingInformation;
  const dataStorageInformation = storageObject.storageInformation;
  const dataConcentration = dataResponse.concentration;

  const keyFactsElements = [];
  if (dataIsotype) {
    keyFactsElements.push(createParagraph('Isotype', `${dataIsotype}`));
  }
  if (dataForm) {
    keyFactsElements.push(createParagraph('Form', dataForm));
  }
  if (dataClonality) {
    keyFactsElements.push(createParagraph('Clonality', dataClonality));
  }
  if (dataImmunogen) {
    keyFactsElements.push(createParagraph('Immunogen', dataImmunogen));
  }
  if (dataCloneNumber && dataCloneNumber.trim() !== 'null' && dataCloneNumber.trim() !== '') {
    keyFactsElements.push(createParagraph('Clone number', dataCloneNumber));
  }
  if (dataPurity) {
    keyFactsElements.push(createParagraph('Purification technique', `${dataPurity} ${dataReagent}`));
  }
  if (specificityText && specificityText.trim() !== 'null' && specificityText.trim() !== '') {
    keyFactsElements.push(createParagraph('Specificity', specificityText));
  }
  if (dataConcentration) {
    keyFactsElements.push(createParagraph('Concentration', dataConcentration));
  }

  const productKeyfacts = div(
    { class: 'product-keyfacts grid grid-cols-[320px_minmax(auto,_1fr)] border-t-[1px] border-[#dde1e1] pt-10 mt-10 max-[799px]:grid-cols-1' },
    h2({ class: 'text-2xl font-semibold text-[#2a3c3c] mb-6' }, 'Key Facts'),
    div(
      { class: 'keyfacts-content grid grid-cols-2 gap-x-3 gap-y-10' },
      ...keyFactsElements,
    ),
  );

  const storageElements = [];
  if (dataStorage) {
    storageElements.push(createParagraph('Shipped at conditions', dataStorage));
  }
  if (dataStorageDuration && String(dataStorageDuration).trim() !== '' && String(dataStorageDuration).trim() !== 'null') {
    storageElements.push(createParagraph('Appropriate short-term storage duration', dataStorageDuration));
  }
  if (dataShorttermDuration && String(dataShorttermDuration).trim() !== '' && String(dataShorttermDuration).trim() !== 'null') {
    storageElements.push(createParagraph('Appropriate short-term storage conditions', dataShorttermDuration));
  }
  if (dataStorageConditions) {
    storageElements.push(createParagraph('Appropriate long-term storage conditions', dataStorageConditions));
  }
  if (dataAliquoting) {
    storageElements.push(createParagraph('Aliquoting information', dataAliquoting));
  }
  if (dataStorageInformation) {
    storageElements.push(createParagraph('Storage information', dataStorageInformation));
  }

  const productStorage = div(
    { class: 'product-storage grid grid-cols-[320px_minmax(auto,_1fr)] border-t-[2px] border-[#dde1e1] pt-10 mt-10 max-[799px]:grid-cols-1' },
    h2({ class: 'text-2xl font-semibold text-[#2a3c3c] mb-6' }, 'Storage'),
    div(
      { class: 'keyfacts-content grid grid-cols-2 gap-x-3 gap-y-10' },
      ...storageElements,
    ),
  );

  const productNotesSection = div(
    { class: 'product-notes grid grid-cols-[320px_minmax(auto,_1fr)] border-t-[2px] border-[#dde1e1] pt-10 mt-10 max-[799px]:grid-cols-1' },
    h2({ class: 'text-2xl font-semibold text-[#2a3c3c] mb-6' }, 'Notes'),
    div(
      { class: 'notes-content' },
      ...dataNotes,
    ),
  );

  const productPromise = div(
    { class: 'product-promise grid grid-cols-[320px_minmax(auto,_1fr)] border-t-[2px] border-[#dde1e1] pt-10 mt-10 max-[799px]:grid-cols-1' },
    h2({ class: 'section-title text-2xl font-semibold text-[#2a3c3c] mb-6' }, 'Product Promise'),
    div(
      { class: 'grid grid-cols-1' },
      p({ class: 'text-base text-black mb-4' }, 'We are dedicated to supporting your work with high quality reagents and we are here for you every step of the way should you need us.'),
      p({ class: 'text-base text-black mb-4' }, 'In the unlikely event of one of our products not working as expected, you are covered by our product promise.'),
      p(
        { class: 'text-base text-black mb-4' },
        'Full details and terms and conditions can be found here: ',
        a({ class: 'font-normal hover:underline block text-[#378189]', href }, 'Terms & Conditions.'),
      ),
    ),
  );

  block.appendChild(productKeyfacts);
  block.appendChild(productStorage);
  block.appendChild(productNotesSection);
  block.appendChild(productPromise);
}
