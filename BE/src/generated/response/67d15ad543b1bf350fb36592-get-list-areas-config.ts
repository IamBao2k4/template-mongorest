export const GET_LIST_AREAS = {
  _id: "67d15ad543b1bf350fb36592",
  title: "get list areas",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67cfbbfddada26e67e87f029"
],
  queryAdvance: `[
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
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
  documents: [],
  body: null,
  params: [],
  headers: [],
  data: {
  "id": "4de6cbf7-c452-4ff7-b92c-192a546dfff3",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type GetListAreasConfig = typeof GET_LIST_AREAS;