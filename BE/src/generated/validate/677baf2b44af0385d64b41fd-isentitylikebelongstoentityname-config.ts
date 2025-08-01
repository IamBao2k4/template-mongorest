export const ISENTITYLIKEBELONGSTOENTITYNAME = {
  _id: "677baf2b44af0385d64b41fd",
  title: "is-entity-like-belongs-to-entity-name",
  entity: [
  "676a2762dedfcf1bf1c55abf"
],
  data: {
  "id": "2c63c86c-1ca1-43cc-9226-f1e06a295884",
  "rules": [
    {
      "id": "146efe81-9238-41d9-8ff0-a4c7ea4f85ad",
      "field": "mge-entity-like._id",
      "operator": "=",
      "valueSource": "value",
      "value": ""
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"mge-entity-like._id":""}`,
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
    "$match":{
      "_id":"@param:tweet_id",
      "collection_name":"@body:entity_name"
    }
  }
      ]`,
  documents: [],
  body: [
  {
    "value": "entity_name",
    "key": "entity_name"
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

export type IsentitylikebelongstoentitynameConfig = typeof ISENTITYLIKEBELONGSTOENTITYNAME;