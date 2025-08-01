export const GET_DETAIL_TWEET = {
  _id: "67ce554e948cd325aa3f155b",
  title: "get detail tweet",
  cache_time: "3",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c66d92cb2d3f0de04bccc1"
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
      "$or": [
        {
          "id": "@param:_id"
        },
        {
          "slug": "@param:slug"
        }
      ]
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
    "$addFields": {
      "category": {
        "$map": {
          "input": "$category",
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
      "from": "mge-listing-category",
      "localField": "category",
      "foreignField": "_id",
      "as": "category"
    }
  },
  {
    "$addFields": {
      "project": {
        "$map": {
          "input": "$project",
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
      "from": "mge-listing-project",
      "localField": "project",
      "foreignField": "_id",
      "pipeline": [
        {
          "$addFields": {
            "tag": {
              "$map": {
                "input": "$tag",
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
            "from": "mge-listing-tag",
            "localField": "tag",
            "foreignField": "_id",
            "as": "tag"
          }
        },
        {
          "$project": {
            "title": 1,
            "overview_static": 1,
            "list_image": 1,
            "tag": 1
          }
        }
      ],
      "as": "project"
    }
  },
  {
    "$addFields": {
      "created_by": {
        "$toObjectId": "$created_by"
      }
    }
  },
  {
    "$lookup": {
      "from": "user",
      "localField": "created_by",
      "foreignField": "_id",
      "pipeline": [
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
          "$project": {
            "password": 0,
            "role_system": 0
          }
        }
      ],
      "as": "created_by"
    }
  },
  {
    "$lookup": {
      "from": "mge-listing-tweet-saved",
      "localField": "id",
      "foreignField": "tweet_id",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id",
            "created_by": "@jwt:user.id"
          }
        }
      ],
      "as": "saved_info"
    }
  },
  {
    "$addFields": {
      "saved": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": "$saved_info"
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
    "value": "_id",
    "key": "_id"
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
    "value": "slug",
    "key": "slug"
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
    "key": "title",
    "value": "title"
  },
  {
    "key": "slug",
    "value": "slug"
  },
  {
    "key": "list_image",
    "value": "list_image"
  },
  {
    "key": "short_description",
    "value": "short_description"
  },
  {
    "key": "long_description",
    "value": "long_description"
  },
  {
    "key": "featured_image",
    "value": "featured_image"
  },
  {
    "key": "category",
    "value": "category"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "approve_at",
    "value": "approve_at"
  },
  {
    "key": "approve_by",
    "value": "approve_by"
  },
  {
    "key": "expire_at",
    "value": "expire_at"
  },
  {
    "key": "reject_reason",
    "value": "reject_reason"
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

export type GetDetailTweetConfig = typeof GET_DETAIL_TWEET;