import { buildBlock, decorateIcons } from '../../scripts/aem.js';
import {
  div, h3, span, a, p, select, option,
} from '../../scripts/dom-builder.js';
import { data } from './publication-data.js';

export default async function decorate(block) {
  console.log('Block: ', block);

  const pubs = data.items; // Use fetched api response data instead of raw data

  const primaryDiv = div({ class: 'relative flex flex-col border-b border-gray-300' });
  const accordion = div({ class: 'accordion p-0 pr-1' });
  const title = h3({ textContent: 'Publications', class: 'text-base font-semibold leading-6 text-left tracking-[0.2px]' });
  accordion.append(title);
  primaryDiv.append(accordion);

  const sortby = span({ textContent: 'Sort By: ', class: 'sort' });
  const selectElement = select(
    option({ value: 'newest' }, 'Newest First'),
    option({ value: 'oldest' }, 'Oldest First'),
    option({ value: 'relevance' }, 'Relevance'),
  );
  let sortedValue = selectElement.value;
  console.log(sortedValue);

  selectElement.addEventListener('change', (event) => {
    sortedValue = event.target.value;
    console.log('Selected value:', sortedValue);
  });

  const filtersContainer = div({ class: 'filters' });
  filtersContainer.append(sortby);
  filtersContainer.append(selectElement);
  primaryDiv.append(filtersContainer);

  const content = div({ class: 'content' });
  const publicationCount = div({ textContent: `${pubs.length} Publications`, class: 'font-noto text-base font-semibold leading-6 tracking-[0.2px] text-left' });
  const publications = div({ class: 'publications flex flex-col gap-y-4' });
  content.append(publicationCount);
  content.append(publications);
  primaryDiv.append(content);

  [...pubs].forEach((pub) => {
    const element = div({ class: 'element flex flex-col gap-2 p-4 px-6 rounded-md border border-[#0711121A]' });
    const journalDetails = div({ class: 'subtitle journalDetails flex flex-row gap-x-1 justify-between items-center text-xs text-[#65797C] font-semibold leading-4 tracking-[0.2px] text-left' });
    const description = div({ class: 'description flex flex-row justify-between' });
    const apps = div({ class: 'apps' });
    const authors = div({ class: 'authors text-xs text-[#65797C] font-normal leading-4 tracking-[0.3px] text-left', textContent: `${pub.authors}` });

    element.append(journalDetails);
    element.append(description);
    element.append(apps);
    element.append(authors);
    publications.append(element);

    const pubTitleDiv = div({ class: 'pubtitlediv flex flex-row gap-x-1 font-noto text-[12px] font-semibold text-gray-600 leading-[16px] tracking-[0.2px] text-left' });
    const journal = span({ textContent: `${pub.journal}` });
    const volume = span({ textContent: `${pub.volume}:${pub.pages} |` });
    const productCode = a({ textContent: `PubMed${pub.pubmedId}`, href: `https://www.ncbi.nlm.nih.gov/pubmed/${pub.pubmedId}?dopt=Abstract` });
    pubTitleDiv.append(journal);
    pubTitleDiv.append(volume);
    pubTitleDiv.append(productCode);
    journalDetails.append(pubTitleDiv);

    const publicationDate = pub.publicationDate.slice(0, 4);

    const yearDiv = div({ class: 'yeardiv inline' });
    const year = span({ textContent: `${publicationDate}`, class: 'font-noto text-[14px] font-normal text-teal-800 leading-[21px] tracking-[0.3px] text-left' });
    yearDiv.append(year);
    journalDetails.append(yearDiv);

    const name = div({ textContent: `${pub.name}`, class: 'text-lg font-semibold leading-7 text-left basis-[95%]' });
    const outIcon = span({ class: 'icon icon-out p-[1.67px]' });
    description.append(name);
    description.append(outIcon);

    const publicationAnchor = pubTitleDiv.querySelector('a');
    const publicationUrl = publicationAnchor.href;
    outIcon.addEventListener('click', () => {
      window.open(publicationUrl);
    });

    [...pub.references].forEach((reference) => {
      Object.entries(reference).forEach(([key, value]) => {
        const referenceContainer = div();
        const application = p({ textContent: `${key}`, class: 'min-w-[88px] md:min-w-[200px] inline-block font-noto text-[13px] text-gray-600 font-normal leading-[21px] tracking-[0.3px] text-left m-0' });
        const applicationType = p({ textContent: `${value}`, class: 'inline font-noto text-[14px] font-semibold leading-[23px] tracking-[0.3px] text-left text-black m-0' });
        referenceContainer.append(application);
        referenceContainer.append(applicationType);
        apps.append(referenceContainer);
      });
    });
  });

  primaryDiv.append(
    buildBlock('pagination', { elems: [] }),
  );

  block.textContent = '';
  block.append(primaryDiv);
  decorateIcons(block);
}

// export default async function decorate(block) {
//   console.log('Block: ', block);

//   // Function to get query parameters
//   function getQueryParams() {
//     const params = new URLSearchParams(window.location.search);
//     return params.get('apiUrl');
//   }

//   async function fetchApi() {
//     const apiUrl = getQueryParams();
//     // const apiUrl = 'https://main--danaher-abcam--aemsites.hlx.page/en-us/query-index.json';
//     if (apiUrl) {
//       console.log('API URL:', apiUrl);
//       try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     } else {
//       console.error('No API URL provided');
//     }
//   }

//   fetchApi(); // Call fetchApi and wait for it to resolve
// }
