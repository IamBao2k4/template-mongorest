export const ISUSERHASPERMISSIONUPDATEGROUPCATEGORIES = {
  _id: "675a94d00f44fc1769fded60",
  title: "is-user-has-permission-update-group-categories",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "8124f774-43dd-4b46-ace5-ae219d9d1ce4",
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
      "group_info": { "$arrayElemAt": ["$group_info", 0] }
    }
  },
{
  "$addFields": {
    "can_update_group_category": {
      "$cond": {
        "if": {
          "$gt": [
            { "$size": { "$setIntersection": ["$role", "$group_info.permissions.group_category_update"] } },
            0
          ]
        },
        "then": true,
        "else": false
      }
    }
  }
},
  { "$match": { "can_update_group_category": true } }
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

export type IsuserhaspermissionupdategroupcategoriesConfig = typeof ISUSERHASPERMISSIONUPDATEGROUPCATEGORIES;