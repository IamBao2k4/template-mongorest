export const GET_LIST_COURSES_LESSONS = {
  _id: "67868609aadb7b67e278f093",
  title: "get list course's lessons",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752a70b65017d942f75941d"
],
  queryAdvance: `[
  {
    "$match": {
      "course": "@param:course_id"
    }
  },
  {
    "$match": {
      "$expr": {
        "$and": [
          {
            "$cond": {
              "if": {
                "$ne": ["@param:chapter[]", null]
              },
              "then": {
                "$or": [
                  {
                    "$in": ["$chapters", ["@param:chapter[]"]]
                  },
                  {
                    "$in": ["$chapters", [["@param:chapter[]"]]]
                  }
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
    "$addFields": {
      "chapters": {
        "$map": {
          "input": "$chapters",
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
      "from": "mge-chapters",
      "localField": "chapters",
      "foreignField": "_id",
      "as": "chapters"
    }
  },
  {
    "$addFields": {
      "video_file": {
        "$cond": {
          "if": {
            "$isArray": "$video_file"
          },
          "then": {
            "$toObjectId": {
              "$arrayElemAt": ["$video_file", 0]
            }
          },
          "else": {
            "$toObjectId": "$video_file"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "media",
      "localField": "video_file",
      "foreignField": "_id",
      "pipeline": [
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
      "as": "video_file"
    }
  },
  {
    "$addFields": {
      "is_using": {
        "$cond": {
          "if": {
            "$and": [
              {
                "$ne": ["$chapters", null]
              },
              {
                "$gt": [
                  {
                    "$size": "$chapters"
                  },
                  0
                ]
              }
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
      "is_using_chapter": {
        "$cond": {
          "if": "$is_using",
          "then": "true",
          "else": "false"
        }
      }
    }
  },
  {
    "$match": {
      "$expr": {
        "$cond": {
          "if": {
            "$ne": ["@param:is_using", null]
          },
          "then": {
            "$eq": ["$is_using_chapter", "@param:is_using"]
          },
          "else": true
        }
      }
    }
  },
    {
    "$match": {
      "$expr": {
        "$or": [
          {
            "$eq": ["@param:title", null]
          },
          {
            "$regexMatch": {
              "input": "$title",
              "regex": "@param:title",
              "options": "i"
            }
          }
        ]
      }
    }
  },
  {
    "$project": {
      "is_using_chapter": 0
    }
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
]
`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "course_id",
    "key": "course_id"
  },
  {
    "value": "status[]",
    "key": "status[]"
  },
  {
    "value": "type[]",
    "key": "type[]"
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
    "value": "is-using-chapter",
    "key": "is-using-chapter"
  },
  {
    "value": "is_using_chapter",
    "key": "is_using_chapter"
  },
  {
    "value": "is_using",
    "key": "is_using"
  },
  {
    "value": "_is_using",
    "key": "_is_using"
  },
  {
    "value": "chapter[]",
    "key": "chapter[]"
  }
],
  headers: [],
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
  id: "67868609aadb7b67e278f093",
} as const;

export type GetListCoursesLessonsConfig = typeof GET_LIST_COURSES_LESSONS;