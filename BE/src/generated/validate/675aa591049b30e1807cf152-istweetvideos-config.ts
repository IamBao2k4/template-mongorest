export const ISTWEETVIDEOS = {
  _id: "675aa591049b30e1807cf152",
  title: "is-tweet-videos",
  note: "Check type of tweet",
  entity: [
  "674e8ef485bc5241dd6405dd"
],
  data: {
  "id": "4f8b270c-a0a2-4a0b-932c-0d23c28f5918",
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

export type IstweetvideosConfig = typeof ISTWEETVIDEOS;