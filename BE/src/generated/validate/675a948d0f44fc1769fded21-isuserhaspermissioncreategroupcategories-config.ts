export const ISUSERHASPERMISSIONCREATEGROUPCATEGORIES = {
  _id: "675a948d0f44fc1769fded21",
  title: "is-user-has-permission-create-group-categories",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "d63725b6-2a4c-423d-b549-2d732649eeff",
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
      "social_group": "@params:group_id"
    }
  },
  {
    "$addFields": {
      "social_group": {
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
      "localField": "social_group",
      "foreignField": "_id",
      "as": "group_info"
    }
  },
  {
    "$addFields": {
      "group_info": { "$arrayElemAt": ["$group_info", 0] }
    }
  },
  {
    "$addFields": {
      "can_create_group_category": {
        "$gt": [
          { 
            "$size": {
              "$setIntersection": [
                "$role", 
                "$group_info.permissions.group_category_create"
              ]
            }
          },
          0
        ]
      }
    }
  },
  { "$match": { "can_create_group_category": true } }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  logged: true,
  params: [
  {
    "value": "group_id",
    "key": "group_id"
  }
],
} as const;

export type IsuserhaspermissioncreategroupcategoriesConfig = typeof ISUSERHASPERMISSIONCREATEGROUPCATEGORIES;