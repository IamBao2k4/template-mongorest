export const ISUSERHASPERMISSIONTOCREATETWEETSTORE = {
  _id: "676546116e57acaf6815b0dd",
  title: "is-user-has-permission-to-create-tweet-store",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "b3f25280-1908-4c76-83c9-727225770bab",
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
                { "$arrayElemAt": ["$group_info.permissions.tweet_store_create", 0] }, 
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

export type IsuserhaspermissiontocreatetweetstoreConfig = typeof ISUSERHASPERMISSIONTOCREATETWEETSTORE;