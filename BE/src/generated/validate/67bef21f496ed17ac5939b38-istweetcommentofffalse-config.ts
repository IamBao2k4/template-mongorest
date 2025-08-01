export const ISTWEETCOMMENTOFFFALSE = {
  _id: "67bef21f496ed17ac5939b38",
  title: "is-tweet-comment-off-false",
  entity: [
  "67b6a286606da18e6c1976f1"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
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
            "idAsString": { "$toString": "$_id" }
        }
    },
    {
        "$match": {
          "$or":[
            {"idAsString": "@param:tweet_id"},
            {"idAsString": "@param:entity_id"}
            ],
            "comment_off":false
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

export type IstweetcommentofffalseConfig = typeof ISTWEETCOMMENTOFFFALSE;