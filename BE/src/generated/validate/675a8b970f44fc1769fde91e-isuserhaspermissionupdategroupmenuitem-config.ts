export const ISUSERHASPERMISSIONUPDATEGROUPMENUITEM = {
  _id: "675a8b970f44fc1769fde91e",
  title: "is-user-has-permission-update-group-menu-item",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "76917e73-daf8-4d4b-b951-7a8d43d5ec34",
  "rules": [],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"$expr":true}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  advance: `[  {    "$addFields": {      "social_group_object_id": {        "$map": {          "input": "$social_group",          "as": "sg",          "in": {            "$toObjectId": "$$sg"          }        }      }    }  },  {    "$match": {      "user": "@jwt:user.id",      "$or": [        { "social_group": "@param:group_id" },        { "social_group": "@param:_id" }      ]    }  },  {    "$lookup": {      "from": "mge-group",      "localField": "social_group_object_id",      "foreignField": "_id",      "as": "group_info"    }  },  {    "$addFields": {      "group_info": { "$arrayElemAt": ["$group_info", 0] }    }  },{  "$addFields": {    "can_update_group_menu_item": {      "$cond": {        "if": {          "$gt": [            { "$size": { "$setIntersection": ["$role", "$group_info.permissions.group_menu_item_update"] } },            0          ]        },        "then": true,        "else": false      }    }  }},  { "$match": { "can_update_group_menu_item": true } }]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "group_id",
    "key": "group_id"
  },
  {
    "value": "_id",
    "key": "_id"
  }
],
} as const;

export type IsuserhaspermissionupdategroupmenuitemConfig = typeof ISUSERHASPERMISSIONUPDATEGROUPMENUITEM;