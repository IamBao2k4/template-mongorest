export const GET_DETAIL_CATEGORY = {
  _id: "67d29154b6962f9420f434e2",
  title: "get detail category",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529b1465017d942f7592b5"
],
  queryAdvance: `[
             {
                "$addFields": {
                  "id": {
                    "$toString": "$_id"
                  }
                }
              },
  {
    "$match": {
      "tenant_id":"@header:x-tenant-id",
      "$or":[
        {
          "id":"@param:_id"
        },
        {
          "slug":"@param:slug"
        }
        ]
    }
  },
  {
    "$facet": {
      "meta_data": [
        { "$count": "count" },
        {
          "$addFields": {
            "skip": "@param:skip",
            "limit": "@param:limit"
          }
        }
      ],
      "data": [
        { "$skip": "@param:skip" },
        { "$limit": "@param:limit" }
      ]
    }
  }
]`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetDetailCategoryConfig = typeof GET_DETAIL_CATEGORY;