export const GET_DETAIL_CATEGORY_1 = {
  _id: "67ce9c9be5c4476b500f5218",
  title: "get detail category 1",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c6b37acb2d3f0de04c762e"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "_id":"@param:_id"
    }
  },
  {
    "$addFields": {
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$facet": {
      "meta_data": [
        {
          "$count":"count"
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
          "skip":"@param:skip"
        },
        {
          "limit":"@param:limit"
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

export type GetDetailCategory1Config = typeof GET_DETAIL_CATEGORY_1;