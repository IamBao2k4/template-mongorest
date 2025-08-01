export const GET_DANH_SCH_ORDER = {
  _id: "68062751beb73c2d42c97c1f",
  title: "GET danh sách order",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6805b058f4d18535c7e63656"
],
  queryAdvance: `[
  {
    "$match": {
      "$expr": {
        "$or": [
          {
            "$eq": [
              "@param:customer_id",
              null
            ]
          },
            {
              "$in": [
                "@param:customer_id",
                "$customer"
              ]
            }
        ]
      }
    }
  },
  {
    "$facet": {
      "meta_data": [
        {
          "$count": "count"
        },
        {
          "$addFields": {
            "skip": "@param:skip",
            "limit": "@param:limit"
          }
        }
      ],
      "data": [
        {
          "$skip": "@param:skip"
        },
        {
          "$limit": "@param:limit"
        }
      ]
    }
  }
]`,
  categories: [],
  tenant_id: "6801bf1b887875ca1b8c3ee4",
  documents: [],
  body: null,
  params: [
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  },
  {
    "value": "customer_id",
    "key": "customer_id"
  },
  {
    "value": "",
    "key": ""
  }
],
  headers: [],
  restricted: [
  {
    "key": "_id",
    "value": "_id"
  },
  {
    "key": "created_by",
    "value": "created_by"
  },
  {
    "key": "updated_by",
    "value": "updated_by"
  },
  {
    "key": "created_at",
    "value": "created_at"
  },
  {
    "key": "updated_at",
    "value": "updated_at"
  }
],
  id: "",
} as const;

export type GETDanhSchOrderConfig = typeof GET_DANH_SCH_ORDER;