export const GET_LIST_COURSES_MEMBER = {
  _id: "67a1c5731aaf205cfbd710ba",
  title: "get list course's member",
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
      "status": "joined"
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "user",
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
            "email": 1,
            "department":"$profile.course.department",
            "team":"$profile.course.team",
            "job_position":"$profile.course.job_position"
          }
        }
      ],
      "as": "user"
    }
  },
  {
    "$match": {
      "$expr": {
        "$cond": {
          "if": {
            "$ne": ["@param:role[]", null]
          },
          "then": {
            "$eq": ["$role", "@param:role[]"]
          },
          "else": true
        }
      }
    }
  },
  {
    "$addFields": {
      "role_sort_order": {
        "$switch": {
          "branches": [
            {
              "case": {
                "$eq": ["$role", "instructor"]
              },
              "then": 1
            },
            {
              "case": {
                "$eq": ["$role", "assistant"]
              },
              "then": 2
            },
            {
              "case": {
                "$eq": ["$role", "member"]
              },
              "then": 3
            }
          ],
          "default": 4
        }
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
      "role_sort_order": 1,
      "created_at": "@sort_param:created_at"
    }
  },
  {
    "$project": {
      "role_sort_order": 0
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
    "value": "role",
    "key": "role"
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
  },
  {
    "value": "role[]",
    "key": "role[]"
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
  id: "67a1c5731aaf205cfbd710ba",
} as const;

export type GetListCoursesMemberConfig = typeof GET_LIST_COURSES_MEMBER;