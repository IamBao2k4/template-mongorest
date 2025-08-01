export const SEARCH_CONTENT_COURSE_BY_KEYWORD = {
  _id: "68621419b706fe52297c08b1",
  title: "search content course by keyword",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529e3265017d942f759319"
],
  queryAdvance: `[
  {
    "$match": {
      "course": "@param:course_id"
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
      "from": "mge-lessons",
      "localField": "id",
      "foreignField": "chapters",
      "pipeline": [
        {
          "$project": {
            "title": 1,
            "slug": 1,
            "lesson_type": 1
          }
        }
      ],
      "as": "lessons"
    }
  },
  {
    "$lookup": {
      "from": "mge-exams",
      "localField": "id",
      "foreignField": "chapters",
      "pipeline": [
        {
          "$project": {
            "title": 1,
            "slug": 1,
            "exam_type": 1
          }
        }
      ],
      "as": "exams"
    }
  },
  {
    "$addFields": {
      // Lọc lessons phù hợp
      "filteredLessons": {
        "$filter": {
          "input": "$lessons",
          "cond": {
            "$regexMatch": {
              "input": "$$this.title",
              "regex": "@param:search_title",
              "options": "i"
            }
          }
        }
      },
      // Lọc exams phù hợp
      "filteredExams": {
        "$filter": {
          "input": "$exams",
          "cond": {
            "$regexMatch": {
              "input": "$$this.title",
              "regex": "@param:search_title",
              "options": "i"
            }
          }
        }
      },
      // Kiểm tra chapter title có match không
      "chapterMatch": {
        "$regexMatch": {
          "input": "$title",
          "regex": "@param:search_title",
          "options": "i"
        }
      }
    }
  },
  {
    "$addFields": {
      // Cập nhật lại lessons và exams với kết quả đã lọc
      "lessons": "$filteredLessons",
      "exams": "$filteredExams",
      // Tính tổng số match để kiểm tra điều kiện lọc
      "totalMatches": {
        "$add": [
          { "$cond": ["$chapterMatch", 1, 0] },
          { "$size": "$filteredLessons" },
          { "$size": "$filteredExams" }
        ]
      }
    }
  },
  {
    "$match": {
      // Lọc bỏ document nếu:
      // - chapterMatch = false AND
      // - lessons array rỗng AND
      // - exams array rỗng
      "totalMatches": { "$gt": 0 }
    }
  },
  {
    "$addFields": {
      // Gom lessons và exams vào 1 list với posttype
      "list": {
        "$concatArrays": [
          // Map lessons với posttype = "lessons"
          {
            "$map": {
              "input": "$lessons",
              "as": "lesson",
              "in": {
                "_id": "$$lesson._id",
                "title": "$$lesson.title",
                "slug": "$$lesson.slug",
                "lesson_type": "$$lesson.lesson_type",
                "posttype": "lessons"
              }
            }
          },
          // Map exams với posttype = "exams"
          {
            "$map": {
              "input": "$exams",
              "as": "exam",
              "in": {
                "_id": "$$exam._id",
                "title": "$$exam.title",
                "slug": "$$exam.slug",
                "lesson_type": "$$exam.lesson_type",
                "posttype": "exams"
              }
            }
          }
        ]
      }
    }
  },
  {
    "$project": {
      // Loại bỏ các field tạm thời và giữ lại list
      "filteredLessons": 0,
      "filteredExams": 0,
      "totalMatches": 0,
      "lessons": 0,
      "exams": 0,
      "chapterMatch":0
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
    "value": "search_title",
    "key": "search_title"
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
    "key": "position",
    "value": "position"
  },
  {
    "key": "course",
    "value": "course"
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
  id: "68621419b706fe52297c08b1",
} as const;

export type SearchContentCourseByKeywordConfig = typeof SEARCH_CONTENT_COURSE_BY_KEYWORD;