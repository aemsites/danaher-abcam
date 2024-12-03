import {
    buildSearchBox,
    buildResultList,
    buildTab,
    buildFacet,
    buildPager,
    buildSort,
    SearchBox as SearchBoxType,
  } from '@coveo/headless';
  //import { buildSearch } from '@coveo/headless/commerce';
  import { searchEngine, ecommerceEngine } from '../engine/engine.js';

  const headlessSearchBox = SearchBoxType;
  
  export const searchBoxController = buildSearchBox(searchEngine);
  export const searchResultListController = buildResultList(searchEngine);
  export const selectSuggestion = buildSearchBox(headlessSearchBox.selectSuggestion('a'));
  //export const ecommerceSearchController = buildSearch(ecommerceEngine);
  export const pagerController = buildPager(searchEngine);
  export const allTabController = buildTab(searchEngine, {
    options: { expression: '', id: 'all' },
  });
  export const pageTabController = buildTab(searchEngine, {
    options: { expression: '@filetype==html', id: 'html' },
  });
  export const videoTabController = buildTab(searchEngine, {
    options: { expression: '@filetype==YouTubeVideo', id: 'video' },
  });
  // export const productsTabController = buildTab(ecommerceEngine, {
  //   options: { expression: '', id: 'products' },
  // });
  export const sourceFacetController = buildFacet(searchEngine, {
    options: { field: 'source' },
  });
  export const filetypeFacetController = buildFacet(searchEngine, {
    options: { field: 'filetype' },
  });
  export const sortController = buildSort(searchEngine, {
    initialState: {
      criterion: { by: 'relevancy' },
    },
  });
  