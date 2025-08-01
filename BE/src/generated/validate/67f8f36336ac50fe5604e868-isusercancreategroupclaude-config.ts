export const ISUSERCANCREATEGROUPCLAUDE = {
  _id: "67f8f36336ac50fe5604e868",
  title: "is-user-can-create-group-claude",
  note: "Kiểm tra xem người dùng hiện tại có quyền tạo nhóm hay không. Thường dựa vào role_system hoặc các quyền đặc biệt được cấp.",
  entity: [
  "user"
],
  data: {
  "id": "is-user-can-create-group",
  "rules": [],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"$expr":true}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
  advance: `[
  {
    "$match": {
      "_id": "@jwt:user.id",
      "is_active": true,
      "$or": [
        {
          "role_system": "admin"
        },
        {
          "permissions.can_create_group": true
        },
        {
          "role_system": "user"
        }
      ]
    }
  },
  {
    "$lookup": {
      "from": "tenant",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id",
            "is_active": true
          }
        },
        {
          "$project": {
            "settings": 1
          }
        }
      ],
      "as": "tenant_info"
    }
  },
  {
    "$addFields": {
      "tenant_settings": {
        "$ifNull": [
          {
            "$arrayElemAt": ["$tenant_info.settings", 0]
          },
          {}
        ]
      }
    }
  },
  {
    "$match": {
      "$or": [
        {
          "tenant_settings.allow_users_create_group": true
        },
        {
          "role_system": "admin"
        }
      ]
    }
  },
  {
    "$project": {
      "_id": 1,
      "email": 1,
      "username": 1,
      "role_system": 1,
      "can_create_group": true
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: [
  {
    "key": "",
    "value": "user.id",
    "description": "ID của người dùng hiện tại từ JWT token"
  },
  {
    "key": "",
    "value": "x-tenant-id",
    "description": "ID của tenant hiện tại"
  }
],
  params: null,
} as const;

export type IsusercancreategroupclaudeConfig = typeof ISUSERCANCREATEGROUPCLAUDE;