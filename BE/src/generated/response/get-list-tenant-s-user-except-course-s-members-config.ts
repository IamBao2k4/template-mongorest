export const GET_LIST_TENANT_S_USER_EXCEPT_COURSE_S_MEMBERS = {
  _id: "67f6388ca9febf9a7d3d3262",
  title: "get list tenant's user except course's members",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67aad740a67aaa1951ca64b0"
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
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$addFields": {
      "profile.full_name": {
        "$concat": [
          {
            "$ifNull": [
              "$profile.first_name",
              ""
            ]
          },
          " ",
          {
            "$ifNull": [
              "$profile.last_name",
              ""
            ]
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
    "$addFields": {
      "profile.social._id": "$user"
    }
  },
  {
    "$addFields": {
      "profile.course._id": "$user"
    }
  },
  {
    "$lookup": {
      "from": "mge-course-member",
      "localField": "user",
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "course": "@param:course_id",
            "$or": [
              {
                "status": "joined"
              },
              {
                "status": "pending"
              }
            ]
          }
        }
      ],
      "as": "matchedMembers"
    }
  },
  {
    "$match": {
      "matchedMembers": {
        "$eq": []
      }
    }
  },
  {
    "$project": {
      "_id": "$profile.course._id",
      "full_name": "$profile.full_name",
      "featured_image": "$profile.course.featured_image",
      "description": "$profile.course.description",
      "phone": "$profile.course.phone",
      "birthday": "$profile.course.birthday",
      "email": 1
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
              "input": "$full_name",
              "regex": "@param:title",
              "options": "i"
            }
          },
          {
            "$regexMatch": {
              "input": "$email",
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
    "value": "course_id",
    "key": "course_id"
  },
  {
    "value": "title",
    "key": "title"
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
  "id": "53c35728-b18e-425e-8db8-b45198761709",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [
  {
    "key": "email",
    "value": "email"
  },
  {
    "key": "user",
    "value": "user"
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
  id: "67f6388ca9febf9a7d3d3262",
} as const;

export type GetListTenantsUserExceptCoursesMembersConfig = typeof GET_LIST_TENANT_S_USER_EXCEPT_COURSE_S_MEMBERS;