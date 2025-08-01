export const ISTWEETACTIVE = {
  _id: "67cdc4a0c4550fe33c2a6780",
  title: "is-tweet-active",
  entity: [
  "67c66d92cb2d3f0de04bccc1"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
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