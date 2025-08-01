export const ISUSERHASPERMISSIONDELETETWEET = {
  _id: "675bd63da598611d57bb3118",
  title: "is-user-has-permission-delete-tweet",
  note: "Xác thực user xem có quyền xóa tweet không",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "47fbee75-8aac-42b4-aab5-35fc3070257b",
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
      "user": "@jwt:user.id",
      "social_group": "@param:group_id"
    }
  },
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
      "can_delete_tweet_group": {
        "$gt": [
          {
            "$size": {
              "$setIntersection": [
                "$role",
                "$group_info.permissions.tweet_delete"
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
      "can_delete_tweet_group": true
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
    "value": "group_id",
    "key": "group_id"
  }
],
} as const;

export type IsuserhaspermissiondeletetweetConfig = typeof ISUSERHASPERMISSIONDELETETWEET;