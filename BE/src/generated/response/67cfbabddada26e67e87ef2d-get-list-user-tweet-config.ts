export const GET_LIST_USER_TWEET = {
  _id: "67cfbabddada26e67e87ef2d",
  title: "get list user tweet",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c66d92cb2d3f0de04bccc1"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "created_by": "@jwt:user.id"
    }
  },
  {
    "$addFields": {
      "featured_image": {
        "$map": {
          "input": "$featured_image",
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
      "from": "media",
      "localField": "featured_image",
      "foreignField": "_id",
      "pipeline": [
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
      "as": "featured_image"
    }
  },
  {
    "$match": {
      "$expr": {
        "$and": [
          {
            "$cond": {
              "if": {
                "$ne": [
                  "@param:status[]",
                  null
                ]
              },
              "then": {
                "$or": [
                  {
                    "$in": [
                      "$status",
                      [
                        "@param:status[]"
                      ]
                    ]
                  },
                  {
                    "$in": [
                      "$status",
                      [
                        [
                          "@param:status[]"
                        ]
                      ]
                    ]
                  }
                ]
              },
              "else": true
            }
          },
          {
            "$cond": {
              "if": {
                "$ne": [
                  "@param:type[]",
                  null
                ]
              },
              "then": {
                "$in": [
                  "$type",
                  "@param:type[]"
                ]
              },
              "else": true
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
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
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
  restricted: [],
  id: "",
} as const;

export type GetListUserTweetConfig = typeof GET_LIST_USER_TWEET;