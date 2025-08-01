export const USER_C_C_PHP_THM_THNH_VIN_VO_NHM_KHNG = {
  _id: "67ece20f8660ad558d912c2b",
  title: "User có được phép thêm thành viên vào nhóm không?",
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
      "can_add_member": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": {
                  "$setIntersection": [
                    "$role",
                    "$group_info.permissions.group_member_add"
                  ]
                }
              },
              0
            ]
          },
          "then": true,
          "else": false
        }
      }
    }
  },
  {
    "$match": {
      "can_add_member": true
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type UserCCPhpThmThnhVinVoNhmKhngConfig = typeof USER_C_C_PHP_THM_THNH_VIN_VO_NHM_KHNG;