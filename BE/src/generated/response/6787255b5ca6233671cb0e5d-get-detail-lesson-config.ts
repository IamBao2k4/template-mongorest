export const GET_DETAIL_LESSON = {
  _id: "6787255b5ca6233671cb0e5d",
  title: "get detail lesson",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752a70b65017d942f75941d"
],
  queryAdvance: `[
  {
    "$addFields": {
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "$or": [
        {
          "_id": "@param:_id"
        },
        {
          "_id": "@param:lesson_id"
        },
        {
          "slug": "@param:slug"
        }
      ]
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "created_by",
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
              "$concat": ["$profile.course.last_name", " ", "$profile.course.first_name"]
            }
          }
        },
        {
          "$project": {
            "_id": "$user",
            "full_name": 1,
            "featured_image": "$profile.course.featured_image"
          }
        }
      ],
      "as": "user"
    }
  },
  {
    "$addFields": {
      "chapters": {
        "$map": {
          "input": {
            "$ifNull": ["$chapters", []]
          },
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
      "from": "mge-chapters",
      "localField": "chapters",
      "foreignField": "_id",
      "as": "chapters"
    }
  },
  {
    "$lookup": {
      "from": "media",
      "let": { "videofileId": { "$arrayElemAt": ["$video_file", 0] } },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": ["$_id", { "$toObjectId": "$$videofileId" }]
            }
          }
        },
        {
          "$addFields": {
            "path": {
              "$concat": [
                {
                  "$cond": [
                    { "$eq": ["minio", "@app_settings:storage_type"] },
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
      "as": "video_file"
    }
  },
  {
    "$lookup": {
      "from": "media",
      "let": { "filesId": { "$arrayElemAt": ["$files", 0] } },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": ["$_id", { "$toObjectId": "$$filesId" }]
            }
          }
        },
        {
          "$addFields": {
            "path": {
              "$concat": [
                {
                  "$cond": [
                    { "$eq": ["minio", "@app_settings:storage_type"] },
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
      "as": "files"
    }
  },
  {
    "$lookup": {
      "from": "media",
      "let": {
        "resourcesId": {
          "$arrayElemAt": ["$resources", 0]
        }
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                "$_id",
                {
                  "$toObjectId": "$$resourcesId"
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
                      "$eq": ["minio", "@app_settings:storage_type"]
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
      "as": "resources"
    }
  },
  {
    "$lookup": {
      "from": "mge-course-user-progress",
      "localField": "_id",
      "foreignField": "lesson",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id",
            "user": "@jwt:user.id"
          }
        }
      ],
      "as": "is_finished"
    }
  },
  {
    "$addFields": {
      "is_finished": {
        "$cond": {
          "if": { "$gt": [{ "$size": "$is_finished" }, 0] },
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
]
`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "_id",
    "key": "_id"
  },
  {
    "value": "lesson_id",
    "key": "lesson_id"
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
  },
  {
    "value": "x-tenant-i",
    "key": "x-tenant-i"
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
    "key": "lesson_type",
    "value": "lesson_type"
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
  id: "6787255b5ca6233671cb0e5d",
} as const;

export type GetDetailLessonConfig = typeof GET_DETAIL_LESSON;