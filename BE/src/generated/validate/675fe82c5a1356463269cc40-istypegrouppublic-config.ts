export const ISTYPEGROUPPUBLIC = {
  _id: "675fe82c5a1356463269cc40",
  title: "is-type-group-public",
  note: "Check type group thông qua slug và id của tweet",
  entity: [
  "67b6a286606da18e6c1976f1"
],
  data: {
  "id": "ae06d686-7f73-4748-9fd1-43589a9db332",
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
      "id": { "$toString": "$_id" }
    }
  },
  {
    "$match": {
      "$or": [
        { "id": "@param:tweet_id" },
        { "slug": "@param:slug" },
        { "id": "@param:_id" },
        { "id": "@body:tweet_id" }
      ],
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$unwind": {
      "path": "$social_group"
    }
  },
  {
    "$addFields": {
      "groupId_Object": {
        "$toObjectId": "$social_group"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-group",
      "localField": "groupId_Object",
      "foreignField": "_id",
      "as": "social_group"
    }
  },
  {
    "$match": {
      "social_group.type": "public",
      "social_group.status": "active"
    }
  }
]
`,
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
  },
  {
    "value": "slug",
    "key": "slug"
  },
  {
    "value": "_id",
    "key": "_id"
  }
],
} as const;

export type IstypegrouppublicConfig = typeof ISTYPEGROUPPUBLIC;