export const GET_DETAIL_SOCIAL_TAG = {
  _id: "677cc8394c897525eca25340",
  title: "get detail social tag",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67590fed9b0285b4f6be778d"
],
  queryAdvance: `[
    {
    "$addFields": {
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "_id": "@param:_id",
      "tenant_id":"@header:x-tenant-id"
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
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "_id",
    "key": "_id"
  },
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetDetailSocialTagConfig = typeof GET_DETAIL_SOCIAL_TAG;