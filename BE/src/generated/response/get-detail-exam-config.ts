export const GET_DETAIL_EXAM = {
  _id: "67bd479b2692eef9b7ac491b",
  title: "get detail exam",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752ad7665017d942f759440"
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
      "_id": "@param:_id"
    }
  },
  {
    "$set": {
      "chapters": {
        "$map": {
          "input": "$chapters",
          "as": "ch",
          "in": {
            "$toObjectId": "$$ch"
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
    "$set": {
      "course": {
        "$map": {
          "input": "$course",
          "as": "ch",
          "in": {
            "$toObjectId": "$$ch"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-courses",
      "localField": "course",
      "foreignField": "_id",
      "as": "course"
    }
  },
  {
    "$lookup": {
      "from": "media",
      "let": { "essayFilesid": { "$arrayElemAt": ["$essay_files", 0] } },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": ["$_id", { "$toObjectId": "$$essayFilesid" }]
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
      "as": "essay_files"
    }
  },
  {
    "$lookup": {
      "from": "mge-user-exam-result",
      "localField": "_id",
      "foreignField": "exam",
      "pipeline": [
        {
          "$match": {
            "created_by": "@jwt:user.id"
          }
        },
        {
          "$sort": {
            "created_at": -1
          }
        },
        {
          "$project": {
            "status": 1,
            "user_answer": 1,
            "max_possible_score": 1,
            "score_scale_10": 1,
            "total_score": 1,
            "attempt_count": 1,
            "correct_answer_count": 1
          }
        }
      ],
      "as": "user_exam_info"
    }
  },
  {
    "$lookup": {
      "from": "mge-course-user-progress",
      "localField": "_id",
      "foreignField": "exam",
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
          "if": {
            "$gt": [
              {
                "$size": "$is_finished"
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
      "from": "mge-categories",
      "localField": "category",
      "foreignField": "_id",
      "as": "category"
    }
  },
  {
    "$lookup": {
      "from": "mge-user-exam-result",
      "localField": "_id",
      "foreignField": "exam",
      "pipeline": [
        {
          "$match": {
            "created_by": "@jwt:user.id",
            "status": "finished"
          }
        }
      ],
      "as": "is_do_exam"
    }
  },
  {
    "$addFields": {
      "attempt_count": {
        "$size": "$is_do_exam"
      }
    }
  },
  {
    "$set": {
      "is_do_exam": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": "$is_do_exam"
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
    "$addFields": {
      "has_reached_max": {
        "$gte": ["$attempt_count", "$member_retries_allowed"]
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
    "key": "chapters",
    "value": "chapters"
  },
  {
    "key": "course",
    "value": "course"
  },
  {
    "key": "exam_type",
    "value": "exam_type"
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
  id: "67bd479b2692eef9b7ac491b",
} as const;

export type GetDetailExamConfig = typeof GET_DETAIL_EXAM;