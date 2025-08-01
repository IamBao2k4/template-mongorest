export const GET_LIST_ENTITY = {
  _id: "67c6da5cd8a51860fc2f716c",
  title: "get list entity",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674eaf8ac43906b58198de5e"
],
  queryAdvance: `  [{
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
  }]
`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListEntityConfig = typeof GET_LIST_ENTITY;