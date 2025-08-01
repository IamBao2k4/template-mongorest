export const ISTWEETACTIVE = {
  _id: "675c0174a6c844dbf47f50c9",
  title: "is-tweet-active",
  note: "dang xai cho api tweet saved",
  entity: [
  "67b6a286606da18e6c1976f1"
],
  data: {
  "id": "929b96f5-c238-4c5a-9969-94adb6e54077",
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
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "status":"active",
      "$or": [
        {"id": "@param:tweet_id"},
        {"id": "@body:tweet_id"}
        ]
    }
  }
]`,
  documents: [],
  body: [
  {
    "value": "tweet_id",
    "key": "tweet_id"
  }
],
  categories: [],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  params: [
  {
    "value": "tweet_id",
    "key": "tweet_id"
  }
],
} as const;

export type IstweetactiveConfig = typeof ISTWEETACTIVE;