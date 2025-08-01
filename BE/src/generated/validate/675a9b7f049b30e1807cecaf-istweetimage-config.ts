export const ISTWEETIMAGE = {
  _id: "675a9b7f049b30e1807cecaf",
  title: "is-tweet-image",
  note: "Check type của tweet",
  entity: [
  "674e89c2033700ce36e9f038"
],
  data: {
  "id": "a8217805-fec4-463f-a8be-b31b3e1126a1",
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

export type IstweetimageConfig = typeof ISTWEETIMAGE;