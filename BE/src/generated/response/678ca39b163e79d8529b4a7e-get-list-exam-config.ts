export const GET_LIST_EXAM = {
  _id: "678ca39b163e79d8529b4a7e",
  title: "get list exam",
  note: "Dùng cho giảng viên và quản trị viên khóa học",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752ad7665017d942f759440"
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
                "$ne": ["@param:status[]", null]
              },
              "then": {
                "$in": ["$status", "@param:status[]"]
              },
              "else": true
            }
          },
          {
            "$cond": {
              "if": {
                "$ne": ["@param:exam_type[]", null]
              },
              "then": {
                "$eq": ["$exam_type", "@param:exam_type[]"]
              },
              "else": true
            }
          },
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
    "value": "chapter[]",
    "key": "chapter[]"
  },
  {
    "value": "exam_type[]",
    "key": "exam_type[]"
  },
  {
    "value": "title",
    "key": "title"
  }
],
  headers: [],
  data: {
  "id": "db2400b5-f377-47e6-838e-d5ea559ae27a",
  "rules": [],
  "combinator": "and",
  "not": false
},
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
    "key": "is_final_exam",
    "value": "is_final_exam"
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
  id: "678ca39b163e79d8529b4a7e",
} as const;

export type GetListExamConfig = typeof GET_LIST_EXAM;