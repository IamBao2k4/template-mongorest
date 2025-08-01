export const GET_LIST_TENANT_S_USER_EXCEPT_SOCIAL_S_MEMBERS = {
  _id: "68021d52887875ca1b8c7902",
  title: "get list tenant's user except social's members",
  method: "get-list",
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
      "user": {
        "$ne": "@jwt:user.id"
      }
    }
  },
  {
    "$addFields": {
      "profile.full_name": {
        "$concat": ["$profile.first_name", " ", "$profile.last_name"]
      }
    }
  },
  {
    "$unwind": {
      "path": "$user",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$addFields": {
      "profile.social._id": "$user"
    }
  },
  {
    "$addFields": {
      "profile.course._id": "$user"
    }
  },
  {
    "$lookup": {
      "from": "mge-group-member",
      "localField": "user",
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "social_group": "@param:group_id",
            "$or": [
              {
                "status": "joined"
              },
              {
                "status": "pending"
              }
            ]
          }
        }
      ],
      "as": "matchedMembers"
    }
  },
  {
    "$match": {
      "matchedMembers": {
        "$eq": []
      }
    }
  },
  {
    "$project": {
      "_id": "$profile.social._id",
      "full_name": "$profile.full_name",
      "last_name": "$profile.last_name",
      "first_name":"$profile.first_name",
      "featured_image": "$profile.social.featured_image",
      "description": "$profile.social.description",
      "phone": "$profile.social.phone",
      "birthday": "$profile.social.birthday",
      "email": 1
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
              "input": "$full_name",
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
    "value": "title",
    "key": "title"
  },
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
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
  id: "68021d52887875ca1b8c7902",
} as const;

export type GetListTenantsUserExceptSocialsMembersConfig = typeof GET_LIST_TENANT_S_USER_EXCEPT_SOCIAL_S_MEMBERS;