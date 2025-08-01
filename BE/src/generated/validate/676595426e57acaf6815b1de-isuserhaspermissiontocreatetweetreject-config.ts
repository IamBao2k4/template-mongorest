export const ISUSERHASPERMISSIONTOCREATETWEETREJECT = {
  _id: "676595426e57acaf6815b1de",
  title: "is-user-has-permission-to-create-tweet-reject",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "13d0835a-8427-497a-90ba-aee325209ab5",
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
      "social_group": "@params:group_id"
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
              "$ifNull": [
                { "$arrayElemAt": ["$group_info.permissions.tweet_reject_create", 0] }, 
                []
              ] 
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

export type IsuserhaspermissiontocreatetweetrejectConfig = typeof ISUSERHASPERMISSIONTOCREATETWEETREJECT;