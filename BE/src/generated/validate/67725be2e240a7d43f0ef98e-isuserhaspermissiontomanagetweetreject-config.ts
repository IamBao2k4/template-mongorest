export const ISUSERHASPERMISSIONTOMANAGETWEETREJECT = {
  _id: "67725be2e240a7d43f0ef98e",
  title: "is-user-has-permission-to-manage-tweet-reject",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "28176c69-9179-4e57-941b-05e4642d3d56",
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
      "can_update_group_info": {
        "$anyElementTrue": {
          "$map": {
            "input": {
              "$arrayElemAt": ["$group_info.permissions.tweet_reject_manage", 0]
            },
            "as": "permission",
            "in": { "$eq": ["$$permission", "$role"] }
          }
        }
      }
    }
  },
  {
    "$match": {
      "can_update_group_info": true
    }
  }
]
`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserhaspermissiontomanagetweetrejectConfig = typeof ISUSERHASPERMISSIONTOMANAGETWEETREJECT;