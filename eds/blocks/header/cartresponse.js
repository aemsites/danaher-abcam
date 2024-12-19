export default async function cartResponse() {
    return {
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
    }
}