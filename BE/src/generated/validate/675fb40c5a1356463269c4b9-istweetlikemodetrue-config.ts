export const ISTWEETLIKEMODETRUE = {
  _id: "675fb40c5a1356463269c4b9",
  title: "is-tweet-like-mode-true",
  entity: [
  "67b6a286606da18e6c1976f1"
],
  data: {
  "id": "722d1c53-a036-469e-8d31-579287da728f",
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
            "idAsString": { "$toString": "$_id" }
        }
    },
    {
        "$match": {
            "idAsString": "@param:tweet_id",
            "like_off":true
        }
    }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "tweet_id",
    "key": "tweet_id"
  }
],
} as const;

export type IstweetlikemodetrueConfig = typeof ISTWEETLIKEMODETRUE;