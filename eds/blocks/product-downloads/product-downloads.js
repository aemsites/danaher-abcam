import { decorateIcons } from '../../scripts/aem.js';
import {
  hr, h2, div, span, button,
  h3,
  p,
  label,
  input,
  ul,
  li,
  a,
  form,
} from '../../scripts/dom-builder.js';
import countriesAndCodes from '../../scripts/country-list.js';

const productCode = document.querySelector('#skuitem').textContent;

async function fetchData(prodCode, countryCode) {
  document.querySelector('.download-items')?.remove();
  // const url = 'https://proxy-gateway.abcam.com/product';

  // const requestBody = {
  //   operationName: 'BROWSE_Document_sdsPdf',
  //   variables: {
  //     query: {
  //       productCode,
  //       countryCode,
  //     },
  //   },
  //   query: `query BROWSE_Document_sdsPdf($query: DocumentsFilter!) {
  //     document(filter: $query) {
  //       sds {
  //         countryCode
  //         languageCode
  //         name
  //         displayName
  //         url
  //         __typename
  //       }
  //       __typename
  //     }
  //   }`,
  // };

  // try {
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'x-abcam-app-id': 'b2c-public-website',
  //     },
  //     body: JSON.stringify(requestBody),
  //   });

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }
  //   const data = await response.json();
  //   console.log('API Response:', data);
  // } catch (error) {
  //   console.error('Error fetching data:', error);
  // }
  return {
    data: {
      document: {
        sds: [
          {
            countryCode: 'in',
            languageCode: 'en',
            name: 'sds-document-antibody-diluent-4br-ab181421.pdf',
            displayName: 'SDS Document Antibody Diluent 4BR ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP24979_GHS_EN.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=2d67579ee3e3553dddc32dff0773c3aa136c98a15f8bd69f03713d10482b0872&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'hi',
            name: 'sds-document-antibody-diluent-4br-ab181421.pdf',
            displayName: 'SDS Document Antibody Diluent 4BR ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP24979_GHS_HI.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=e67fda19290031ab0779aeb0b801f45802131fbad07a2cfcfff45cebfc874246&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'en',
            name: 'sds-document-sample-diluent-ns-ab193972-ab181421.pdf',
            displayName: 'SDS Document Sample Diluent NS (ab193972) ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP24408_GHS_EN.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=812b879dd59c3af0d2a33c5840a8f61c48be556f63a09e1e6c14e5e408d1b427&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'hi',
            name: 'sds-document-sample-diluent-ns-ab193972-ab181421.pdf',
            displayName: 'SDS Document Sample Diluent NS (ab193972) ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP24408_GHS_HI.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=1bd8f0b081355de69d1fa8636f2d292ef26767fb46461f839206233d2b00dbdb&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'en',
            name: 'sds-document-human-tnfa-lyophilized-recombinant-protein-ab181421.pdf',
            displayName: 'SDS Document Human TNFa Lyophilized Recombinant Protein ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP22781_GHS_EN.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=e25db9d0e3aed6bc2f0c426254bfb5259c311e8b5bfce1214c5af293cd81be12&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'hi',
            name: 'sds-document-human-tnfa-lyophilized-recombinant-protein-ab181421.pdf',
            displayName: 'SDS Document Human TNFa Lyophilized Recombinant Protein ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP22781_GHS_HI.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=0e2aeb57ab4bbd55f996f3bfb278c7a0250c65f7146536fb3c3cd7c6825038e3&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'en',
            name: 'sds-document-stop-solution-ab181421.pdf',
            displayName: 'SDS Document Stop Solution ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP20936_GHS_EN.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=a605daf640364314f4d680fcb797dedffd366790dc562ec15a7f35aacc54a04c&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'hi',
            name: 'sds-document-stop-solution-ab181421.pdf',
            displayName: 'SDS Document Stop Solution ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP20936_GHS_HI.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=9370e2a7f51cc6a07e23a25ea3aa12cff6392914b92a15945ebd90995c01d2e4&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'en',
            name: 'sds-document-human-tnfa-capture-antibody-ab181421.pdf',
            displayName: 'SDS Document Human TNFa Capture Antibody ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP22779_GHS_EN.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=8d1f8c8678213ae90ede1d10017682bc6f3f73be1ef9ebcbd7c76cb772bcb4a7&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'hi',
            name: 'sds-document-human-tnfa-capture-antibody-ab181421.pdf',
            displayName: 'SDS Document Human TNFa Capture Antibody ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP22779_GHS_HI.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=29b2fedf344f17055778612e73586d3a422a90adec853e13453d7ee4d178617a&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'en',
            name: 'sds-document-10x-wash-buffer-pt-ab206977-ab181421.pdf',
            displayName: 'SDS Document 10X Wash Buffer PT (ab206977) ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP20931_GHS_EN.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=9c65bf59cb715a2e78bcca74b2f4fbe854d26825a48502153dc2be918bf19836&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'hi',
            name: 'sds-document-10x-wash-buffer-pt-ab206977-ab181421.pdf',
            displayName: 'SDS Document 10X Wash Buffer PT (ab206977) ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP20931_GHS_HI.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=74df44b773ea3f9faacc7b37224a35967e200126a77270b228ae2cf6282eaa33&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'en',
            name: 'sds-document-384-well-captsure-microplates-ab181421.pdf',
            displayName: 'SDS Document 384 well CaptSure™ microplates ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP54657_GHS_EN.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=5b2c20ea14440dd70f41cedba2171c08f1fea56d4d9fb3cc27a2ef826074eb89&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
          {
            countryCode: 'in',
            languageCode: 'hi',
            name: 'sds-document-384-well-captsure-microplates-ab181421.pdf',
            displayName: 'SDS Document 384 well CaptSure™ microplates ab181421',
            url: 'https://abcam-product-prod-sds.s3.eu-west-1.amazonaws.com/sds/CP54657_GHS_HI.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWVJ5CTMPL7WILKPE%2F20250110%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250110T114707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQDsIYi6a7LGQUZNluHo7qy2Xkddua34CwhU0xPnGZHv3gIhAO990wCPSvM4EoFvLI4u176Df1vKwIBo51vslgVM9EFpKoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBBoMNDU4MDc4OTg0OTkwIgwr921GVJEqA8OSsBAq2QLsBy3Jo9R1GP9nBH%2F%2F33tNxeMP9pHRsznL%2BoP5OwH%2FmwgKcOs%2B2JYq09NQlQFkR5m1fyH1JoXUWa0%2B1FqilNkp1H4694nB5cXwqr7c3F%2FTbVH5xaqTQ8e90cOLzREumS%2BNVgxJ9Jp6La8I9ev903Q3accO%2BJrw1gZOBbKANQyAR5YCEfbvZQv60rer%2B%2FrXGG9%2FN7ars8zTI6di8nvwPB7SIXe8XGRBeUypjLgU0g%2FVx2xVScqz%2FLxC%2F5FOhdJ2Z4rCn0mA4wvUb7i2RIYE82mdmaRgm9YLGSRxJsBRM3UZ82mNFAQU2MylOpAKuowwqFMUzlsZeB7ElUpXgQjivsaBLdXZLnMR%2B3tghPa979RJPzUTIvK%2BIYV6qSDUepfrZY7BdEqj1iJsl63PFu58hMXFqXbQSi2n1%2Fww%2Fg52zfBKxgQyeCcRVmfuefVeDVwQw5sDaf6KXWxjfawwo4aEvAY6nQH0jpBwuDEP9Jwb3WO612dY232W3yDvjNQri3V94nocuQsthImyHG8CAYuw7yJMM9FPY2VRauobqPRkoPlmf%2B%2B2hpVREvebeshmI2OrcRg2dv8ePVhxwuVViBmKl0HDX6nX5QC4Fqw4jINld7TbgAgcapz2Ag2E9jsgS%2FW5NKgUy6%2Faggnu21jLS4%2F89pzriT%2BiZ9UcqFIybu5soxL3&X-Amz-Signature=eaa4f05509937657456891badb73c8e1f4d0edd97b627186ff78a4bac2eff384&X-Amz-SignedHeaders=host&x-id=GetObject',
            __typename: 'SdsDocument',
          },
        ],
        __typename: 'Document',
      },
    },
  };
}
function getLanguageName(code) {
  try {
    return new Intl.DisplayNames(['en'], { type: 'language' }).of(code) || 'Unknown Language';
  } catch {
    return 'Invalid Language Code';
  }
}

function pdfDownloadCenter(data) {
  const uniqueLanguageCodes = [...new Set(data.data.document.sds.map((doc) => doc.languageCode))];
  let filteredDownloadsArr = data.data.document.sds
    .filter((doc) => doc.languageCode === uniqueLanguageCodes[0]);
  document.querySelector('.lang-label').classList.remove('opacity-30', 'cursor-not-allowed', 'bg-[#E2E2E2]');
  document.querySelector('.lang-label').firstChild.textContent = getLanguageName(uniqueLanguageCodes[0]);
  // eslint-disable-next-line no-use-before-define
  filteredDownloads(filteredDownloadsArr);
  const langUl = document.querySelector('.lang-name-ul');

  uniqueLanguageCodes.forEach((item) => {
    langUl.append(
      li(
        {
          class: 'p-3 text-black hover:bg-[#f2f2f2]',
          onclick() {
            filteredDownloadsArr = data.data.document.sds
              .filter((doc) => doc.languageCode === item);
            document.querySelector('.download-items')?.remove();
            document.querySelector('.lang-name-ul').classList.add('hidden');
            document.querySelector('.lang-label').firstChild.textContent = getLanguageName(item);
            // eslint-disable-next-line no-use-before-define
            filteredDownloads(filteredDownloadsArr);
          },
        },
        div(span({ class: 'lang-name truncate p-0.5' }, getLanguageName(item))),
      ),
    );
    langUl.querySelector('.lang-name').dataset.langCode = item;
  });
  document.querySelector('.lang-dd')?.append(langUl);

  function filteredDownloads(filteredArr) {
    const downloadItems = ul({ class: 'download-items max-w-lg mt-2 divide-y px-6' });
    filteredArr.forEach((downloadItem) => {
      const downloadLiEle = li(
        { class: 'flex flex-row items-center justify-between gap-x-2 py-4' },
        span({ class: 'pr-5 text-sm basis-[73%]' }, downloadItem.displayName),
        a(
          {
            class: 'rounded-2xl self-center basis-[27%] py-2 px-3 text-xs tracking-[.0125rem] h-8 bg-black inline-flex justify-center items-center',
            href: downloadItem.url,
          },
          span({ class: 'icon icon-download' }),
          span({ class: 'block px-1.5 font-semibold text-white' }, 'Download'),
        ),
      );
      downloadItems.append(downloadLiEle);
    });
    decorateIcons(downloadItems);
    document.querySelector('.modal-content').append(downloadItems);
  }
}

async function displayResults(query, resultsContainer) {
  resultsContainer.replaceChildren();
  const filteredCountries = (await countriesAndCodes())
    .filter(({ country }) => country.toLowerCase().includes(query));
  if (query.trim() === '') {
    resultsContainer.replaceChildren();
    return;
  }
  filteredCountries.forEach(({ code, country }) => {
    const resultItem = div(
      { class: 'result-item flex flex-row gap-x-2 p-3 text-black hover:bg-[#f2f2f2]' },
      div({ class: 'result-country' }, country),
    );
    resultItem.querySelector('.result-country').dataset.countryCode = code;
    resultItem.addEventListener('click', async (e) => {
      e.stopPropagation();
      const data = await fetchData(productCode, e.target.querySelector('.result-country').dataset.countryCode);
      pdfDownloadCenter(data);
      resultsContainer.replaceChildren();
      document.querySelector('.country-btn').firstChild.textContent = e.target.querySelector('.result-country').textContent;
      document.querySelector('.country-input').value = '';
      document.querySelector('.country-checkbox')?.click();
    });
    resultsContainer.appendChild(resultItem);
  });
}

function updateActiveItem(items, currentIndex) {
  items.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add('bg-gray-200');
      item.focus();
    } else {
      item.classList.remove('bg-gray-200');
    }
  });
}

function countrySelector(block) {
  const resultsContainer = block.querySelector('.country-results');
  resultsContainer.classList.remove('hidden');
  const countryInput = block.querySelector('.country-input');
  countryInput.addEventListener('input', (e) => {
    const query = countryInput.value.toLowerCase();
    e.stopImmediatePropagation();
    displayResults(query, resultsContainer);
  });

  let currentIndex = -1;
  countryInput.addEventListener('keydown', async (event) => {
    if (event.key === 'ArrowDown') {
      const items = resultsContainer.querySelectorAll('.result-item');
      event.preventDefault();
      currentIndex = (currentIndex + 1) % items.length;
      updateActiveItem(items, currentIndex);
    } else if (event.key === 'ArrowUp') {
      const items = resultsContainer.querySelectorAll('.result-item');
      event.preventDefault();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateActiveItem(items, currentIndex);
    } else if (event.key === 'Enter') {
      const items = resultsContainer.querySelectorAll('.result-item');
      if (currentIndex >= 0 && currentIndex < items.length) {
        const data = await fetchData(productCode, items[currentIndex].querySelector('.result-country').dataset.countryCode);
        pdfDownloadCenter(data);
        block.querySelector('.country-btn').firstChild.textContent = items[currentIndex].querySelector('.result-country').textContent;
        resultsContainer.replaceChildren();
        currentIndex = -1;
        block.querySelector('.country-input').value = '';
        block.querySelector('.country-checkbox')?.click();
      }
    }
  });
}
function downloadPDF(block, selectedDownload) {
  const modalContainer = div({
    class: 'modal-container fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-full opacity-100 bg-black bg-opacity-50 z-[300] transition-opacity duration-[5000ms] ease-out delay-1000',
  });
  let modalContent;
  if (selectedDownload === 'safety datasheet') {
    modalContent = div(
      { class: 'modal-content max-[476px]:h-full h-max w-max rounded bottom-0 relative flex flex-col bg-white' },
      div(
        { class: 'sds-heading flex flex-row justify-between pl-6 pr-5 pt-5' },
        h3({ class: 'self-center text-2xl font-semibold my-0' }, 'Safety datasheet'),
        button(
          {
            class: 'rounded-2xl my-0',
            onclick() { block.querySelector('.modal-container')?.remove(); },
          },
          span({ class: 'icon icon-cross-black' }),
        ),
      ),
      div(
        { class: 'sds-country-lang flex flex-col grow' },
        div(
          { class: 'max-w-lg px-6' },
          p({ class: 'select-heading pt-1 pr-10 my-0' }, 'Select your chosen country/region and language'),
          div(
            { class: 'country-and-lang flex flex-row min-w-full pb-5 my-6 gap-4' },
            div(
              { class: 'country-dd inline-flex flex-col relative' },
              input({ class: 'country-checkbox hidden peer', type: 'checkbox' }),
              div(
                { class: 'focus-visible:shadow-interactiveElement focus-visible:outline-none rounded-[28px] focus-visible:outline-none focus-visible:shadow-interactiveElement cursor-pointer' },
                div(
                  {
                    class: 'country-btn flex flex-row items-center rounded-[28px] w-fit-content border border-black border-opacity-50 text-xs text-black gap-3 py-2.5 pl-6 pr-4 hover:outline-none',
                    onclick() {
                      countrySelector(block);
                      modalContent.querySelector('.country-checkbox')?.click();
                    },
                  },
                  'Country/Region',
                  span({ class: 'icon icon-chevron-down' }),
                ),
              ),
              div(
                { class: 'country-container hidden peer-checked:block absolute top-full left-0 mt-1.5' },
                div(
                  { class: 'country-inner-container text-xs pb-1 font-semibold bg-white pb-4 pt-3 rounded-2xl shadow-2xl shadow-black shadow-elevation-5' },
                  label({ class: 'country-selector-lable text-black pl-4 tracking-normal text-lg' }, 'Country/Region selector'),
                  div(
                    { class: 'input-area relative pt-2' },
                    input({
                      type: 'text',
                      class: 'country-input border border-gray-300 px-4 mb-4 bg-[#F2F3F3] hover:bg-[#E6E7E7] focus:ring-[#6fafb8] focus:ring-[1.5px] focus:outline-none mx-4 h-12 max-[476px]:w-[15rem] w-[20.9375rem] placeholder-gray-300',
                      placeholder: 'Search for a country/region',
                    }),
                    div({ class: 'country-results hidden w-full max-h-[150px] xl:max-h-[210px] 2xl:max-h-[270px] overflow-y-auto' }),
                  ),
                ),
              ),
            ),
            div(
              { class: 'lang-dd text-xs tracking-[.0125rem] font-semibold relative inline-block cursor-pointer whitespace-nowrap' },
              input({ class: 'hidden peer lang-checkbox', type: 'checkbox' }),
              div(
                {
                  class: 'lang-label border border-black border-opacity-50 rounded-[28px] inline-flex flex-row items-center w-fit-content gap-3 py-2.5 pl-6 pr-4 bg-[#E2E2E2] opacity-30 cursor-not-allowed',
                  onclick() { document.querySelector('.lang-checkbox')?.click(); },
                },
                'Language',
                span({ class: 'icon icon-chevron-down' }),
              ),
              ul({ class: 'hidden peer-checked:block lang-name-ul absolute top-full left-5 mt-1.5 text-xs pb-1 font-semibold bg-white pb-4 pt-3 rounded-xl drop-shadow-2xl shadow-elevation-5 hover:ring-[#6fafb8] hover:ring-[1.5px]' }),
            ),
          ),
        ),
      ),
    );
    modalContent.addEventListener('click', (event) => {
      if (!modalContent.querySelector('.country-btn').contains(event.target) && !modalContent.querySelector('.country-container').contains(event.target) && modalContent.querySelector('.country-checkbox')?.checked) {
        modalContent.querySelector('.country-checkbox').click();
      }
      if (!modalContent.querySelector('.lang-dd').contains(event.target) && !modalContent.querySelector('.lang-name-ul')?.contains(event.target) && modalContent.querySelector('.lang-checkbox')?.checked) {
        document.querySelector('.lang-checkbox')?.click();
      }
    });
  }
  else if (selectedDownload === 'coc') {
    modalContent = div(
      { class: 'modal-content max-[476px]:h-full h-max w-max rounded pt-2 bottom-0 relative flex flex-col bg-white' },
      div({class:'flex flex-row justify-between pl-6 pr-5 pt-5'},
        h3({class:'align-center'},'COC'),
        button(
          {
            class: 'rounded-2xl my-0',
            onclick() { block.querySelector('.modal-container')?.remove(); },
          },
          span({ class: 'icon icon-cross-black' }),
        ),
      ),
      div({class: 'flex flex-row grow items-center'},
        div({class: 'mx-6 mb-4'},
          label({class:''},'Enter your lot number'),
          form({class:'flex items-center mb-4 gap-4'},
            div({class: 'flex flex-col w-full gap-1 text-sm mt-4 !w-72'},
              div({class:'relative'},
                input({class:'text-base tracking-[.03125rem] my-1 py-3 pl-5 !w-full rounded bg-[#F2F3F3] hover:bg-[#E6E7E7] focus:ring-[#6fafb8] focus:ring-[1.5px] focus:outline-none align-middle'})
              )
            )
          )
        ),
        div({class:'pb-1 pr-6 h-fit mt-6'},
          button({class:'rounded-[28px] text-sm py-2.5 px-6 h-10 rounded-full text-xs font-semibold text-white bg-[#378189] hover:bg-[#2a5f65]'},
            span({class:'px-1.5 font-semibold'},'Submit')
          )
        )
      ),
      div({class:'no-response hidden min-w-full max-w-sm p-3 pt-0wrap ml-6'},
        span({class: 'break-words'},`We don't recognize this lot number. If you need help contact `,
          a({class:'underline text-[#378189]', href:'mailto:technical@abcam.com'},'technical@abcam.com')
        )
      )
    );
  }
  modalContainer.appendChild(modalContent);
  decorateIcons(modalContainer, 20, 20);
  block.append(modalContainer);
}
export default async function decorate(block) {
  const buttonsList = ['Datasheet', 'Safety Datasheet', 'COC'];
  const downloadButtons = div({ class: 'flex flex-row flex-wrap mb-11 gap-4' });
  buttonsList.forEach((item) => {
    const btn = button(
      {
        class: 'flex flex-col justify-between w-32 h-32 p-2 text-[#2a3c3c] text-xs font-semibold border rounded-4px border-grey-0 hover:no-underline',
        onClick() {
          const selectedDownload = item.trim().toLowerCase();
          downloadPDF(block, selectedDownload);
        },
      },
      div(
        { class: 'pt-0 mb-2' },
        span({ class: 'icon icon-download' }),
      ),
      div(span({ class: 'pt-0' }, item)),
    );
    decorateIcons(btn);
    downloadButtons.appendChild(btn);

    // const button = document.createElement('button');
    // button.classList.add(...'flex flex-col justify-between w-32
    // h-32 p-2 text-[#2a3c3c] text-xs font-semibold border rounded-4px border-grey-0
    // hover:no-underline'.split(' '));
    // button.appendChild(div({ class: 'pt-0 mb-2' }, span({ class: 'icon icon-download' })));
    // button.appendChild(span({ class: 'pt-0' }, item));
    // decorateIcons(button);
    // downloadButtons.appendChild(button);
  });

  const downloadEl = div(
    { class: 'pt-0 mt-0' },
    hr({ class: 'h-px my-6 bg-interactive-grey-active mb-10' }),
    h2({ class: 'mt-6 mb-4 text-2xl font-semibold text-[#2a3c3c]' }, 'Downloads'),
    downloadButtons,
  );
  block.append(downloadEl);
}
