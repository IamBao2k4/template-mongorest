export const ISUSERHASPERMISSIONTOMANAGEEXAM = {
  _id: "67888d0893cfedfbb508c18b",
  title: "is-user-has-permission-to-manage-exam",
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
      "as": "course_info"
    }
  },
  {
    "$addFields": {
      "course_info": { "$arrayElemAt": ["$course_info", 0] }
    }
  },
  {
    "$addFields": {
      "can_manage_exam_in_course": {
        "$gt": [
          { 
            "$size": {
              "$setIntersection": [
                "$role", 
                "$course_info.permissions.course_exam_manage"
              ]
            }
          },
          0
        ]
      }
    }
  },
  { "$match": { "can_manage_exam_in_course": true } }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserhaspermissiontomanageexamConfig = typeof ISUSERHASPERMISSIONTOMANAGEEXAM;