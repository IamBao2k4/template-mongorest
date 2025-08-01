export const GET_LIST_LEARNING_PATH = {
  _id: "68185ea2753574930d60f829",
  title: "get list learning path",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "68062af5beb73c2d42c97dc5"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
    }
  },
   {
    "$addFields": {
      "courses": {
        "$cond": {
          "if": {
            "$and": [
              { "$isArray": "$courses" },
              { "$gt": [{ "$size": "$courses" }, 0] }
            ]
          },
          "then": {
            "$map": {
              "input": "$courses",
              "as": "item",
              "in": {
                "$mergeObjects": [
                  "$$item",
                  {
                    "course": {
                      "$cond": {
                        "if": {
                          "$and": [
                            { "$ne": ["$$item.course", null] },
                            { "$eq": [{ "$type": "$$item.course" }, "string"] }
                          ]
                        },
                        "then": { "$toObjectId": "$$item.course" },
                        "else": "$$item.course"
                      }
                    }
                  }
                ]
              }
            }
          },
          "else": "$courses"
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-courses",
      "localField": "courses.course",
      "foreignField": "_id",
      "pipeline":[
  {
          "$lookup": {
            "from": "media",
            "let": { "coverImageId": { "$arrayElemAt": [ "$cover_image", 0 ] } },
            "pipeline": [
              {
                "$match": {
                  "$expr": {
                    "$eq": [ "$_id", { "$toObjectId": "$$coverImageId" } ]
                  }
                }
              },
              {
                "$addFields": {
                  "path": {
                    "$concat": [
                      {
                        "$cond": [
                          { "$eq": [ "minio", "@app_settings:storage_type" ] },
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
            "as": "cover_image"
          }
        },
        {
          "$project":{
            "title":1,
            "slug":1,
            "short_description":1,
            "cover_image":1
          }
        }
      ],
      "as": "courseDocs"
    }
  },
  {
    "$addFields": {
      "courses": {
        "$map": {
          "input": "$courses",
          "as": "item",
          "in": {
            "$mergeObjects": [
              "$$item",
              {
                "course": {
                  "$arrayElemAt": [
                    {
                      "$filter": {
                        "input": "$courseDocs",
                        "as": "doc",
                        "cond": {
                          "$eq": ["$$doc._id", "$$item.course"]
                        }
                      }
                    },
                    0
                  ]
                }
              }
            ]
          }
        }
      }
    }
  },
  {
    "$unset": "courseDocs"
  },
  {
    "$sort": {
      "created_at": -1
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
  tenant_id: "677f6b3da3131eb0d3f9906d",
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
    "key": "title",
    "value": "title"
  },
  {
    "key": "slug",
    "value": "slug"
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

export type GetListLearningPathConfig = typeof GET_LIST_LEARNING_PATH;