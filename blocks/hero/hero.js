import { decorateIcons } from '../../scripts/aem.js';
import { facetSelect, finishType, suggestions } from '../../scripts/coveo-body-requests.js';
import {
  a, div, input, li, p, span, ul, h3,
} from '../../scripts/dom-builder.js';
import { createRequest, debounce } from '../../scripts/scripts.js';

const mockServerId = 'f5a32f9c-fe85-4232-a9db-a89470a1b066';
let searchString = '';
// let payload = {};
let payload = { ...finishType };
const facetsCollection = {};

let disclaimers;
let totalResultCount;
let emptySearchbar;
let searchContent;
let searchSuggestions;
let searchInput;

// const organizationId = window.DanaherConfig.searchOrg;
const bearerToken = 'f5aa9db-32c0a0-4232-32f9-a8947a32f9c';

async function makeCoveoSearchRequest(url, stringifiedPayload) {
  const request = await createRequest({
    url,
    method: 'POST',
    authToken: bearerToken,
    body: stringifiedPayload,
  });
  // eslint-disable-next-line no-unused-vars
  const response = await request.json();
  return response;
}

function decorateViewResultsURL() {
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
    const allSearchResultAnchors = document.querySelectorAll('#search-container a');
    const queryParameters = queryParam.toString().replaceAll('25', '').replaceAll('%2C', ',');
    if (allSearchResultAnchors.length > 0) {
      allSearchResultAnchors.forEach((searchResultAnchors) => {
        searchResultAnchors.href = `https://abcam.com/en-in/search/page?facets.application=${queryParameters}`;
      });
      document.querySelector('#search-container .icon-search').addEventListener('click', () => {
        window.location = `https://abcam.com/en-in/search/page?facets.application=${queryParameters}`;
      });
    }
  }
}

const facetAction = debounce(async (selected, listType, mode) => {
  const url = `https://${mockServerId}.mock.pstmn.io/select-content-term`;
  const query = searchInput?.value;
  const payloadJSON = {
    ...payload,
    ...{
      facets: payload?.facets.map((facet) => {
        if (facet.facetId === listType) {
          facet.currentValues.forEach((curFacVal, curFacValIndex) => {
            if (curFacVal.value === selected.value) {
              facet.currentValues[curFacValIndex].state = (mode === 'select') ? 'selected' : 'idle';
            }
          });
        }
        return facet;
      }),
      q: query,
      fieldsToInclude: facetSelect.fieldsToInclude,
      pipeline: facetSelect.pipeline,
      context: facetSelect.context,
      searchHub: facetSelect.searchHub,
      sortCriteria: facetSelect.sortCriteria,
    },
  };
  const { facets, totalCount = 0 } = await makeCoveoSearchRequest(url, JSON.stringify(payloadJSON));
  payload = { ...payload, ...{ q: query, facets: payloadJSON?.facets } };
  // eslint-disable-next-line no-use-before-define
  decorateSearchPopup(facets, totalCount);
}, 100);

function decorateSearchPopup(facets, totalCount) {
  searchContent.innerHTML = '';
  if (facets && facets.length > 0) {
    const facetWithContent = facets.filter((facet) => facet.values.length > 0);
    for (
      let facetCategoryIndex = 0;
      facetCategoryIndex < facetWithContent.length;
      facetCategoryIndex += 1
    ) {
      const { values: facetValues, facetId } = facetWithContent[facetCategoryIndex];
      const listType = facetId;
      const facetGroup = div({ class: 'flex flex-col' });
      const facetList = ul({ class: 'flex flex-row flex-wrap md:flex-col gap-x-2 gap-y-3 pl-3 border-l-0 md:border-l border-neutral/60' });
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
            const facetElement = li(
              {
                class: 'w-max px-4 py-2 rounded-full select-none bg-slate-200/30 hover:bg-slate-200/40 text-base leading-5 text-white font-normal flex items-center gap-x-2 cursor-pointer',
                title: facetValues[facetIndex].value,
                // eslint-disable-next-line no-loop-func
                onclick: () => {
                  facetsCollection[listType] = Object.keys(facetsCollection).length > 0
                    && listType in facetsCollection ? facetsCollection[listType] : [];
                  facetsCollection[listType].push(facetValues[facetIndex].value);
                  facetAction(facetValues[facetIndex], listType, 'select');
                  const selectedFacet = span(
                    {
                      id: `facet-${facetValues[facetIndex].value}`,
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
                        searchInput.parentElement.removeChild(selectedFacet);
                      },
                    },
                    span(
                      { class: 'max-w-32 text-2xl truncate' },
                      facetValues[facetIndex].value,
                    ),
                    span({ class: 'icon icon-close size-7 my-auto p-1 text-black fill-current cursor-pointer bg-purple-50/20 group-hover:bg-purple-50/40 rounded-full transition-transform group-hover:scale-110' }),
                  );
                  decorateIcons(selectedFacet);
                  searchInput.parentElement.insertBefore(selectedFacet, searchInput);
                },
              },
              span(
                { class: 'max-w-[7rem] truncate' },
                facetValues[facetIndex].value,
              ),
              span(
                { class: 'text-xs font-normal bg-slate-200/20 rounded-full py-1 px-2' },
                facetValues[facetIndex]?.numberOfResults,
              ),
            );
            facetList.append(facetElement);
          }
        }
        if (facetList.children.length > 0) {
          facetGroup.append(h3({ class: 'font-medium text-slate-200/40 text-2xl leading-8 mb-2 pl-3 md:pl-0' }, facetId.replace(/([A-Z])/g, ' $&')));
          facetGroup.append(facetList);
          searchContent.append(facetGroup);
        }
      }
    }
    decorateViewResultsURL();
  }
  totalResultCount.innerHTML = totalCount;
}

const fetchFinishType = debounce(async (value) => {
  const url = `https://${mockServerId}.mock.pstmn.io/search-content?search-term=${value}`;
  let facetContainer = [];
  if (value.trim() === '') {
    // eslint-disable-next-line no-use-before-define
    fetchSearchHistory();
    disclaimers.classList.add('hidden');
  } else {
    if (payload.facets) facetContainer = [...payload.facets];
    else facetContainer = [...finishType.facets];
    const selectedFacets = { ...finishType, q: value, facets: facetContainer };
    // eslint-disable-next-line max-len
    const { facets, totalCount = 0 } = await makeCoveoSearchRequest(url, JSON.stringify(selectedFacets));
    payload = { ...payload, ...{ q: value, facets: facetContainer } };
    disclaimers.classList.remove('hidden');
    // CREATING THE LAYOUT
    decorateSearchPopup(facets, totalCount);
  }
}, 800);

const fetchSuggestions = debounce(async (value) => {
  try {
    const url = `https://${mockServerId}.mock.pstmn.io/search-suggestion?search-term=${value}`;
    suggestions.q = value;
    const { completions } = await makeCoveoSearchRequest(url, JSON.stringify(suggestions));
    // CREATING THE LAYOUT
    searchSuggestions.innerHTML = '';
    if (completions && completions.length > 0) {
      for (
        let suggestionIndex = 0;
        suggestionIndex < completions.length;
        suggestionIndex += 1
      ) {
        const suggestionRes = completions[suggestionIndex];
        const suggestion = li(
          {
            class: 'flex items-center gap-x-3 px-1 py-1 select-none cursor-pointer hover:bg-gray-600/40',
            // eslint-disable-next-line no-loop-func
            onclick: () => {
              searchInput.value = suggestionRes.expression;
              fetchFinishType(suggestionRes.expression);
              searchSuggestions.innerHTML = '';
            },
          },
          span({ class: 'icon w-min h-min icon-arrow-right -rotate-90 size-5 fill-current' }),
          span({ class: 'text-base tracking-wider' }, suggestionRes.expression),
        );
        searchSuggestions.append(suggestion);
      }
    } else {
      searchSuggestions.append(li({ class: 'text-center' }, 'No Results Found'));
      setTimeout(() => {
        searchSuggestions.innerHTML = '';
      }, 1500);
    }
    decorateIcons(searchSuggestions);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Something happenned during request submission', e);
  }
});

/**
 * Populate the search-suggestions & search-content API on user-input after specific time-interval
 */
function handleSearchTyping(event) {
  let { value } = event.target;
  const searchTermValue = value.trim();
  value = value.trim();
  if (value === '' && value !== searchString) {
    searchContent.innerHTML = '';
    searchSuggestions.innerHTML = '';
  }
  if (value !== searchString) {
    fetchSuggestions(value);
    fetchFinishType(value);
  }
  searchString = value;
  if (searchTermValue === '') emptySearchbar.classList.add('hidden');
  else emptySearchbar.classList.remove('hidden');
}

/**
 * Nullify the shown suggestions
 */
function handleSearchBlur() {
  setTimeout(() => {
    searchSuggestions.innerHTML = '';
  }, 200);
}

function handleSelectHistory(searchPacket) {
  const { terms } = searchPacket;
  terms.forEach((eachTerm) => {
    if (eachTerm.type === 'facet') {
      let currentFacet;
      facetsCollection[eachTerm.listType] = Object.keys(facetsCollection).length > 0
      && eachTerm.listType in facetsCollection ? facetsCollection[eachTerm.listType] : [];
      facetsCollection[eachTerm.listType].push(eachTerm.name);
      payload.facets = payload?.facets.map((facet) => {
        if (facet.facetId === eachTerm.listType) {
          facet.currentValues.forEach((curFacVal, curFacValIndex) => {
            if (curFacVal.value === eachTerm.name) {
              facet.currentValues[curFacValIndex].state = 'selected';
              currentFacet = facet.currentValues[curFacValIndex];
            }
          });
        }
        return facet;
      });
      const selectedFacet = span(
        {
          id: `facet-${eachTerm.name}`,
          class: 'flex gap-x-2 pr-[5px] py-[5px] pl-4 text-white bg-slate-200/20 rounded-full select-none cursor-pointer facet-selected group',
          title: eachTerm.name,
          onclick: () => {
            if (eachTerm.listType in facetsCollection) {
              if (facetsCollection[eachTerm.listType].length === 0) {
                delete facetsCollection[eachTerm.listType];
              } else {
                // eslint-disable-next-line max-len
                const facetItemIndex = facetsCollection[eachTerm.listType].indexOf(eachTerm.name);
                facetsCollection[eachTerm.listType].splice(facetItemIndex, 1);
              }
            }
            facetAction(currentFacet, eachTerm.listType, 'idle');
            searchInput.parentElement.removeChild(selectedFacet);
          },
        },
        span(
          { class: 'max-w-32 text-2xl truncate' },
          eachTerm.name,
        ),
        span({ class: 'icon icon-close size-7 my-auto p-1 text-black fill-current cursor-pointer bg-purple-50/20 group-hover:bg-purple-50/40 rounded-full transition-transform group-hover:scale-110' }),
      );
      decorateIcons(selectedFacet);
      searchInput.parentElement.insertBefore(selectedFacet, searchInput);
    } else if (eachTerm.type === 'text') {
      searchInput.value = eachTerm.name;
    }
  });
  fetchFinishType(searchInput.value);
}

function decorateSearchHistory(searchHistory) {
  searchContent.innerHTML = '';
  if (searchHistory && searchHistory.length > 0) {
    const facetGroup = div(
      { class: 'flex flex-col' },
      h3({ class: 'font-medium text-slate-200/40 text-2xl leading-8 mb-2 pl-3 md:pl-0' }, 'Previous searches'),
    );
    const facetList = ul({ class: 'flex flex-row flex-wrap md:flex-col gap-x-2 gap-y-5' });
    for (let historyIndex = 0; historyIndex < searchHistory.length; historyIndex += 1) {
      if ('terms' in searchHistory[historyIndex] && searchHistory[historyIndex].terms.length > 0) {
        const searchHistoryElement = li(
          {
            class: 'w-max select-none text-lg text-white leading-5 flex items-center gap-x-3 tracking-wider cursor-pointer',
            onclick: () => handleSelectHistory(searchHistory[historyIndex]),
          },
          span({ class: 'icon icon-search size-8 block [&_img]:invert cursor-pointer p-2 bg-slate-100/20 hover:bg-slate-100/40 rounded-full' }),
        );
        searchHistory[historyIndex].terms.forEach((eachTerm) => {
          if (eachTerm.type === 'facet') {
            searchHistoryElement.appendChild(
              span({ class: 'bg-slate-200/30 hover:bg-slate-200/40 px-4 py-2 rounded-full font-normal' }, eachTerm.name),
            );
          } else searchHistoryElement.appendChild(span(eachTerm.name));
          return span(eachTerm.name);
        });
        facetList.append(searchHistoryElement);
      }
    }
    facetGroup.append(facetList);
    searchContent.append(facetGroup);
    decorateIcons(searchContent);
  }
}

async function fetchSearchHistory() {
  const url = `https://${mockServerId}.mock.pstmn.io/search-term-history?limit=10`;
  // eslint-disable-next-line max-len
  const { history } = await makeCoveoSearchRequest(url);
  // CREATING THE LAYOUT
  decorateSearchHistory(history);
}

/**
 * Clear out the search-term & all the selected facets
 */
function handleEmptySearchTerms() {
  searchInput.value = '';
  searchSuggestions.innerHTML = '';
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
  fetchSearchHistory();
}

function buildSearchBackdrop() {
  fetchSearchHistory();
  totalResultCount = p({ id: 'total-result-count', class: 'text-5xl md:text-7xl lg:text-8xl' }, '0');
  disclaimers = div(
    { class: 'w-full fixed bottom-0 text-black font-normal hidden' },
    div(
      { class: 'grid grid-cols-5' },
      div(
        { class: 'hidden md:col-span-2 lg:col-span-3 md:flex flex-col bg-purple-50 px-8 py-3 text-purple-800 text-sm place-content-center' },
        'Spotlight',
        a(
          { class: 'flex items-center text-base text-black' },
          'Discover the all new CellXpress.ai Automated Cell Culture System',
          span({ class: 'icon icon-arrow-right size-5 ml-2 shrink-0' }),
        ),
      ),
      div(
        { class: 'col-span-5 md:col-span-3 lg:col-span-2 bg-purple-500 px-8 py-3 text-white flex justify-between' },
        div(
          { class: 'flex flex-col place-content-center [&_p]:leading-4' },
          p({ class: 'text-2xl md:text-3xl' }, 'Total results'),
          a(
            {
              href: '#',
              class: 'flex items-center text-base font-bold mt-4',
            },
            'Visit Results',
            span({ class: 'icon icon-arrow-right size-5 [&_img]:invert ml-2' }),
          ),
        ),
        totalResultCount,
      ),
    ),
  );
  emptySearchbar = span({
    id: 'empty-searchbar',
    class: 'icon icon-close size-7 hidden absolute me-3 inset-y-0 right-0 my-auto text-white fill-current cursor-pointer',
    onclick: handleEmptySearchTerms,
  });
  searchContent = div({
    id: 'search-content',
    class: 'container h-3/4 md:h-4/6 overflow-y-scroll mt-4 mx-auto mb-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-max gap-x-12 gap-y-3',
  });
  searchSuggestions = ul({
    id: 'search-suggestions',
    class: 'min-w-80 max-w-xl flex flex-col gap-y-2 px-4 py-2 empty:hidden',
  });
  searchInput = input({
    class: 'w-auto relative py-1 pl-2 md:pl-0 flex flex-grow text-white font-medium bg-transparent tracking-wider text-lg sm:text-xl placeholder-grey-300 outline-none',
    id: 'search-input',
    placeholder: 'Search here...',
    type: 'text',
    autocomplete: 'off',
    onkeyup: handleSearchTyping,
    onblur: handleSearchBlur,
  });
  const searchBackdropContainer = div(
    {
      id: 'search-container',
      class: 'w-screen h-screen fixed top-0 left-0 z-50 transition-all -translate-y-full [&_#search-product]:hidden [&_#search-content]:hidden',
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
            { class: 'w-full relative sm:border border-b sm:border-solid rounded-none md:rounded-full flex flex-wrap gap-1 py-2 pl-8 pr-0 md:px-12 border-cyan-600 md:border-white' },
            span({
              class: 'icon icon-search size-7 hidden md:block bg-transparent text-white absolute flex ms-3 p-1 md:p-0 inset-y-0 start-0 my-auto [&_img]:invert cursor-pointer',
            }),
            span({
              class: 'icon icon-chevron-down size-7 rotate-90 block md:hidden bg-transparent text-white absolute flex ms-3 p-1 md:p-0 inset-y-0 start-0 my-auto [&_img]:invert cursor-pointer',
              onclick: () => {
                const searchContainer = document.querySelector('#search-container');
                if (searchContainer) searchContainer.classList.add(...'-translate-y-full [&_#search-product]:hidden [&_#search-content]:hidden'.split(' '));
                if (searchContainer) searchContainer.nextElementSibling.classList.add(...'transition-all -translate-y-full'.split(' '));
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
                if (searchContainer) searchContainer.classList.add(...'-translate-y-full [&_#search-product]:hidden [&_#search-content]:hidden'.split(' '));
                if (searchContainer) searchContainer.nextElementSibling.classList.add(...'transition-all -translate-y-full'.split(' '));
              },
            },
            span({ class: 'text-base hidden lg:block group-hover:underline' }, 'Close'),
            span({
              id: 'close-search-container',
              class: 'icon icon-close size-8 p-1 group-hover:rotate-90 transition-transform',
            }),
          ),
        ),
        div(
          { class: 'absolute bg-black text-white z-10' },
          searchSuggestions,
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
          if (searchContainer) searchContainer.classList.remove(...'-translate-y-full [&_#search-product]:hidden [&_#search-content]:hidden'.split(' '));
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
    parentWrapper.append(div({ class: 'w-screen h-screen fixed top-0 left-0 bg-gradient-to-bl from-black to-gray-800 opacity-60 z-40 transition-all -translate-y-full' }));
    decorateIcons(parentWrapper);
  }
  block.append(pictureTag);
  block.append(parentWrapper);
}
