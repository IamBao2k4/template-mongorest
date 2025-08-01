export const GET_LIST_TENANT_PUBLICS = {
  _id: "67c08a860bb62abd56e896c7",
  title: "get list tenant publics",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6740251baefaffc3e4662e6b"
],
  queryAdvance: `[
  {
    "$match": {
      "type":"public"
    }
  },
  {
    "$project": {
      "title":1
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
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListTenantPublicsConfig = typeof GET_LIST_TENANT_PUBLICS;