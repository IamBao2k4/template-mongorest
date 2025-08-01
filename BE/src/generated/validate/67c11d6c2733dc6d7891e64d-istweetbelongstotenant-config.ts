export const ISTWEETBELONGSTOTENANT = {
  _id: "67c11d6c2733dc6d7891e64d",
  title: "is-tweet-belongs-to-tenant",
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
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "id": "@body:tweet",
      "tenant_id": "@header:x-tenant-id"
    }
  }
]`,
  documents: [],
  body: [
  {
    "value": "tweet",
    "key": "tweet"
  }
],
  categories: [],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  params: null,
} as const;

export type IstweetbelongstotenantConfig = typeof ISTWEETBELONGSTOTENANT;