export const GET_LIST_TAG_GROUP = {
  _id: "67dd3886dac2a3cba0299e58",
  title: "get list tag group",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67dd3711dac2a3cba0299cdd"
],
  queryAdvance: `  [
  {
    "$match":{
      "tenant_id":"@header:x-tenant-id"
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
  ]
`,
  categories: [],
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListTagGroupConfig = typeof GET_LIST_TAG_GROUP;