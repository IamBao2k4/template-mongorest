export const ISUSERHASPERMISSIONCREATEMENUITEM = {
  _id: "675a90ee0f44fc1769fdec1e",
  title: "is-user-has-permission-create-menu-item",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "b114d7b1-8adb-435c-acf6-71af4e0ce0df",
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
              "$arrayElemAt": ["$group_info.permissions.group_menu_item_create", 0]
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
  logged: true,
  params: null,
} as const;

export type IsuserhaspermissioncreatemenuitemConfig = typeof ISUSERHASPERMISSIONCREATEMENUITEM;