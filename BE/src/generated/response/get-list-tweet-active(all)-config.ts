export const GET_LIST_TWEET_ACTIVE(ALL) = {
  _id: "67ce59f4948cd325aa3f200b",
  title: "get list tweet active(all)",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c66d92cb2d3f0de04bccc1"
],
  queryAdvance: `[
  "$match":{
    "status":"active",
    "tenant_id":"@header:x-tenant-id"
  },
  {
    "$skip":0
  },
  {
    "$limit":200
  },
  {
    "$addfields":{
      "_id":{
        "$toString":"$_id"
      }
    }
  },
  {
    "$lookup":{
      "from":"media",
      "let":{
        "featuredImageId":{
          "$arrayElemAt":[
            "featured_image",0
            ]
        }
      },
      "pipeline":[{
        "$match":{
          "$expr":{
            "$eq":[
              "$_id",
              {
                "$toObjectId":"$$featuredImageId"
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
        }],
        "as": "featured_image"
    }
  },
  {
    "$addFields": {
      "user": {
        "$toObjectId": "$created_by"
      }
    }
  },
  {
     "$lookup": {
      "from": "user",
      "localField": "user",
      "foreignField": "_id",
      "pipeline": [
        {
          "$lookup": {
            "from": "media",
            "let": {
              "featuredImageId": {
                "$arrayElemAt": [
                  "$featured_image",
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
        },
        {
          "$addFields": {
            "full_name": {
              "$concat": [
                "$last_name",
                " ",
                "$first_name"
              ]
            }
          }
        },
        {
          "$project": {
            "full_name": 1,
            "featured_image": 1
          }
        }
      ],
      "as": "user"
    }
  },
  {
    {
    "$lookup": {
      "from": "mge-listing-tweet-saved",
      "let": {
        "currentId": "$_id",
        "userId": "@jwt:user.id"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$eq": [
                    "$tweet_id",
                    "$$currentId"
                  ]
                },
                {
                  "$eq": [
                    "$created_by",
                    "$$userId"
                  ]
                }
              ]
            }
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

export type GetListTweetActiveallConfig = typeof GET_LIST_TWEET_ACTIVE(ALL);