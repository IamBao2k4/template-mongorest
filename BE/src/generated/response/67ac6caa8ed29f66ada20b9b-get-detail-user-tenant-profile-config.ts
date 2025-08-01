export const GET_DETAIL_USER_TENANT_PROFILE = {
  _id: "67ac6caa8ed29f66ada20b9b",
  title: "get detail user tenant profile",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67aad740a67aaa1951ca64b0"
],
  queryAdvance: `[
  {
    "$addFields": {
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "user": "@param:_id"
    }
  },
  {
    "$addFields": {
      "profile.social.full_name": {
        "$concat": [
          "$profile.first_name",
          " ",
          "$profile.last_name"
        ]
      },
      "profile.course.full_name": {
        "$concat": [
          "$profile.first_name",
          " ",
          "$profile.last_name"
        ]
      }
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-level-mapping",
      "localField": "id",
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id"
          }
        },
        {
          "$addFields": {
            "tenant_level": {
              "$cond": {
                "if": {
                  "$and": [
                    {
                      "$ne": [
                        "$tenant_level",
                        null
                      ]
                    },
                    {
                      "$isArray": "$tenant_level"
                    }
                  ]
                },
                "then": {
                  "$map": {
                    "input": "$tenant_level",
                    "as": "u",
                    "in": {
                      "$toObjectId": "$$u"
                    }
                  }
                },
                "else": "$tenant_level"
              }
            }
          }
        },
        {
          "$lookup": {
            "from": "user-tenant-level",
            "localField": "tenant_level",
            "foreignField": "_id",
            "pipeline": [
              {
                "$addFields": {
                  "id": {
                    "$toString": "$_id"
                  }
                }
              }
            ],
            "as": "tenant_level"
          }
        }
      ],
      "as": "role"
    }
  },
  {
    "$unwind": {
      "path": "$role",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$unwind": {
      "path": "$role.tenant_level",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$addFields": {
      "tenant_id_object": {
        "$toObjectId": "$tenant_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "tenant",
      "localField": "tenant_id_object",
      "foreignField": "_id",
      "as": "tenant_info"
    }
  },
  {
    "$unwind": "$tenant_info"
  },
{
  "$addFields": {
    "permissions.social.create_group": {
      "$in": [
        "$role.tenant_level.id",
        { "$ifNull": ["$tenant_info.mge_setting.setting_permissions.setting_group_create", []] }
      ]
    },
    "permissions.course.full_permission": {
      "$in": [
        "$role.tenant_level.id",
        { "$ifNull": ["$tenant_info.course_setting.full_permission", []] }
      ]
    },
    "permissions.course.create_course": {
      "$in": [
        "$role.tenant_level.id",
        { "$ifNull": ["$tenant_info.course_setting.create_course", []] }
      ]
    },
    "permissions.course.create_question": {
      "$in": [
        "$role.tenant_level.id",
        { "$ifNull": ["$tenant_info.course_setting.create_question", []] }
      ]
    },
    "permissions.course.create_learning_path": {
      "$in": [
        "$role.tenant_level.id",
        { "$ifNull": ["$tenant_info.course_setting.create_learning_path", []] }
      ]
    }
  }
},
  {
    "$project": {
      "tenant_id": 1,
      "user": 1,
      "email": 1,
      "nickname": 1,
      "profile.social.first_name": "$profile.first_name",
      "profile.social.last_name": "$profile.last_name",
      "profile.social.full_name": 1,
      "profile.social.featured_image": 1,
      "profile.social.cover": 1,
      "profile.social.birthday": 1,
      "profile.social.description": 1,
      "profile.course.first_name": "$profile.first_name",
      "profile.course.last_name": "$profile.last_name",
      "profile.course.full_name": 1,
      "profile.course.featured_image": 1,
      "profile.course.cover": 1,
      "profile.course.birthday": 1,
      "profile.course.description": 1,
      "role": "$role.tenant_level.title",
      "permissions": 1
    }
  },
  {
    "$facet": {
      "meta_data": [
        {
          "$count": "count"
        },
        {
          "$addFields": {
            "skip": "@param:skip",
            "limit": "@param:limit"
          }
        }
      ],
      "data": [
        {
          "$skip": "@param:skip"
        },
        {
          "$limit": "@param:limit"
        }
      ]
    }
  }
]`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  },
  {
    "value": "_id",
    "key": "_id"
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  },
  {
    "value": "x-tenant_id",
    "key": "x-tenant_id"
  }
],
  data: {
  "id": "f516b3c1-9a49-44da-9d4d-817500ad604e",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [
  {
    "key": "email",
    "value": "email"
  },
  {
    "key": "user",
    "value": "user"
  },
  {
    "key": "_id",
    "value": "_id"
  },
  {
    "key": "created_by",
    "value": "created_by"
  },
  {
    "key": "updated_by",
    "value": "updated_by"
  },
  {
    "key": "created_at",
    "value": "created_at"
  },
  {
    "key": "updated_at",
    "value": "updated_at"
  }
],
  id: "67ac6caa8ed29f66ada20b9b",
} as const;

export type GetDetailUserTenantProfileConfig = typeof GET_DETAIL_USER_TENANT_PROFILE;