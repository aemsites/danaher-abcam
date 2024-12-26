import {
  buildSearchBox,
  buildResultList,
  buildPager,
  buildFacet,
  buildSort,
} from 'https://static.cloud.coveo.com/headless/v3/headless.esm.js'; //eslint-disable-line
import coveoEngines from './engine.js';

const { searchEngine } = coveoEngines;

// const headlessSearchBox = SearchBoxType;

const searchBoxController = buildSearchBox(searchEngine, {
  options: {
    numberOfSuggestions: 5,
  },
});
export const searchResultListController = buildResultList(searchEngine, {
  options: {
    fieldsToInclude: [
      'productcode',
      'producttags',
      'reviewssummaryjson',
      'target',
      'reactivityapplications',
      'reactivityspecies',
      'hostspecies',
      'imagesjson',
      'numpublications',
    ],
  },
});

export const pagerController = buildPager(searchEngine);
export const sourceFacetController = buildFacet(searchEngine, {
  options: { field: 'source' },
});
// export const selectSuggestion = buildSearchBox(headlessSearchBox.selectSuggestion('a'));
// //export const ecommerceSearchController = buildSearch(ecommerceEngine);
// export const allTabController = buildTab(searchEngine, {
//   options: { expression: '', id: 'all' },
// });
// export const pageTabController = buildTab(searchEngine, {
//   options: { expression: '@filetype==html', id: 'html' },
// });
// export const videoTabController = buildTab(searchEngine, {
//   options: { expression: '@filetype==YouTubeVideo', id: 'video' },
// });
// // export const productsTabController = buildTab(ecommerceEngine, {
// //   options: { expression: '', id: 'products' },
// // });
// export const filetypeFacetController = buildFacet(searchEngine, {
//   options: { field: 'filetype' },
// });
export const pagetypeFacetController = buildFacet(searchEngine, {
  options: { field: 'pagetype' },
});
export const sortController = buildSort(searchEngine, {
  initialState: {
    criterion: { by: 'relevancy' },
  },
});

const coveoController = {
  searchBoxController,
};

export default coveoController;
