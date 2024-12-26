function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}
const lastSelectedCountry = getCookie('NEXT_COUNTRY');

export function basicDetails() {
  return {
    shoppingBaskedId: localStorage.getItem('shoppingBasketId')?.replace(/"/g, ''),
    lastSelectedCountry,
    selectedCountry: (lastSelectedCountry !== null) ? lastSelectedCountry : 'US',
    host: window.location.host === 'www.abcam.com' ? 'proxy-gateway.abcam.com' : 'proxy-gateway-preprod.abcam.com',
  };
}
function getApiResponse(url, methodType) {
  const headers = {
    'x-abcam-app-id': 'b2c-public-website',
    'Content-Type': 'application/json',
  };
  fetch(url, {
    method: methodType,
    headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      //  eslint-disable-next-line no-console
      console.error('There was an error making the API call:', error);
    });
}

export function getCartType() {
  // const url = `https://${basicDetails().host}/ecommerce/rest/v1/market-info?country=${basicDetails().selectedCountry.toUpperCase()}`;
  // const jsonRes = JSON.parse(getApiResponse(url,'GET'));

  const jsonRes = { isDistributor: false, marketType: 'Direct', purchaseType: 'checkout' }; // us
  // const jsonRes = {"isDistributor":false,"marketType":"Distributor","purchaseType":"distributor"}
  const { marketType } = jsonRes;
  return marketType;
}

export function deleteLineItem(lineItem) {
  // const url = `https://proxy-gateway.abcam.com/ecommerce/rest/v1/basket/${basicDetails().shoppingBaskedId}/line/${lineItem}?country=${basicDetails.lastSelectedCountry.toUpperCase()}`;
  // const url = `https://${host}/ecommerce/rest/v1/basket/${shoppingBaskedId}?country=${selectedCountry.toUpperCase()}`;
  // const cartItemsRes = JSON.parse(getApiResponse(url, 'DELETE'));
}

export function quickAddLineItems(lineItems) {
  const url = `https://proxy-gateway.abcam.com/ecommerce/rest/v1/basket/${basicDetails().shoppingBaskedId}?country=${basicDetails().lastSelectedCountry}`;
}
export function getCartItems() {
  // const url = `https://${host}/ecommerce/rest/v1/basket/${shoppingBaskedId}?country=${selectedCountry.toUpperCase()}`;
  // const cartItemsRes = JSON.parse(getApiResponse(url, 'GET'));

  const cartItemsRes = {
    id: '5ce2cd5c-0950-4bdf-a8fc-47eb602e37eb',
    items: [
      {
        lineNumber: 1,
        assetDefinitionNumber: 'AB181421',
        assetNumber: 'AB181421-1001',
        publicAssetCode: 'ab181421-1x96Tests',
        lineDescription: 'Human TNF alpha ELISA Kit',
        quantity: 1,
        status: [],
        size: {
          value: '1 x 96',
          unit: 'Tests',
        },
        largeQuantityLine: false,
        availableQuantity: 53,
        prices: {
          adjustments: [],
          base: {
            value: 765,
            currency: 'USD',
          },
          lineTotalWithDiscount: {
            value: 765,
            currency: 'USD',
          },
          lineTotalWithoutDiscount: {
            currency: 'USD',
            value: 765,
          },
          lineTotalWithDiscountAndPromotions: {
            value: 765,
            currency: 'USD',
          },
          subtotal: {
            value: 765,
            currency: 'USD',
          },
          unitPriceWithDiscount: {
            value: 765,
            currency: 'USD',
          },
          unitPriceWithoutDiscount: {
            currency: 'USD',
            value: 765,
          },
          tax: {
            includedInPrice: false,
            rate: '%',
            price: {
              currency: 'USD',
            },
          },
        },
        carrierDetails: {
          courier: 'FEDEX',
          primaryWarehouse: 'INV_102_FG_Boston',
          freightItem: 'FRT-30193',
          shippingCarrier: 'FEDEX-MOTUWETHFR-STANDARD',
          modeOfTransport: 'ANY',
          shipFromCountry: 'US',
          stockNotes: [
            {
              stockNotesType: null,
              stockNotesCode: null,
            },
          ],
          serviceLevel: 'PRIORITY_OVERNIGHT',
          shipmentType: 'STANDARD',
        },
        dates: {
          scheduledShipDate: '2024-12-23T22:30:00.000Z',
          promisedShipDate: '2024-12-23T22:30:00.000Z',
          cutoffTimeForOrdering: '2024-12-23T22:30:00.000Z',
          requestedShipDate: '2024-12-23T22:30:00.000Z',
          scheduledArrivalDate: '2024-12-24T12:00:00.000Z',
          promisedArrivalDate: '2024-12-24T12:00:00.000Z',
        },
      },
      {
        lineNumber: 2,
        assetDefinitionNumber: 'AB120297',
        assetNumber: 'AB120297-1001',
        publicAssetCode: 'ab120297-1mg',
        lineDescription: 'Phorbol 12-myristate 13-acetate (PMA), PKC activator',
        quantity: 1,
        status: [],
        size: {
          value: '1',
          unit: 'mg',
        },
        largeQuantityLine: false,
        availableQuantity: 29,
        prices: {
          adjustments: [],
          base: {
            value: 90,
            currency: 'USD',
          },
          lineTotalWithDiscount: {
            value: 90,
            currency: 'USD',
          },
          lineTotalWithoutDiscount: {
            currency: 'USD',
            value: 90,
          },
          lineTotalWithDiscountAndPromotions: {
            value: 90,
            currency: 'USD',
          },
          subtotal: {
            value: 90,
            currency: 'USD',
          },
          unitPriceWithDiscount: {
            value: 90,
            currency: 'USD',
          },
          unitPriceWithoutDiscount: {
            currency: 'USD',
            value: 90,
          },
          tax: {
            includedInPrice: false,
            rate: '%',
            price: {
              currency: 'USD',
            },
          },
        },
        carrierDetails: {
          courier: 'FEDEX',
          primaryWarehouse: 'INV_102_FG_Boston',
          freightItem: 'FRT-30193',
          shippingCarrier: 'FEDEX-MOTUWETHFR-STANDARD',
          modeOfTransport: 'ANY',
          shipFromCountry: 'US',
          stockNotes: [
            {
              stockNotesType: null,
              stockNotesCode: null,
            },
          ],
          serviceLevel: 'PRIORITY_OVERNIGHT',
          shipmentType: 'STANDARD',
        },
        dates: {
          scheduledShipDate: '2024-12-23T22:30:00.000Z',
          promisedShipDate: '2024-12-23T22:30:00.000Z',
          cutoffTimeForOrdering: '2024-12-23T22:30:00.000Z',
          requestedShipDate: '2024-12-23T22:30:00.000Z',
          scheduledArrivalDate: '2024-12-24T12:00:00.000Z',
          promisedArrivalDate: '2024-12-24T12:00:00.000Z',
        },
      },
      {
        lineNumber: 3,
        assetDefinitionNumber: 'AB120297',
        assetNumber: 'AB120297-1004',
        publicAssetCode: 'ab120297-5mg',
        lineDescription: 'Phorbol 12-myristate 13-acetate (PMA), PKC activator',
        quantity: 1,
        status: [],
        size: {
          value: '5',
          unit: 'mg',
        },
        largeQuantityLine: false,
        availableQuantity: 14,
        prices: {
          adjustments: [],
          base: {
            value: 240,
            currency: 'USD',
          },
          lineTotalWithDiscount: {
            value: 240,
            currency: 'USD',
          },
          lineTotalWithoutDiscount: {
            currency: 'USD',
            value: 240,
          },
          lineTotalWithDiscountAndPromotions: {
            value: 240,
            currency: 'USD',
          },
          subtotal: {
            value: 240,
            currency: 'USD',
          },
          unitPriceWithDiscount: {
            value: 240,
            currency: 'USD',
          },
          unitPriceWithoutDiscount: {
            currency: 'USD',
            value: 240,
          },
          tax: {
            includedInPrice: false,
            rate: '%',
            price: {
              currency: 'USD',
            },
          },
        },
        carrierDetails: {
          courier: 'FEDEX',
          primaryWarehouse: 'INV_102_FG_Boston',
          freightItem: 'FRT-30193',
          shippingCarrier: 'FEDEX-MOTUWETHFR-STANDARD',
          modeOfTransport: 'ANY',
          shipFromCountry: 'US',
          stockNotes: [
            {
              stockNotesType: null,
              stockNotesCode: null,
            },
          ],
          serviceLevel: 'PRIORITY_OVERNIGHT',
          shipmentType: 'STANDARD',
        },
        dates: {
          scheduledShipDate: '2024-12-31T04:59:59.000Z',
          promisedShipDate: '2024-12-31T04:59:59.000Z',
          cutoffTimeForOrdering: '2024-12-23T19:00:00.000Z',
          requestedShipDate: '2024-12-31T04:59:59.000Z',
          scheduledArrivalDate: '2025-01-01T04:59:59.000Z',
          promisedArrivalDate: '2025-01-01T04:59:59.000Z',
        },
      },
      {
        lineNumber: 4,
        assetDefinitionNumber: 'AB120297',
        assetNumber: 'AB120297-1002',
        publicAssetCode: 'ab120297-25mg',
        lineDescription: 'Phorbol 12-myristate 13-acetate (PMA), PKC activator',
        quantity: 1,
        status: [],
        size: {
          value: '25',
          unit: 'mg',
        },
        largeQuantityLine: false,
        availableQuantity: 0,
        prices: {
          adjustments: [],
          base: {
            value: 945,
            currency: 'USD',
          },
          lineTotalWithDiscount: {
            value: 945,
            currency: 'USD',
          },
          lineTotalWithoutDiscount: {
            currency: 'USD',
            value: 945,
          },
          lineTotalWithDiscountAndPromotions: {
            value: 945,
            currency: 'USD',
          },
          subtotal: {
            value: 945,
            currency: 'USD',
          },
          unitPriceWithDiscount: {
            value: 945,
            currency: 'USD',
          },
          unitPriceWithoutDiscount: {
            currency: 'USD',
            value: 945,
          },
          tax: {
            includedInPrice: false,
            rate: '%',
            price: {
              currency: 'USD',
            },
          },
        },
        carrierDetails: {
          courier: 'FEDEX',
          primaryWarehouse: 'INV_102_FG_Boston',
          freightItem: 'FRT-30193',
          shippingCarrier: 'FEDEX-MOTUWETHFR-STANDARD',
          modeOfTransport: 'ANY',
          shipFromCountry: 'US',
          stockNotes: [
            {
              stockNotesType: null,
              stockNotesCode: null,
            },
          ],
          serviceLevel: 'PRIORITY_OVERNIGHT',
          shipmentType: 'STANDARD',
        },
        dates: {
          scheduledShipDate: '2025-01-14T04:59:59.000Z',
          promisedShipDate: '2025-01-14T04:59:59.000Z',
          cutoffTimeForOrdering: '2024-12-23T19:00:00.000Z',
          requestedShipDate: '2025-01-14T04:59:59.000Z',
          scheduledArrivalDate: '2025-01-15T04:59:59.000Z',
          promisedArrivalDate: '2025-01-15T04:59:59.000Z',
        },
      },
    ],
    summary: {
      appliedDiscounts: {
        value: 0,
        currency: 'USD',
      },
      subtotal: {
        value: 2040,
        currency: 'USD',
      },
      shippingAndHandling: {
        value: 55,
        currency: 'USD',
      },
      taxes: [],
      total: {
        value: 2095,
        currency: 'USD',
      },
    },
    groups: [
      {
        id: '2024-12-24',
        subgroups: [
          {
            id: 'FEDEX-STANDARD-INV_102_FG_Boston',
            lineNumbers: [
              1,
              2,
            ],
          },
        ],
      },
      {
        id: '2025-01-01',
        subgroups: [
          {
            id: 'FEDEX-STANDARD-INV_102_FG_Boston',
            lineNumbers: [
              3,
            ],
          },
        ],
      },
      {
        id: '2025-01-15',
        subgroups: [
          {
            id: 'FEDEX-STANDARD-INV_102_FG_Boston',
            lineNumbers: [
              4,
            ],
          },
        ],
      },
    ],
    promotions: {
      basketLevel: [],
      shippingCharge: [],
    },
    isRefreshed: false,
  };
  /* const cartItemsRes = {
    "id": "5ce2cd5c-0950-4bdf-a8fc-47eb602e37eb",
    "items": [
        {
            "lineNumber": 1,
            "assetDefinitionNumber": "AB181421",
            "assetNumber": "AB181421-1001",
            "publicAssetCode": "ab181421-1x96Tests",
            "lineDescription": "Human TNF alpha ELISA Kit",
            "quantity": 2,
            "status": [],
            "size": {
                "value": "1 x 96",
                "unit": "Tests"
            },
            "largeQuantityLine": false
        },
        {
            "lineNumber": 2,
            "assetDefinitionNumber": "AB120297",
            "assetNumber": "AB120297-1004",
            "publicAssetCode": "ab120297-5mg",
            "lineDescription": "Phorbol 12-myristate 13-acetate (PMA), PKC activator",
            "quantity": 1,
            "status": [],
            "size": {
                "value": "5",
                "unit": "mg"
            },
            "largeQuantityLine": false
        },
        {
            "lineNumber": 3,
            "assetDefinitionNumber": "AB120129",
            "assetNumber": "AB120129-1001",
            "publicAssetCode": "ab120129-10mg",
            "lineDescription": "Y-27632 dihydrochloride, Rho kinase inhibitor",
            "quantity": 1,
            "status": [],
            "size": {
                "value": "10",
                "unit": "mg"
            },
            "largeQuantityLine": false
        },
        {
            "lineNumber": 4,
            "assetDefinitionNumber": "AB120129",
            "assetNumber": "AB120129-1003",
            "publicAssetCode": "ab120129-50mg",
            "lineDescription": "Y-27632 dihydrochloride, Rho kinase inhibitor",
            "quantity": 1,
            "status": [],
            "size": {
                "value": "50",
                "unit": "mg"
            },
            "largeQuantityLine": false
        }
    ],
    "summary": {
        "subtotal": {
            "currency": "USD"
        },
        "shippingAndHandling": {
            "value": 25,
            "currency": "USD"
        },
        "taxes": [
            {
                "includedInPrice": false,
                "group": [
                    0
                ],
                "type": "SERVICE",
                "price": {
                    "currency": "USD"
                }
            },
            {
                "includedInPrice": false,
                "group": [
                    1
                ],
                "type": "GOODS",
                "price": {
                    "currency": "USD"
                }
            }
        ],
        "total": {
            "currency": "USD"
        }
    },
    "groups": [
        {
            "id": "1901-01-01",
            "subgroups": [
                {
                    "id": "undefined-undefined-undefined",
                    "lineNumbers": [
                        1,
                        2,
                        3,
                        4
                    ]
                }
            ]
        }
    ],
    "promotions": {
        "basketLevel": [],
        "shippingCharge": []
    },
    "isRefreshed": false
} */
  return cartItemsRes;
}

// const url = `https://${host}/ecommerce/rest/v1/basket/${shoppingBaskedId}?country=${selectedCountry.toUpperCase()}`;
// fetch(url, {
//   method: 'GET',
//   headers,
// })
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     if (data.items.length > 0) {
//       cartRes = data;
//       const cartCount = document.querySelector('.cart-count');
//       cartCount?.classList.remove('hidden');
//       cartCount.innerText = cartRes.items.length;
//     } else {
//       document.querySelector('.cart-count')?.classList?.add('hidden');
//     }
//     // cartButton.addEventListener('click', () => {
//     //   window.location.href = `https://${hostName}/en-us/shopping-basket/${shoppingBaskedId}?country=${selectedCountry.toUpperCase()}`;
//     // });
//   })
//   .catch((error) => {
//   //  eslint-disable-next-line no-console
//     console.error('There was an error making the API call:', error);
//   });
