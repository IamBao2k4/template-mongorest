export const GET_LIST_GROUP_S_MEMBERS_WITH_STATUS_IS_PENDING = {
  _id: "676cd0ca4ec833ce93a07e2c",
  title: "Get list group's members with status is pending",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674810a776462b61b5df8ece"
],
  queryAdvance: `[
  {
    "$match": {
      "social_group": "@param:group_id",
      "status": "pending",
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "user",
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id"
          }
        },
        {
          "$addFields": {
            "full_name": {
              "$concat": ["$profile.last_name", " ", "$profile.first_name"]
            }
          }
        },
        {
          "$project": {
            "_id": "$user",
            "full_name": 1,
            "featured_image": "$profile.social.featured_image",
            "email": "$email",
            "description": "$profile.social.description",
            "cover": "$profile.social.cover",
            "birthday": "$profile.social.birthday",
            "phone": "$profile.social.phone"
          }
        }
      ],
      "as": "user"
    }
  },
  {
    "$match": {
      "$expr": {
        "$or": [
          {
            "$eq": ["@param:title", null]
          },
          {
            "$regexMatch": {
              "input": "$user.full_name",
              "regex": "@param:title",
              "options": "i"
            }
          }
        ]
      }
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
]
`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "group_id",
    "key": "group_id"
  },
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  },
  {
    "value": "title",
    "key": "title"
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  restricted: [
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "user",
    "value": "user"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "isFollow",
    "value": "isFollow"
  },
  {
    "key": "role",
    "value": "role"
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
  id: "",
} as const;

export type GetListGroupsMembersWithStatusIsPendingConfig = typeof GET_LIST_GROUP_S_MEMBERS_WITH_STATUS_IS_PENDING;