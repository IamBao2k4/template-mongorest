export const GET_LIST_TWEET_REPORT = {
  _id: "67d0f79b563a6f3245cb0de7",
  title: "get list tweet report",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c66d92cb2d3f0de04bccc1"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$addFields": {
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-listing-tweet-report",
      "localField": "id",
      "foreignField": "tweet",
      "pipeline": [
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
                "$project": {
                  "password": 0
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
                  "as": "featured_image"
                }
              }
            ],
            "as": "created_by"
          }
        }
      ],
      "as": "report_info"
    }
  },
  {
    "$match": {
      "report_info": {
        "$ne": []
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

export type GetListTweetReportConfig = typeof GET_LIST_TWEET_REPORT;