export const GET_LIST_COURSES_INSTRUCTOR = {
  _id: "678f0ee84cdfa038d48be082",
  title: "get list course's instructor",
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
      "role": "instructor"
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
                "$profile.course.last_name",
                " ",
                "$profile.course.first_name"
              ]
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
  data: {
  "id": "8b3165b7-cb60-4986-92bc-8b3d3f264e93",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type GetListCoursesInstructorConfig = typeof GET_LIST_COURSES_INSTRUCTOR;