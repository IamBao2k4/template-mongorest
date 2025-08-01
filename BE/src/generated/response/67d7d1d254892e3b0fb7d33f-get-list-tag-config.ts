export const GET_LIST_TAG = {
  _id: "67d7d1d254892e3b0fb7d33f",
  title: "get list tag",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67d2617ab6962f9420f4035a"
],
  queryAdvance: `[
  {
    "$match": {
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
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
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
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListTagConfig = typeof GET_LIST_TAG;