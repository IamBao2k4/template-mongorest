export const WASUSERJOINEDGROUPOFCOMMENT_ENTITYLIKE = {
  _id: "6788d4ba39f8979659cafbd2",
  title: "was-user-joined-group-of-comment (entity-like)",
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
      "like_info": { "$ne": [] }
    }
  },
  {
    "$lookup": {
      "from": "mge-group-member",
      "localField": "social_group",
      "foreignField": "social_group",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id",
            "status":"joined"
          }
        }
      ],
      "as": "memberStatus"
    }
  },
  {
    "$match": {
      "memberStatus": { "$ne": [] }
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

export type WasuserjoinedgroupofcommentEntitylikeConfig = typeof WASUSERJOINEDGROUPOFCOMMENT_ENTITYLIKE;