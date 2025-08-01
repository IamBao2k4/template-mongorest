export const ISUSERHASPERMISSIONTOAPPROVETWEET = {
  _id: "67725d57e240a7d43f0efa23",
  title: "is-user-has-permission-to-approve-tweet",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "ebd4920f-e2c4-4090-bc14-caab1941160a",
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
      "social_group_object_id": {
        "$map": {
          "input": "$social_group",
          "as": "sg",
          "in": {
            "$toObjectId": "$$sg"
          }
        }
      }
    }
  },
  {
    "$match": {
      "user": "@jwt:user.id",
      "social_group": "@param:group_id"
    }
  },
  {
    "$lookup": {
      "from": "mge-group",
      "localField": "social_group_object_id",
      "foreignField": "_id",
      "as": "group_info"
    }
  },
  {
    "$addFields": {
      "group_info": {
        "$arrayElemAt": [
          "$group_info",
          0
        ]
      }
    }
  },
  {
    "$addFields": {
      "can_approve_tweet": {
        "$gt": [
          {
            "$size": {
              "$setIntersection": [
                "$role",
                "$group_info.permissions.tweet_approve"
              ]
            }
          },
          0
        ]
      }
    }
  },
  {
    "$match": {
      "can_approve_tweet": true
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "group_id",
    "key": "group_id"
  }
],
} as const;

export type IsuserhaspermissiontoapprovetweetConfig = typeof ISUSERHASPERMISSIONTOAPPROVETWEET;