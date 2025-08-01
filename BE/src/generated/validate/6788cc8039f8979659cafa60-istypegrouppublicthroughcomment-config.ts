export const ISTYPEGROUPPUBLICTHROUGHCOMMENT = {
  _id: "6788cc8039f8979659cafa60",
  title: "is-type-group-public-through-comment",
  note: "Sử dụng cho entity like",
  entity: [
  "6764e3926e57acaf6815ab97"
],
  data: {
  "id": "7167e791-5394-4705-87fd-b5d26a456332",
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
    "$addFields": {
      "social_group": {
        "$map": {
          "input": "$social_group",
          "as": "u",
          "in": {
            "$toObjectId": "$$u"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-group",
      "localField": "social_group",
      "foreignField": "_id",
      "pipeline": [
        {
          "$match": {
            "type": "public"
          }
        }
      ],
      "as": "group_info"
    }
  },
  {
    "$match": {
      "group_info": { "$ne": [] }
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

export type IstypegrouppublicthroughcommentConfig = typeof ISTYPEGROUPPUBLICTHROUGHCOMMENT;