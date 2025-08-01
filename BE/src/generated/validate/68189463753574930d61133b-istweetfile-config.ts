export const ISTWEETFILE = {
  _id: "68189463753574930d61133b",
  title: "is-tweet-file",
  entity: [
  "68188ea9753574930d6110a1"
],
  data: {
  "id": "70b414a2-0872-4454-aefd-ed0ade00536a",
  "rules": [],
  "combinator": "and",
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
    "$match":{
      "_id":"@param:_id"
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IstweetfileConfig = typeof ISTWEETFILE;