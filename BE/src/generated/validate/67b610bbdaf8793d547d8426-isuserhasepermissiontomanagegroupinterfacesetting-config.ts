export const ISUSERHASEPERMISSIONTOMANAGEGROUPINTERFACESETTING = {
  _id: "67b610bbdaf8793d547d8426",
  title: "is-user-hase-permission-to-manage-group-interface-setting",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
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
      "can_manage_group_interface_setting": {
        "$gt": [
          { 
            "$size": {
              "$setIntersection": [
                "$role", 
                "$group_info.permissions.group_interface_setting_manage"
              ]
            }
          },
          0
        ]
      }
    }
  },
  { "$match": { "can_manage_group_interface_setting": true } }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserhasepermissiontomanagegroupinterfacesettingConfig = typeof ISUSERHASEPERMISSIONTOMANAGEGROUPINTERFACESETTING;