export const GET_DANH_SCH_PAYMENT_METHOD = {
  _id: "6805c374484b959b5ecda58f",
  title: "GET danh sách payment method",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6805ba9df4d18535c7e63b1d"
],
  queryAdvance: `[
  {
    "$match": {
      "social_group": "@param:group_id",
      "tenant_id": "@header:x-tenant-id",
      "$expr": {
        "$cond": [
          {
            "$ne": [
              "@param:status",
              null
            ]
          },
          {
            "$in": [
              "@param:status",
              "$status"
            ]
          },
          true
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
    "value": "group_id",
    "key": "group_id"
  },
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  },
  {
    "value": "active",
    "key": "active"
  },
  {
    "value": "status",
    "key": "status"
  },
  {
    "value": "",
    "key": ""
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  data: {
  "id": "47939a9f-151f-4b29-80b3-2124a95f6333",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [
  {
    "key": "title",
    "value": "title",
    "description": ""
  },
  {
    "key": "code",
    "value": "code",
    "description": ""
  },
  {
    "key": "description",
    "value": "description",
    "description": ""
  },
  {
    "key": "status",
    "value": "status",
    "description": "",
    "relation": "string"
  },
  {
    "key": "_id",
    "value": "_id",
    "description": ""
  },
  {
    "key": "created_by",
    "value": "created_by",
    "description": ""
  },
  {
    "key": "updated_by",
    "value": "updated_by",
    "description": ""
  },
  {
    "key": "created_at",
    "value": "created_at",
    "description": ""
  },
  {
    "key": "updated_at",
    "value": "updated_at",
    "description": ""
  }
],
  id: "",
} as const;

export type GETDanhSchPaymentMethodConfig = typeof GET_DANH_SCH_PAYMENT_METHOD;