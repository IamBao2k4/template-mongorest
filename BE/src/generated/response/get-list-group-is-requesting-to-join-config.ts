export const GET_LIST_GROUP_IS_REQUESTING_TO_JOIN = {
  _id: "6768e6cb7150f61db7cecd67",
  title: "Get list group is requesting to join",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674810a776462b61b5df8ece"
],
  queryAdvance: `[
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
    "$lookup": {
      "from": "mge-group",
      "localField": "social_group_object_id",
      "foreignField": "_id",
      "as": "social_group"
    }
  },
  {
    "$match": {
      "user": "@jwt:user.id",
      "status": "pending",
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$unwind": "$social_group"
  },
  {
    "$replaceRoot": {
      "newRoot": {
        "$mergeObjects": [
          "$social_group",
          {
            "role": "$role"
          }
        ]
      }
    }
  },
  {
    "$lookup": {
      "from": "media",
      "let": {
        "featuredImageId": {
          "$arrayElemAt": [
            "$cover",
            0
          ]
        }
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                "$_id",
                {
                  "$toObjectId": "$$featuredImageId"
                }
              ]
            }
          }
        },
        {
          "$addFields": {
            "path": {
              "$concat": [
                {
                  "$cond": [
                    {
                      "$eq": [
                        "minio",
                        "@app_settings:storage_type"
                      ]
                    },
                    "@app_settings:minio.public",
                    "@app_settings:doSpace.public"
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
      "as": "cover"
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
    "value": "social_group",
    "required": true
  },
  {
    "key": "user",
    "value": "user",
    "required": true
  },
  {
    "key": "status",
    "value": "status",
    "required": true
  },
  {
    "key": "isFollow",
    "value": "isFollow",
    "required": true
  },
  {
    "key": "role",
    "value": "role",
    "required": true
  },
  {
    "key": "_id",
    "value": "_id",
    "required": true
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
    "value": "created_at",
    "required": true
  },
  {
    "key": "updated_at",
    "value": "updated_at"
  }
],
  id: "",
} as const;

export type GetListGroupIsRequestingToJoinConfig = typeof GET_LIST_GROUP_IS_REQUESTING_TO_JOIN;