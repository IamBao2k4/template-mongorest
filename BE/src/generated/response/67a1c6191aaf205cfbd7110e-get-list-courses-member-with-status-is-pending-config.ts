export const GET_LIST_COURSES_MEMBER_WITH_STATUS_IS_PENDING = {
  _id: "67a1c6191aaf205cfbd7110e",
  title: "get list course's member with status is pending",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67853fcd4c9747dfaeed5f84"
],
  queryAdvance: `[
  {
    "$match": {
      "course": "@param:course_id",
      "status": "pending"
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
              "$concat": [
                {
                  "$ifNull": ["$profile.last_name", ""]
                },
                " ",
                {
                  "$ifNull": ["$profile.first_name", ""]
                }
              ]
            }
          }
        },
        {
          "$unwind": {
            "path": "$user",
            "preserveNullAndEmptyArrays": true
          }
        },
        {
          "$project": {
            "_id": "$user",
            "full_name": 1,
            "featured_image": "$profile.course.featured_image",
            "email":1
          }
        }
      ],
      "as": "user"
    }
  },
  {
    "$unwind": {
      "path": "$user",
      "preserveNullAndEmptyArrays": true
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
              "input": "$user.full_name",
              "regex": "@param:title",
              "options": "i"
            }
          },
          {
            "$regexMatch": {
              "input": "$user.email",
              "regex": "@param:title",
              "options": "i"
            }
          }
        ]
      }
    }
  },
  {
    "$addFields": {
      "user": {
        "$cond": [
          {
            "$ne": ["$user", null]
          },
          ["$user"],
          []
        ]
      }
    }
  },
  {
    "$sort": {
      "created_at": "@sort_param:created_at"
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
    "value": "course",
    "key": "course"
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
    "value": "course_id",
    "key": "course_id"
  },
  {
    "value": "sort",
    "key": "sort"
  },
  {
    "value": "title",
    "key": "title"
  },
  {
    "value": "created_at",
    "key": "created_at"
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  data: {
  "id": "50d945f4-da9a-4087-8836-ced0fdb133a3",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [
  {
    "key": "course",
    "value": "course"
  },
  {
    "key": "user",
    "value": "user"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "role",
    "value": "role"
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
  id: "67a1c6191aaf205cfbd7110e",
} as const;

export type GetListCoursesMemberWithStatusIsPendingConfig = typeof GET_LIST_COURSES_MEMBER_WITH_STATUS_IS_PENDING;