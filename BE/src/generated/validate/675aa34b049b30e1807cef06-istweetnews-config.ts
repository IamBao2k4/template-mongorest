export const ISTWEETNEWS = {
  _id: "675aa34b049b30e1807cef06",
  title: "is-tweet-news",
  note: "Check type của tweet",
  entity: [
  "674e8ed585bc5241dd6405d3"
],
  data: {
  "id": "a62e7ff2-1cbb-46be-bccb-9efd103066d8",
  "rules": [],
  "combinator": "or",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"$expr":true}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  advance: `[
  {
    "$addFields": {
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "_id": "@param:_id"
    }
  }
]
`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IstweetnewsConfig = typeof ISTWEETNEWS;