export const ISTWEETVOTES = {
  _id: "675aa539049b30e1807cf103",
  title: "is-tweet-votes",
  note: "Check type của tweet",
  entity: [
  "674e8f8885bc5241dd6405fb"
],
  data: {
  "id": "aed58176-b81d-4af3-a1e3-f1b2579dedfe",
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

export type IstweetvotesConfig = typeof ISTWEETVOTES;