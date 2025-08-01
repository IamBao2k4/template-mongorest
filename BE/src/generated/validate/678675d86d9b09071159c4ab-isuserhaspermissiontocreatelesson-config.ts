export const ISUSERHASPERMISSIONTOCREATELESSON = {
  _id: "678675d86d9b09071159c4ab",
  title: "is-user-has-permission-to-create-lesson",
  entity: [
  "67853fcd4c9747dfaeed5f84"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
  advance: `[
  {
    "$match": {
      "user": "@jwt:user.id",
      "course": "@params:course_id"
    }
  },
  {
    "$addFields": {
      "course": {
        "$map": {
          "input": "$course",
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
      "from": "mge-courses",
      "localField": "course",
      "foreignField": "_id",
      "as": "group_info"
    }
  },
  {
    "$addFields": {
      "group_info": { "$arrayElemAt": ["$group_info", 0] }
    }
  },
  {
    "$addFields": {
      "can_create_lesson_in_course": {
        "$gt": [
          { 
            "$size": {
              "$setIntersection": [
                "$role", 
                "$group_info.permissions.course_lesson_create"
              ]
            }
          },
          0
        ]
      }
    }
  },
  { "$match": { "can_create_lesson_in_course": true } }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserhaspermissiontocreatelessonConfig = typeof ISUSERHASPERMISSIONTOCREATELESSON;