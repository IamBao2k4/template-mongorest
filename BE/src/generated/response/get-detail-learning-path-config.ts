export const GET_DETAIL_LEARNING_PATH = {
  _id: "68077a74fa0fd1ce8598958b",
  title: "get detail learning path",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "68062af5beb73c2d42c97dc5"
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
      "$or": [{ "id": "@param:_id" }, { "slug": "@param:slug" }]
    }
  },
  // Unwind course array để xử lý từng element
  {
    "$lookup": {
      "from": "mge-courses",
      "localField": "course",
      "foreignField": "id",
      "pipeline": [
        {
          "$lookup": {
            "from": "media",
            "let": {
              "coverImageId": {
                "$arrayElemAt": [
                  "$cover_image",
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
                        "$toObjectId": "$$coverImageId"
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
            "as": "cover_image"
          }
        },
        {
          "$lookup": {
            "from": "mge-course-user-progress",
            "localField": "id",
            "foreignField": "course",
            "pipeline": [
              {
                "$match": {
                  "user": "@jwt:user.id"
                }
              }
            ],
            "as": "finished_count"
          }
        },
        {
          "$addFields": {
            "finished_count": {
              "$size": "$finished_count"
            }
          }
        },
        {
          "$lookup": {
            "from": "mge-lessons",
            "localField": "id",
            "foreignField": "course",
            "as": "lesson_count"
          }
        },
        {
          "$addFields": {
            "lesson_count": {
              "$size": "$lesson_count"
            }
          }
        },
        {
          "$lookup": {
            "from": "mge-exams",
            "localField": "id",
            "foreignField": "course",
            "as": "exam_count"
          }
        },
        {
          "$addFields": {
            "exam_count": {
              "$size": "$exam_count"
            }
          }
        },
        {
          "$addFields": {
            "content_count": {
              "$add": [
                "$lesson_count",
                "$exam_count"
              ]
            }
          }
        }
      ],
      "as": "course"
    }
  },
  {
    "$project": {
      "title": 1,
      "slug": 1,
      "department": 1,
      "team": 1,
      "job_position": 1,
      "course.title": 1,
      "course.slug": 1,
      "course.cover_image": 1,
      "course.finished_count": 1,
      "course.content_count": 1,
      "course._id": 1
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
    "value": "learning_path_id",
    "key": "learning_path_id"
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
    "value": "_id",
    "key": "_id"
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
    "value": "x-tenant_id",
    "key": "x-tenant_id"
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
  id: "68077a74fa0fd1ce8598958b",
} as const;

export type GetDetailLearningPathConfig = typeof GET_DETAIL_LEARNING_PATH;