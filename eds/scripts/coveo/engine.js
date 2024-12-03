import { buildSearchEngine, getOrganizationEndpoints } from '@coveo/headless';
import { buildCommerceEngine } from '@coveo/headless/commerce';

export const searchEngine = buildSearchEngine({
  configuration: {
    organizationId: 'danahernonproduction1892f3fhz',
    accessToken: 'xx26097312-c0ba-4c54-b22d-0a258570650a',
    organizationEndpoints: getOrganizationEndpoints(
      'danahernonproduction1892f3fhz'
    ),
    search: {
      pipeline: 'Abcam Content Search',
      searchHub: 'AbcamContentSearch',
    },
  },
});

export const ecommerceEngine = buildCommerceEngine({
  configuration: {
    organizationId: 'danahernonproduction1892f3fhz',
    accessToken: 'xx27ea823a-e994-4d71-97f6-403174ec592a',
    analytics: {
      trackingId: 'abcamtest',
    },
    organizationEndpoints: getOrganizationEndpoints(
      'danahernonproduction1892f3fhz'
    ),
    context: {
      currency: 'USD',
      country: 'us',
      language: 'en',
      view: {
        url: 'https://lifesciences.danaher.com',
      },
    },
  },
});
