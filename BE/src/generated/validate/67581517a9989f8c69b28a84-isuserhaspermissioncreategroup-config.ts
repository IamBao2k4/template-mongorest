export const ISUSERHASPERMISSIONCREATEGROUP = {
  _id: "67581517a9989f8c69b28a84",
  title: "is-user-has-permission-create-group",
  entity: [
  "6740251baefaffc3e4662e6b"
],
  data: {
  "id": "7cda444c-b668-4167-ba4c-ea6f7e1cd4da",
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
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "id": "@header:x-tenant-id"
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-level-mapping",
      "localField": "mge_setting.setting_permissions.setting_group_create",
      "foreignField": "tenant_level",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id"
          }
        },
        {
          "$addFields": {
            "user": {
              "$map": {
                "input": "$user",
                "as": "u",
                "in": {
                  "$toObjectId": "$$u"
                }
              }
            }
          }
        },
        {
          "$lookup": {
            "from": "user-tenant-profile",
            "localField": "user",
            "foreignField": "_id",
            "pipeline": [
              {
                "$match": {
                  "user": "@jwt:user.id"
                }
              }
            ],
            "as": "user_info"
          }
        },
        {
          "$match": {
            "user_info": {
              "$ne": []
            }
          }
        }
      ],
      "as": "user_tenant_mapping"
    }
  },
  {
    "$match": {
      "user_tenant_mapping": {
        "$ne": []
      }
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  params: null,
} as const;

export type IsuserhaspermissioncreategroupConfig = typeof ISUSERHASPERMISSIONCREATEGROUP;