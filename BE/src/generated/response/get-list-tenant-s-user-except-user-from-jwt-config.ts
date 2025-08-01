export const GET_LIST_TENANT_S_USER_EXCEPT_USER_FROM_JWT = {
  _id: "67c0153b0bb62abd56e81538",
  title: "get list tenant's user except user from jwt",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6757b1998659c9e98a2f1e2b"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "user": {
        "$ne": "@jwt:user.id"
      }
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "user",
      "foreignField": "user",
      "pipeline": [
        {
          "$match":{
            "tenant_id":"@header:x-tenant-id"
          }
        },
        {
          "$addFields": {
            "full_name": {
              "$concat": [
                "$profile.social.last_name",
                " ",
                "$profile.social.first_name"
              ]
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "full_name": 1,
            "featured_image": "$profile.social.featured_image"
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
            "$eq": [
              "@param:title",
              null
            ]
          },
          {
            "$anyElementTrue": {
              "$map": {
                "input": "$user",
                "as": "u",
                "in": {
                  "$regexMatch": {
                    "input": "$$u.full_name",
                    "regex": "@param:title",
                    "options": "i"
                  }
                }
              }
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
]`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
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
  restricted: [],
  id: "",
} as const;

export type GetListTenantsUserExceptUserFromJwtConfig = typeof GET_LIST_TENANT_S_USER_EXCEPT_USER_FROM_JWT;