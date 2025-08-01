export const GET_LIST_NOTE = {
  _id: "67a5901eb45a45be2aa96a3c",
  title: "get list note",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67a32ec603679925e42bb2cb"
],
  queryAdvance: `[
  {
    "$match": {
      "created_by": "@jwt:user.id",
      "lesson":"@param:lesson_id",
      "tenant_id":"@header:x-tenant-id"
    }
  },
  {
    "$addFields": {
      "lesson": {
        "$toObjectId": "$lesson"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-lessons",
      "localField": "lesson",
      "foreignField": "_id",
      "pipeline": [
        {
          "$match": {
            "course": "@param:course_id"
          }
        },
        {
          "$addFields": {
            "chapters": {
              "$map": {
                "input": "$chapters",
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
            "pipeline": [
              {
                "$project": {
                  "title": 1
                }
              }
            ],
            "as": "chapter_info"
          }
        },
        {
          "$project": {
            "title": 1,
            "chapter_info": 1
          }
        }
      ],
      "as": "lesson_info"
    }
  },
  {
    "$match": {
      "lesson_info": {
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
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListNoteConfig = typeof GET_LIST_NOTE;