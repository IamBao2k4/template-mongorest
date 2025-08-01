export const ISUSERHASPERMISSIONTOMANAGECOURSEMEMBER = {
  _id: "67a1cd3c1aaf205cfbd7128d",
  title: "is-user-has-permission-to-manage-course-member",
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
      "course_info": {
        "$arrayElemAt": [
          "$course_info",
          0
        ]
      }
    }
  },
  {
    "$addFields": {
      "can_manage_member_in_course": {
        "$gt": [
          {
            "$size": {
              "$setIntersection": [
                "$role",
                "$course_info.permissions.course_member_manage"
              ]
            }
          },
          0
        ]
      }
    }
  },
  {
    "$match": {
      "can_manage_member_in_course": true
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserhaspermissiontomanagecoursememberConfig = typeof ISUSERHASPERMISSIONTOMANAGECOURSEMEMBER;