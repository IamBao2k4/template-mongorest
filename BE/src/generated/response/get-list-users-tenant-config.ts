export const GET_LIST_USERS_TENANT = {
  _id: "67b2e7c5865239949ef2ee50",
  title: "get list user's tenant",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6740251baefaffc3e4662e6b"
],
  queryAdvance: `[
  {
    "$addFields": {
      "id": { "$toString": "$_id" }
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-level-mapping",
      "localField": "id",
      "foreignField": "tenant_id",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id"
          }
        }
      ],
      "as": "userTenantMapping"
    }
  },
  {
    "$match": {
      "$or": [
        { "type": "public" },
        { "userTenantMapping": { "$ne": [] } }
      ]
    }
  },
  {
    "$addFields": {
      "mge_setting.color": {
        "$cond": {
          "if": { "$isArray": "$mge_setting.color" },
          "then": {
            "$map": {
              "input": "$mge_setting.color",
              "as": "c",
              "in": { "$toObjectId": "$$c" }
            }
          },
          "else": { "$toObjectId": "$mge_setting.color" }
        }
      },
      "mge_setting.logo": {
        "$cond": {
          "if": { "$isArray": "$mge_setting.logo" },
          "then": {
            "$map": {
              "input": "$mge_setting.logo",
              "as": "l",
              "in": { "$toObjectId": "$$l" }
            }
          },
          "else": { "$toObjectId": "$mge_setting.logo" }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "media",
      "localField": "mge_setting.color",
      "foreignField": "_id",
      "pipeline": [
        {
          "$addFields": {
            "path": {
              "$concat": [
                {
                  "$cond": [
                    { "$eq": [ "minio", "digital" ] },
                    "https://minio.mangoads.com.vn",
                    "https://mgs-storage.sgp1.digitaloceanspaces.com"
                  ]
                },
                "/",
                "$disk",
                "/",
                "$filename"
              ]
            }
          }
        }
      ],
      "as": "mge_setting.color"
    }
  },
  {
    "$lookup": {
      "from": "media",
      "localField": "mge_setting.logo",
      "foreignField": "_id",
      "pipeline": [
        {
          "$addFields": {
            "path": {
              "$concat": [
                {
                  "$cond": [
                    { "$eq": [ "minio", "digital" ] },
                    "https://minio.mangoads.com.vn",
                    "https://mgs-storage.sgp1.digitaloceanspaces.com"
                  ]
                },
                "/",
                "$disk",
                "/",
                "$filename"
              ]
            }
          }
        }
      ],
      "as": "mge_setting.logo"
    }
  },
  {
    "$project": {
      "userTenantMapping": 0
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
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListUsersTenantConfig = typeof GET_LIST_USERS_TENANT;