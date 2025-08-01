export const WASUSERJOINEDGROUPOFCOMMENT = {
  _id: "677577c53c56caf3d6e34ea6",
  title: "was-user-joined-group-of-comment",
  entity: [
  "6764e3926e57acaf6815ab97"
],
  data: {
  "id": "29ca1b23-b8fd-440b-8d7d-cfa55bcf415e",
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
    "$match": {
      "$or": [
        {"_id": "@param:_id"},
        {"_id": "@param:comment_id"}
        ]
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
  },
  {
    "value": "comment_id",
    "key": "comment_id"
  }
],
} as const;

export type WasuserjoinedgroupofcommentConfig = typeof WASUSERJOINEDGROUPOFCOMMENT;