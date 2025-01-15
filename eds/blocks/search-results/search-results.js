import {
  div, p, button, span, a, img, label, input,
} from '../../scripts/dom-builder.js';
import { decorateIcons } from '../../scripts/aem.js';

function getStarRating(rating, starParent, size = 'size-4') {
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

const productsUrl = 'https://danahernonproduction1892f3fhz.org.coveo.com/rest/organizations/danahernonproduction1892f3fhz/commerce/v2/search';

const headers = {
  Authorization: 'Bearer xx27ea823a-e994-4d71-97f6-403174ec592a',
  'Content-Type': 'application/json',
};

const bodyData = {
  trackingId: 'abcam_us',
  clientId: '39a20fea-f90a-4c43-a643-6f7d08072b5f',
  context: {
    user: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0',
    },
    view: {
      url: 'https://www.abcam.com',
    },
    capture: true,
    cart: [],
    source: [
      '@coveo/headless@3.10.0',
    ],
  },
  language: 'en',
  country: 'us',
  currency: 'USD',
  page: 0,
  perPage: 10,
  sort: {
    sortCriteria: 'relevance',
  },
  query: '',
};

async function fetchProducts(page) {
  bodyData.page = page;

  try {
    const response = await fetch(productsUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyData),
    });

    const data = await response.json();
    const results = data;
    console.log("facets", results);

    const { totalPages, totalEntries } = results.pagination;
    const searchProductsList = results.products.map((product) => {
      let productDetails = null;

      try {
        productDetails = JSON.parse(product.additionalFields.catalogasset);
      } catch (error) {
        return '';
      }

      if (productDetails && productDetails.length > 0) {
        const firstProductDetail = productDetails[0];

        const sizeInfo = firstProductDetail.PricePublicAssetCode;

        return {
          id: product.ec_product_id,
          name: product.ec_name,
          tagName: product.additionalFields.adtags,
          publications: product.additionalFields.adpublicationscount,
          aggregatedRating: product.additionalFields.adreviewsaggregaterating,
          reviewsCount: product.additionalFields.adreviewscount,
          targetName: product.additionalFields.adprimarytargetname,
          applicationsName: product.additionalFields.adapplications,
          reactivity: product.additionalFields.adspecies,
          hostSpecies: product.additionalFields.adhostspecies,
          clickUrl: product.additionalFields.clickableuri,
          imgagesUrl: product.additionalFields.images,
          productPrice: firstProductDetail.PriceAssetProductPrice,
          quantitySize: sizeInfo,
          stockAvailability: firstProductDetail.PriceAssetInStockAvailablilty,
        };
      }
      return {};
    });

    const searchProducts = document.querySelector('.products-list');
    const searchItems = searchProductsList.map((item) => {
      const searchItem = div(
        { class: 'flex md:flex-row border rounded mb-4' },
        div(
          { class: 'flex md:flex-row py-4 pl-6 pr-8 gap-x-6 w-3/4' },
          p(
            { class: 'm-0 relative' },
            img({
              class: 'w-28 h-32 mb-6 object-cover',
              src: Array.isArray(item.imgagesUrl) && item.imgagesUrl.length > 0
                ? item.imgagesUrl[0]
                : item.imgagesUrl || '',
            }),
            span(
              { class: 'text-xs bg-black px-2 py-1 rounded-tl rounded-br text-white absolute right-0 top-28' },
              (item.imgagesUrl && item.imgagesUrl.length) || 0,
              ' ',
              'Images',
            ),
            label(
              { class: 'flex gap-3.5 items-center text-sm font-medium' },
              input({ type: 'checkbox', class: 'w-5 h-5 rounded font-bold border-4' }),
              'Compare',
            ),
          ),
          div(
            { class: 'flex flex-col gap-y-1' },
            span({ class: 'text-xs lowercase font-bold text-[#65797C]' }, item.id),
            span({ class: 'text-xl font-semibold' }, item.name),
            p(
              { class: 'space-x-4' },
              span({ class: 'text-xs font-semibold text-[#378189] bg-[#EDF6F7] p-2' }, item.tagName || ''),
              a({ class: 'text-[10px] font-medium text-black underline underline-offset-1' }, 'What is this?'),
            ),
            p(
              { class: 'flex items-center space-x-4' },
              span(
                { class: 'flex text-xs items-center' },
                span({ class: 'text-sm text-black font-medium mr-2' }, item.aggregatedRating || 0),
                getStarRating(item.aggregatedRating || 0, span({ class: 'flex gap-1' })),
                span(
                  { class: 'text-[13px] text-[#378089] underline font-normal ml-2' },
                  `(${item.reviewsCount || 0} Reviews)`,
                ),
              ),
              span({ class: 'text-[#D8D8D8]' }, '|'),
              span({ class: 'text-[13px] text-[#378089] underline font-normal' }, item.publications, ' ', 'Publications'),
            ),
            item.targetName && item.targetName.length > 0 ? div(
              { class: 'flex gap-3.5 items-center' },
              p({ class: 'text-[#65797C] text-xs font-medium m-0 w-24 flex-shrink-0' }, 'Target'),
              p({ class: 'text-sm font-medium m-0' }, item.targetName),
            ) : '',
            item.applicationsName && item.applicationsName.length > 0 ? div(
              { class: 'flex gap-3.5 items-center mt-1' },
              p({ class: 'text-[#65797C] text-xs font-medium m-0 w-24 flex-shrink-0' }, 'Applications'),
              p({ class: 'text-sm font-medium m-0' }, item.applicationsName.join(', ')),
            ) : '',
            item.reactivity && item.reactivity.length > 0 ? div(
              { class: 'flex gap-3.5 mt-1' },
              p({ class: 'text-[#65797C] text-xs font-medium m-0 !w-24 flex-shrink-0' }, 'Reactivity'),
              p({ class: 'text-sm font-medium m-0 w-full' }, item.reactivity.join(', ')),
            ) : '',
            item.hostSpecies && item.hostSpecies.length > 0 ? div(
              { class: 'flex gap-3.5 items-center mt-1' },
              p({ class: 'text-[#65797C] text-xs font-medium m-0 w-24 flex-shrink-0' }, 'Host Species'),
              p({ class: 'text-sm font-medium m-0' }, item.hostSpecies),
            ) : '',
          ),
        ),
        div(
          { class: 'bg-[#edf6f7] p-6 w-1/4' },
          p({ class: 'text-2xl font-bold m-0' }, 'US$', ' ', item.productPrice),
          p({ class: 'text-xs font-normal m-0' }, '(excl. VAT)'),
          p(
            { class: 'text-xs font-normal mt-4 mb-0' },
            item.quantitySize
              ? (item.quantitySize.includes('|') && item.quantitySize.indexOf(' | More sizes available') === -1
                ? item.quantitySize.replace(/\|/g, '').replace(/^.*?-(.*)$/, '$1') // Remove | for 0th element
                : `${item.quantitySize.replace(/^.*?-(.*)$/, '$1')} | More sizes available` // Append if more sizes
              )
              : '',
          ),
          p(
            { class: 'mt-4 mb-0' },
            span(
              { class: 'text-xs font-bold' },
              item.stockAvailability ? 'In stock' : item.stockAvailability,
            ),
          ),
          p(
            { class: 'mt-4 mb-0' },
            a(
              { class: 'flex gap-2 items-center text-sm text-[#378089] font-bold mt-4', href: item.clickUrl },
              'View Product',
              span({ class: 'icon icon-arrow-right text-[#378089]' }),
            ),
          ),
        ),
      );
      decorateIcons(searchItem);
      return searchItem;
    });

    searchProducts.innerHTML = '';
    searchProducts.append(...searchItems);

    renderProductsPagination(totalPages, page);
    const productsButton = document.querySelector('button[data-tab="products"]');
    if (productsButton) {
      productsButton.innerHTML = `Products (${totalEntries})`;
    }
  } catch (error) {
    return '';
  }
}

const resourcesUrl = 'https://danahernonproduction1892f3fhz.org.coveo.com/rest/search/v2';

const resourcesHeaders = {
  Authorization: 'Bearer xx26097312-c0ba-4c54-b22d-0a258570650a',
  'Content-Type': 'application/json',
};

const contentBodyData = {
  locale: 'en-US',
  debug: false,
  tab: 'default',
  referrer: '',
  timezone: 'America/New_York',
  pipeline: 'Abcam Content Search',
  q: '',
  enableQuerySyntax: false,
  searchHub: 'AbcamContentSearch',
  sortCriteria: 'relevancy',
  analytics: {
    clientId: '39a20fea-f90a-4c43-a643-6f7d08072b5f',
    clientTimestamp: '2025-01-07T04:38:07.055Z',
    documentReferrer: '',
    documentLocation: 'https://vitejsvitekr2jzh-a2bv--5173--c8c182a3.local-corp.webcontainer.io/',
    originContext: 'Search',
    actionCause: 'searchboxSubmit',
    capture: true,
    source: ['@coveo/headless@3.10.0'],
  },
  facets: [
    {
      filterFacetCount: true,
      injectionDepth: 1000,
      numberOfValues: 8,
      sortCriteria: 'occurrences',
      resultsMustMatch: 'atLeastOneValue',
      type: 'specific',
      freezeCurrentValues: false,
      isFieldExpanded: false,
      preventAutoSelect: false,
      field: 'pagetype',
      facetId: 'pagetype',
      tabs: {},
      activeTab: '',
    },
  ],
  numberOfResults: 10,
  firstResult: 0,
  facetOptions: {
    freezeFacetOrder: false,
  },
};

async function fetchResources(page) {
  contentBodyData.firstResult = page * contentBodyData.numberOfResults;

  try {
    const response = await fetch(resourcesUrl, {
      method: 'POST',
      headers: resourcesHeaders,
      body: JSON.stringify(contentBodyData),
    });

    const data = await response.json();

    console.log('facets', data.facets);

    const { totalCount } = data;
    const results = data.results || [];
    const totalPages = Math.ceil(data.totalCount / contentBodyData.numberOfResults);

    const resourcesContainer = document.querySelector('.products-resources');
    const resourcesItems = results.map((item) => div(
      { class: 'content-item border rounded mb-4 py-4 pl-6 pr-8' },
      item.raw.pagetype && item.raw.pagetype.length > 0 ? p({ class: 'w-fit rounded font-semibold text-xs bg-[#EDF6F7] text-[#378189] py-1 px-2' }, item.raw.pagetype) : '',
      a({ class: 'text-lg font-semibold hover:text-[#378189] hover:underline leading-7', href: item.raw.sysclickableuri }, item.raw.systitle),
      p({ class: 'text-base text-black font-normal leading-6 tracking-[.3px]' }, item.excerpt || ''),
    ));

    resourcesContainer.innerHTML = '';
    resourcesContainer.append(...resourcesItems);

    renderResourcesPagination(totalPages, page);
    const resourcesButton = document.querySelector('button[data-tab="resources"]');
    if (resourcesButton) {
      resourcesButton.innerHTML = `Resources (${totalCount})`;
    }
  } catch (error) {
    console.error('Error fetching content:', error);
  }
}

const currentPage = 0;

function renderProductsPagination(totalPages, currentPage) {
  const paginationContainer = document.querySelector('.products-pagination');
  paginationContainer.innerHTML = '';

  const pageRange = 1;

  let startPage; let
    endPage;

  if (totalPages <= 3) {
    startPage = 0;
    endPage = totalPages - 1;
  } else {
    startPage = Math.max(0, currentPage - pageRange);
    endPage = Math.min(totalPages - 1, currentPage + pageRange);

    if (currentPage === 0) {
      endPage = Math.min(totalPages - 1, 2);
    }
    if (currentPage === totalPages - 1) {
      startPage = Math.max(0, totalPages - 3);
    }
  }

  const prevButton = button(
    {
      class: `prev-btn h-11 w-11 rounded-full hover:bg-[#D8D8D8] hover:underline flex justify-center items-center ${currentPage === 0 ? 'disabled' : ''}`,
      onclick: () => currentPage > 0 && fetchProducts(currentPage - 1),
    },
    span({ class: 'prev-icon icon icon-chevron-right !rotate-180' }),
  );

  const nextButton = button(
    {
      class: `next-btn h-11 w-11 rounded-full hover:bg-[#D8D8D8] hover:underline flex justify-center items-center ${currentPage === totalPages - 1 ? 'disabled' : ''}`,
      onclick: () => currentPage < totalPages - 1 && fetchProducts(currentPage + 1),
    },
    span({ class: 'icon icon-chevron-right' }),
  );

  paginationContainer.append(prevButton);
  decorateIcons(prevButton);

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = button(
      {
        class: `page-btn h-11 w-11 rounded-full hover:bg-[#D8D8D8] hover:underline ${i === currentPage ? 'active bg-[#D8D8D8] hover:underline' : ''}`,
        onclick: () => fetchProducts(i),
      },
      i + 1,
    );
    paginationContainer.append(pageButton);
  }

  paginationContainer.append(nextButton);
  decorateIcons(nextButton);
}

function renderResourcesPagination(totalPages, currentPage) {
  const paginationContainer = document.querySelector('.resources-pagination');
  paginationContainer.innerHTML = '';

  const pageRange = 1;

  let startPage;
  let endPage;

  if (totalPages <= 3) {
    startPage = 0;
    endPage = totalPages - 1;
  } else {
    startPage = Math.max(0, currentPage - pageRange);
    endPage = Math.min(totalPages - 1, currentPage + pageRange);

    if (currentPage === 0) {
      endPage = Math.min(totalPages - 1, 2);
    }
    if (currentPage === totalPages - 1) {
      startPage = Math.max(0, totalPages - 3);
    }
  }

  const prevButton = button(
    {
      class: `prev-btn h-11 w-11 rounded-full hover:bg-[#D8D8D8] hover:underline flex justify-center items-center ${currentPage === 0 ? 'disabled' : ''}`,
      onclick: () => currentPage > 0 && fetchResources(currentPage - 1),
    },
    span({ class: 'prev-icon icon icon-chevron-right !rotate-180' }),
  );

  const nextButton = button(
    {
      class: `next-btn h-11 w-11 rounded-full hover:bg-[#D8D8D8] hover:underline flex justify-center items-center ${currentPage === totalPages - 1 ? 'disabled' : ''}`,
      onclick: () => currentPage < totalPages - 1 && fetchResources(currentPage + 1),
    },
    span({ class: 'icon icon-chevron-right' }),
  );

  paginationContainer.append(prevButton);
  decorateIcons(prevButton);

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = button(
      {
        class: `page-btn h-11 w-11 rounded-full hover:bg-[#D8D8D8] hover:underline ${i === currentPage ? 'active bg-[#D8D8D8]' : ''}`,
        onclick: () => fetchResources(i),
      },
      i + 1,
    );
    paginationContainer.append(pageButton);
  }

  paginationContainer.append(nextButton);
  decorateIcons(nextButton);
}

function initializePagination() {
  fetchProducts(currentPage);
}

export default function decorate(block) {
  const tabsContainer = div(
    { class: 'tabs-container' },
    div(
      { class: 'flex justify-between tabs border-b-[1px] border-gray-200 my-8' },
      div(
        { class: 'flex gap-12' },
        button({ class: 'tab-button text-[#071112] text-base font-semibold leading-6 tracking-[.2px] pb-3 active', 'data-tab': 'products' }, 'Products'),
        button({ class: 'tab-button text-[#071112] text-base font-semibold leading-6 tracking-[.2px] pb-3', 'data-tab': 'resources' }, 'Resources'),
      ),
      div({}, 'pagination'),
    ),
    div({ class: 'tab-content' }),
  );

  const wrapper = div(
    { class: 'grid grid-cols-7 space-x-8' },
    div(
      { class: 'md:col-span-2 w-full h-screen md:h-auto fixed md:relative flex flex-col-reverse justify-end top-0 left-0 z-50 md:z-auto transition-all duration-150 -translate-y-full md:translate-y-0' },
      p({ class: 'h-5/6 mb-3 overflow-scroll md:overflow-visible z-[1]' }),
      p(
        { class: 'w-full fixed block md:hidden bottom-0 px-4 py-2 my-0 border-t z-[2]' },
        button({ class: 'w-full text-sm text-white font-semibold bg-[#378189] p-3 rounded-full' }, 'View Results'),
      ),
      p(
        { class: 'relative flex flex-row justify-between items-center gap-x-2 px-4 md:px-0 py-2 md:py-0 my-0 text-black' },
        span({ class: 'text-lg md:text-xl leading-5 md:leading-5 font-normal md:font-bold mb-0 md:mb-4' }, 'Filters'),
        p(
          { class: 'flex md:hidden flex-row items-center gap-x-2 my-0' },
          span({ class: 'clear-all hidden shrink-0 text-xs font-semibold underline cursor-pointer' }, 'Clear All'),
          span({ class: 'icon icon-close size-8 invert p-1' }),
        ),
      ),
    ),
    div(
      { class: 'col-span-5' },
      div({ class: 'products-list' }),
    ),
    div({ class: 'products-pagination col-span-12 flex justify-center gap-2 !ml-0 mt-10 pt-6 border-t border-[#DBDBDB]' }),
  );

  const resourcesWrapper = div(
    { class: 'resources-content grid grid-cols-7 space-x-8 hidden' },
    div(
      { class: 'md:col-span-2 w-full h-screen md:h-auto fixed md:relative flex flex-col-reverse justify-end top-0 left-0 z-50 md:z-auto transition-all duration-150 -translate-y-full md:translate-y-0' },
      p({ class: 'h-5/6 mb-3 overflow-scroll md:overflow-visible z-[1]' }),
      p(
        { class: 'w-full fixed block md:hidden bottom-0 px-4 py-2 my-0 border-t z-[2]' },
        button({ class: 'w-full text-sm text-white font-semibold bg-[#378189] p-3 rounded-full' }, 'View Results'),
      ),
      p(
        { class: 'relative flex flex-row justify-between items-center gap-x-2 px-4 md:px-0 py-2 md:py-0 my-0 text-black' },
        span({ class: 'text-lg md:text-xl leading-5 md:leading-5 font-normal md:font-bold mb-0 md:mb-4' }, 'Filters'),
        p(
          { class: 'flex md:hidden flex-row items-center gap-x-2 my-0' },
          span({ class: 'clear-all hidden shrink-0 text-xs font-semibold underline cursor-pointer' }, 'Clear All'),
          span({ class: 'icon icon-close size-8 invert p-1' }),
        ),
        p({ class: 'resources-facets' }),
      ),
    ),
    div(
      { class: 'col-span-5' },
      div({ class: 'products-resources' }),
    ),
    div({ class: 'resources-pagination col-span-12 flex justify-center gap-2 !ml-0 mt-10 pt-6 border-t border-[#DBDBDB]' }),
  );

  const tabresourcesContainer = tabsContainer.querySelector('.tab-content');
  tabresourcesContainer.append(wrapper);
  tabresourcesContainer.append(resourcesWrapper);

  block.append(tabsContainer);

  const tabButtons = tabsContainer.querySelectorAll('.tab-button');

  const firstTab = tabButtons[0];
  firstTab.classList.add('active', 'border-b-[6px]', 'border-[#FF7223]');

  tabButtons.forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      tabButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.classList.remove('border-b-[6px]', 'border-[#FF7223]');
      });

      const contents = tabsContainer.querySelectorAll('.tab-content > div');
      contents.forEach((content) => content.classList.add('hidden'));

      tabBtn.classList.add('active', 'border-b-[6px]', 'border-[#FF7223]');

      const tabName = tabBtn.getAttribute('data-tab');
      if (tabName === 'products') {
        wrapper.classList.remove('hidden');
        resourcesWrapper.classList.add('hidden');
        fetchProducts(currentPage);
      } else if (tabName === 'resources') {
        wrapper.classList.add('hidden');
        resourcesWrapper.classList.remove('hidden');
        fetchResources(currentPage);
      }
    });
  });

  initializePagination();
}
