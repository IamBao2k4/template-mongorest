export const ISTWEETHASLIKEOFFISFALSE = {
  _id: "6773c0d9ab2649a80d75bd79",
  title: "is-tweet-has-like-off-is-false",
  entity: [
  "67b6a286606da18e6c1976f1"
],
  data: {
  "id": "107fb167-0e2d-476a-8e5c-c299815f000b",
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
        "$match": {
            "tenant_id": "@header:x-tenant-id"
        }
    },
  {
    "$addFields": {
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "$or": [
        {"_id": "@param:tweet_id"},
        {"_id": "@param:entity_id"}
        ]
      ,
      "like_off": false
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
  },
  {
    "value": "entity_id",
    "key": "entity_id"
  }
],
} as const;

export type IstweethaslikeoffisfalseConfig = typeof ISTWEETHASLIKEOFFISFALSE;