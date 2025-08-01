export const ISUSERBEOWNERORMANAGERTHROUGHCOMMENT = {
  _id: "678479b12669d501febe3619",
  title: "is-user-be-owner-or-manager-through-comment",
  entity: [
  "6764e4046e57acaf6815ab9f"
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
      "_id":"@param:_id"
    }
  },
  {
    "$addFields": {
      "document_id": {
        "$toObjectId": "$document_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-tweet-comment",
      "localField": "document_id",
      "foreignField": "_id",
      "as": "comment_info"
    }
  },
  {
    "$lookup": {
      "from": "mge-group-member",
      "localField": "comment_info.social_group",
      "foreignField": "social_group",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id",
            "$or": [
              { "role": "owner" },
              { "role": "manager" }
            ]
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
  params: null,
} as const;

export type IsuserbeownerormanagerthroughcommentConfig = typeof ISUSERBEOWNERORMANAGERTHROUGHCOMMENT;