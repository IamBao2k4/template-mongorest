export const GET_LIST_CATEGORY_1 = {
  _id: "67ce9a69e5c4476b500f4ad2",
  title: "get list category 1",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c6b37acb2d3f0de04c762e"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
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
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListCategory1Config = typeof GET_LIST_CATEGORY_1;