export const ISTWEETNOTMINE = {
  _id: "677572bc3c56caf3d6e34e85",
  title: "is-tweet-not-mine",
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
    "$addFields": {
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "status": "active",
      "_id": "@param:tweet_id",
      "created_by": {
        "$ne": "@jwt:user.id"
      }
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

export type IstweetnotmineConfig = typeof ISTWEETNOTMINE;