export const ISCOMMENTMINE_ENTITYLIKE = {
  _id: "6788db6239f8979659cafc94",
  title: "is-comment-mine (entity-like)",
  entity: [
  "6764e3926e57acaf6815ab97"
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
    "$lookup": {
      "from": "mge-entity-like",
      "localField": "_id",
      "foreignField": "entity_id",
      "pipeline": [
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
      ],
      "as": "like_info"
    }
  },
  {
    "$match": {
      "like_info": { "$ne": [] },
      "created_by":"@jwt:user.id"
    }
  }
  ]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "_id",
    "key": "_id"
  }
],
} as const;

export type IscommentmineEntitylikeConfig = typeof ISCOMMENTMINE_ENTITYLIKE;