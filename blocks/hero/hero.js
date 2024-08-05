import { decorateIcons } from '../../scripts/aem.js';
import { facetSelect, finishType, searchFacetTerms } from '../../scripts/coveo-body-requests.js';
import {
  a, div, input, li, p, span, ul, h3,
  label,
  hr,
} from '../../scripts/dom-builder.js';
import { createRequest, debounce } from '../../scripts/scripts.js';

let searchString = '';
let payload = { ...finishType };
let facetsCollection = {};

let disclaimers;
let totalResultCount;
let emptySearchbar;
let searchContent;
let searchInput;

let requestStatus;

const organizationId = window.OptimusConfig !== undefined ? window.OptimusConfig.organizationId : 'danahernonproduction1892f3fhz';
const bearerToken = window.OptimusConfig !== undefined ? window.OptimusConfig.bearerToken : 'xx27ea823a-e994-4d71-97f6-403174ec592a';

function localSessionStorage() {
  const allStoredPaths = localStorage.getItem('past-coveo-history');
  let stringifiedLocalSession;
  const updatedPath = { q: payload.q, facets: facetsCollection, created_at: Date.now() };
  if (allStoredPaths) {
    const updatedAllStoredPaths = JSON.parse(allStoredPaths);
    stringifiedLocalSession = JSON.stringify([...updatedAllStoredPaths, updatedPath]);
  } else stringifiedLocalSession = JSON.stringify([updatedPath]);
  localStorage.setItem('past-coveo-history', stringifiedLocalSession);
}

function updateFacetList(facetLists) {
  if (facetLists && facetLists.length > 0) {
    const newFacets = payload.facets.map((fac) => {
      const findFacetField = facetLists.filter((facList) => facList.field === fac.field);
      if (findFacetField && findFacetField.length > -1) {
        return {
          ...fac,
          currentValues: findFacetField[0]
            .values.map(
              (facValue) => ({ value: facValue.value, state: facValue.state }),
            ),
        };
      }
      return null;
    });
    payload = {
      ...payload,
      facets: newFacets,
    };
  }
}

async function makeCoveoSearchRequest(url, stringifiedPayload) {
  const request = await createRequest({
    url,
    method: 'POST',
    authToken: bearerToken,
    body: stringifiedPayload,
  });
  // eslint-disable-next-line no-unused-vars
  const response = await request.json();
  requestStatus = false;
  updateFacetList(response.facets);
  return response;
}

function updateLink(el) {
  const interval = setTimeout(() => {
    if (requestStatus) updateLink(el);
    else {
      clearTimeout(interval);
      const queryParam = new URLSearchParams('');
      if (
        (
          Object.keys(payload).length > 0
          && payload.q && payload.q !== ''
        )
        || Object.keys(facetsCollection).length > 0
      ) {
        if (Object.keys(payload).length > 0 && payload.q && payload.q !== '') {
          queryParam.append('q', encodeURI(payload.q));
        }
        if (Object.keys(facetsCollection).length > 0) {
          Object.keys(facetsCollection).forEach((facetCollectKey) => {
            queryParam.append(`f-${facetCollectKey}`, encodeURI(facetsCollection[facetCollectKey].join(',')));
          });
        }

        const queryParameters = queryParam.toString().replaceAll('25', '').replaceAll('%2C', ',');
        const fullPath = `/en-us/search#${queryParameters}`;
        if (el === 'path') {
          localSessionStorage();
          setTimeout(() => {
            window.location = fullPath;
          }, 1500);
        } else el.href = fullPath;
      }
    }
  }, 1000);
}

function decorateViewResultsURL() {
  const searchResultAnchor = document.querySelector('#search-container a');
  if (searchResultAnchor) updateLink(searchResultAnchor);
}

const facetAction = debounce(async (selected, listType, mode) => {
  requestStatus = true;
  const url = `https://${organizationId}.org.coveo.com/rest/search/v2`;
  const query = searchInput?.value;
  const payloadJSON = {
    ...payload,
    ...{
      facets: listType ? payload?.facets.map((facet) => {
        if (facet.facetId === listType) {
          facet.currentValues.forEach((curFacVal, curFacValIndex) => {
            if (curFacVal.value === selected.value) {
              facet.currentValues[curFacValIndex].state = (mode && mode === 'select') ? 'selected' : 'idle';
            } else if (listType === 'categorytype') {
              facet.currentValues[curFacValIndex].state = 'idle';
            }
          });
        }
        return facet;
      }) : payload?.facets,
      q: query,
      fieldsToInclude: facetSelect.fieldsToInclude,
      pipeline: facetSelect.pipeline,
      context: facetSelect.context,
      searchHub: facetSelect.searchHub,
      sortCriteria: facetSelect.sortCriteria,
    },
  };
  const { facets, totalCount = 0 } = await makeCoveoSearchRequest(url, JSON.stringify(payloadJSON));
  payload = { ...payload, ...{ q: query } };
  // eslint-disable-next-line no-use-before-define
  decorateSearchPopup(facets, totalCount);
}, 100);

function handleFacetList(listType, facetValues, facetIndex) {
  const searchProductInputGroup = searchInput.parentElement;
  facetsCollection[listType] = Object.keys(facetsCollection).length > 0
      && listType in facetsCollection ? facetsCollection[listType] : [];
  facetsCollection[listType].push(facetValues[facetIndex].value);
  if (listType in facetsCollection) {
    const existingSelectedFacet = searchProductInputGroup.querySelector(`.facet-selected[title="${facetsCollection[listType][0]}"]`);
    if (existingSelectedFacet) {
      existingSelectedFacet.remove();
      facetsCollection[listType].shift();
    }
  }
  facetAction(facetValues[facetIndex], listType, 'select');
  const selectedFacet = span(
    {
      id: `facet-${facetValues[facetIndex].value.replace(' ', '_')}`,
      class: 'flex gap-x-2 pr-[5px] py-[5px] pl-4 text-white bg-slate-200/20 rounded-full select-none cursor-pointer facet-selected group',
      title: facetValues[facetIndex].value,
      onclick: () => {
        if (listType in facetsCollection) {
          if (facetsCollection[listType].length === 0) {
            delete facetsCollection[listType];
          } else {
            // eslint-disable-next-line max-len
            const facetItemIndex = facetsCollection[listType].indexOf(facetValues[facetIndex].value);
            facetsCollection[listType].splice(facetItemIndex, 1);
          }
        }
        facetAction(facetValues[facetIndex], listType, 'idle');
        searchProductInputGroup.removeChild(selectedFacet);
      },
    },
    span(
      { class: 'max-w-32 text-2xl truncate' },
      facetValues[facetIndex].value,
    ),
    span({ class: 'icon icon-close size-7 my-auto p-1 text-black fill-current cursor-pointer bg-purple-50/20 group-hover:bg-purple-50/40 rounded-full transition-transform group-hover:scale-110' }),
  );
  decorateIcons(selectedFacet);
  // searchProductInputGroup.querySelectorAll()
  searchProductInputGroup.insertBefore(selectedFacet, searchInput);
  searchInput.focus();
}

function decorateSearchPopup(facets, totalCount) {
  searchContent.innerHTML = '';
  if (facets && facets.length > 0) {
    const facetWithContent = facets.filter((facet) => facet.values.length > 0);
    facetWithContent.sort((a1, b1) => {
      if (a1.facetId < b1.facetId) return -1;
      if (a1.facetId > b1.facetId) return 1;
      return 0;
    });
    const limitedFacetValues = [];
    limitedFacetValues.push(facetWithContent?.at(0));
    facetWithContent.forEach((facet) => {
      if (searchInput.parentElement.querySelector('#facet-Primary_Antibodies')) {
        if (facet.facetId === 'reactivityapplications' || facet.facetId === 'target') {
          limitedFacetValues.push(facet);
        }
      } else if (searchInput.parentElement.querySelector('#facet-Secondary_Antibodies')) {
        if (facet.facetId === 'hostspecies' || facet.facetId === 'conjugations') {
          limitedFacetValues.push(facet);
        }
      }
    });
    const dropdownContainer = div({ class: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-max gap-x-12 gap-y-3' });
    const facetBadge = div({ class: 'flex flex-row gap-4 flex-wrap' });
    if (limitedFacetValues.length > 0) {
      for (
        let facetCategoryIndex = 0;
        facetCategoryIndex < limitedFacetValues.length;
        facetCategoryIndex += 1
      ) {
        const { values: facetValues, facetId } = limitedFacetValues[facetCategoryIndex];
        const listType = facetId;
        const facetName = facetId.replace(/([A-Z])/g, ' $&');
        const facetGroup = div({ class: 'flex flex-col' });
        const facetListContainer = div({ class: 'relative flex flex-col justify-center' });
        const facetListBtn = label({
          'data-dropdown-toggle': facetName,
          for: `${facetName}_${facetWithContent.length}`,
          class: 'w-full block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded p-2.5 cursor-pointer',
        }, 'Please Select', span({ class: 'icon icon-chevron-down' }));
        facetListContainer.append(
          input({ type: 'checkbox', class: 'peer hidden', id: `${facetName}_${facetWithContent.length}` }),
          facetListBtn,
        );
        const facetList = ul({ class: 'absolute max-h-60 overflow-scroll p-3 space-y-1 text-sm text-gray-700 z-10 bg-white rounded shadow' });
        if (facetValues.length > 0) {
          for (let facetIndex = 0; facetIndex < facetValues.length; facetIndex += 1) {
            const searchExistingFacet = listType in facetsCollection
              && facetsCollection[listType].includes(facetValues[facetIndex].value);
            if (
              facetValues[facetIndex].value
              && (!searchExistingFacet)
              && facetValues[facetIndex].numberOfResults
              && facetValues[facetIndex].numberOfResults > 0
            ) {
              if (listType === 'categorytype') {
                facetBadge.append(
                  div(
                    {
                      class: 'w-max flex items-center px-5 py-2.5 text-base font-medium text-center text-white bg-gray-300 hover:bg-gray-400 text-gray-800 rounded cursor-pointer',
                      title: facetValues[facetIndex].value,
                      onclick: () => handleFacetList(listType, facetValues, facetIndex),
                    },
                    span({ class: 'w-3/4 truncate' }, facetValues[facetIndex].value),
                    span({ class: 'inline-flex items-center justify-center h-6 px-2 ms-2 text-xs font-semibold text-gray-800 bg-gray-200 rounded-md' }, facetValues[facetIndex].numberOfResults),
                  ),
                );
              } else {
                const facetElement = li(
                  {
                    class: 'flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer',
                    title: facetValues[facetIndex].value,
                    onclick: () => handleFacetList(listType, facetValues, facetIndex),
                  },
                  `${facetValues[facetIndex].value} ( ${facetValues[facetIndex].numberOfResults} )`,
                );
                facetList.append(facetElement);
              }
            }
          }
          if (facetList.children.length > 0) {
            facetListContainer.append(div({ class: 'w-48 hidden peer-checked:block' }, facetList));
            facetGroup.append(h3({ class: 'font-medium text-white/80 text-2xl leading-8 mb-2 pl-3 md:pl-0' }, searchFacetTerms[facetName]));
            facetGroup.append(facetListContainer);
            dropdownContainer.append(facetGroup);
          } else if (facetBadge.children.length > 0) searchContent.append(facetBadge);
        }
      }
    }
    searchContent.append(facetBadge);
    searchContent.append(hr({ class: 'w-100 my-4' }));
    searchContent.append(dropdownContainer);
    decorateViewResultsURL();
  }
  totalResultCount.innerHTML = totalCount;
}

const fetchFinishType = debounce(async (value) => {
  requestStatus = true;
  const url = `https://${organizationId}.org.coveo.com/rest/search/v2`;
  let facetContainer = [];
  if (payload.facets) facetContainer = [...payload.facets];
  else facetContainer = [...finishType.facets];
  const selectedFacets = { ...finishType, q: value, facets: facetContainer };
  // eslint-disable-next-line max-len
  const { facets, totalCount = 0 } = await makeCoveoSearchRequest(url, JSON.stringify(selectedFacets));
  payload = { ...payload, ...{ q: value } };
  // CREATING THE LAYOUT
  decorateSearchPopup(facets, totalCount);
}, 800);

/**
 * Populate the search-suggestions & search-content API on user-input after specific time-interval
 */
function handleSearchTyping(event) {
  let { value } = event.target;
  const searchTermValue = value.trim();
  value = value.trim();
  if (value === '' && value !== searchString) {
    searchContent.innerHTML = '';
  }
  if (value !== searchString) {
    fetchFinishType(value);
  }
  searchString = value;
  if (searchTermValue === '') emptySearchbar.classList.add('hidden');
  else emptySearchbar.classList.remove('hidden');
}

/**
 * Clear out the search-term & all the selected facets
 */
function handleEmptySearchTerms() {
  searchInput.value = '';
  const allSelectedFacets = document.querySelectorAll('#search-product span.facet-selected');
  if (allSelectedFacets.length > 0) {
    allSelectedFacets.forEach((selectedFacet) => selectedFacet.remove());
    payload = {
      ...payload,
      ...{
        facets: payload?.facets.map((facet) => {
          facet.currentValues.forEach((curFacVal, curFacValIndex) => {
            facet.currentValues[curFacValIndex].state = 'idle';
          });
          return facet;
        }),
      },
    };
  }
  facetsCollection = {};
  fetchFinishType('');
}

function buildSearchBackdrop() {
  facetAction();
  totalResultCount = p({ id: 'total-result-count', class: 'text-5xl md:text-7xl lg:text-8xl' }, '0');
  disclaimers = div(
    { class: 'w-full fixed bottom-0 text-black font-normal' },
    div(
      { class: 'w-max flex justify-between gap-24 ml-auto px-8 py-5 text-white' },
      div(
        { class: 'flex flex-col place-content-center [&_p]:leading-4' },
        p({ class: 'text-2xl md:text-3xl' }, 'Total results'),
        a(
          {
            href: '/en-us/search',
            class: 'flex items-center text-base font-bold mt-4',
            onclick: localSessionStorage,
          },
          'Visit Results',
          span({ class: 'icon icon-arrow-right size-5 [&_img]:invert ml-2' }),
        ),
      ),
      totalResultCount,
    ),
  );
  emptySearchbar = span({
    id: 'empty-searchbar',
    class: 'icon icon-close size-7 hidden absolute me-3 inset-y-0 right-0 my-auto text-white fill-current cursor-pointer',
    onclick: handleEmptySearchTerms,
  });
  searchContent = div({
    id: 'search-content',
    class: 'container h-3/4 md:h-4/6 mt-4 mx-auto mb-3',
  });
  searchInput = input({
    class: 'w-auto relative py-1 pl-2 md:pl-0 flex flex-grow text-white font-medium bg-transparent tracking-wider text-lg sm:text-xl placeholder-grey-300 outline-none',
    id: 'search-input',
    placeholder: 'Search here...',
    type: 'text',
    autocomplete: 'off',
    onkeyup: handleSearchTyping,
    onkeydown: (event) => {
      if (event.key === 'Enter' || event.keyCode === 13) updateLink('path');
    },
  });
  const searchBackdropContainer = div(
    {
      id: 'search-container',
      class: 'h-screen fixed top-0 left-0 z-50 transition-all duration-150 -translate-y-full [&_#search-product]:hidden [&_#search-content]:hidden',
    },
    div(
      {
        id: 'search-product',
        class: 'container mx-auto sm:pt-2',
      },
      div(
        { class: 'relative' },
        div(
          { class: 'flex flex-col md:flex-row justify-center gap-x-2 gap-y-4 px-0 text-white' },
          div(
            { class: 'w-full relative sm:border border-b sm:border-solid rounded-none md:rounded-full flex flex-wrap gap-1 py-2 pl-8 pr-0 md:px-12 border-cyan-600 md:border-white bg-black' },
            span({
              class: 'icon icon-search size-7 hidden md:block bg-transparent text-white absolute flex ms-3 p-1 md:p-0 inset-y-0 start-0 my-auto [&_img]:invert cursor-pointer',
              onclick: () => updateLink('path'),
            }),
            span({
              class: 'icon icon-chevron-down size-7 rotate-90 block md:hidden bg-transparent text-white absolute flex ms-3 p-1 md:p-0 inset-y-0 start-0 my-auto [&_img]:invert cursor-pointer',
              onclick: () => {
                const searchContainer = document.querySelector('#search-container');
                if (searchContainer) {
                  searchContainer.classList.add(...'-translate-y-full [&_#search-product]:hidden [&_#search-content]:hidden'.split(' '));
                  searchContainer.classList.remove('w-screen');
                  document.querySelector('#search-container-child')?.classList.remove('w-screen');
                }
              },
            }),
            searchInput,
            emptySearchbar,
          ),
          p(
            {
              class: 'hidden md:inline-flex items-center cursor-pointer ml-2 group',
              onclick: () => {
                const searchContainer = document.querySelector('#search-container');
                if (searchContainer) {
                  searchContainer.classList.add(...'-translate-y-full [&_#search-product]:hidden [&_#search-content]:hidden'.split(' '));
                  searchContainer.classList.remove('w-screen');
                  document.querySelector('#search-container-child')?.classList.remove('w-screen');
                }
              },
            },
            span({ class: 'text-base hidden lg:block group-hover:underline' }, 'Close'),
            span({
              id: 'close-search-container',
              class: 'icon icon-close size-8 p-1 group-hover:rotate-90 transition-transform',
            }),
          ),
        ),
      ),
    ),
    searchContent,
  );
  searchBackdropContainer.append(disclaimers);

  return searchBackdropContainer;
}

export default function decorate(block) {
  const pictureTag = block.querySelector('picture');
  const img = pictureTag.querySelector('img');
  img.setAttribute('loading', 'eager');
  pictureTag.classList.add(...'[&_img]:h-[496px] [&_img]:w-full'.split(' '));
  const parentWrapper = div({ class: 'absolute w-full inset-x-auto inset-y-0 flex flex-col items-center justify-center gap-y-4 text-5xl px-6 md:px-0' });
  const headingTag = block.querySelector('h1');
  headingTag.classList.add(...'hidden lg:block font-semibold xl:font-bold text-4xl xl:text-5xl xxl:text-7xl text-white'.split(' '));
  parentWrapper.append(headingTag);
  block.classList.add(...'relative'.split(' '));
  block.innerHTML = '';
  if (block.classList.contains('input-popup')) {
    const searchBar = div(
      {
        class: 'max-w-2xl w-full relative sm:border border-b sm:border-solid rounded-full flex flex-wrap gap-1 py-4 pl-8 pr-0 md:px-14 bg-white cursor-pointer',
        id: 'search-by-coveo',
        onclick: () => {
          const searchContainer = document.querySelector('#search-container');
          if (searchContainer) {
            searchContainer.classList.remove(...'-translate-y-full [&_#search-product]:hidden [&_#search-content]:hidden'.split(' '));
            searchContainer.classList.add('w-screen');
            document.querySelector('#search-container-child')?.classList.add('w-screen');
          }
          if (searchContainer) searchContainer.nextElementSibling.classList.remove(...'transition-all -translate-y-full'.split(' '));
          if (searchInput) searchInput.focus();
        },
      },
      span({
        class: 'icon icon-search bg-transparent text-black absolute flex ms-2 ms-4 p-1 md:p-0 inset-y-0 start-0 w-6 h-6 my-auto [&_svg]:fill-current cursor-pointer',
      }),
      input({
        class: 'w-auto break-words relative pl-2 md:pl-0 flex flex-grow text-gray-400 font-medium bg-transparent tracking-wider text-2xl placeholder-grey-300 outline-none',
        placeholder: 'What can we help you find today?',
        type: 'text',
      }),
    );
    parentWrapper.append(searchBar);
    parentWrapper.append(buildSearchBackdrop());
    parentWrapper.append(div({ id: 'search-container-child', class: 'h-screen fixed top-0 left-0 bg-black opacity-75 z-40 transition-all -translate-y-full' }));
    decorateIcons(parentWrapper);
  }
  block.append(pictureTag);
  block.append(parentWrapper);
}
