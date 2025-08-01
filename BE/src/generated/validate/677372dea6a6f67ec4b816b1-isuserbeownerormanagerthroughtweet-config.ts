export const ISUSERBEOWNERORMANAGERTHROUGHTWEET = {
  _id: "677372dea6a6f67ec4b816b1",
  title: "is-user-be-owner-or-manager-through-tweet",
  entity: [
  "6747ef07c47463d88f8c5ab1"
],
  data: {
  "id": "78f1ce85-e21d-4475-a5b7-b3f5c5851e1f",
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
    "$match": {
      "_id": { "$exists": false }
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-image",
      "pipeline": [
        {
          "$addFields": {
            "type": "images"
          }
        }
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-videos",
      "pipeline": [
        {
          "$addFields": {
            "type": "videos"
          }
        }
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-news",
      "pipeline": [
        {
          "$addFields": {
            "type": "news"
          }
        }
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-votes",
      "pipeline": [
        {
          "$addFields": {
            "type": "votes"
          }
        }
      ]
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
    "$match": {
      "_id": "@param:_id",
      "status": "active"
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

export type IsuserbeownerormanagerthroughtweetConfig = typeof ISUSERBEOWNERORMANAGERTHROUGHTWEET;