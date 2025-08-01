export const ISUSERHASPERMISSIONTOCREATEEXAM = {
  _id: "6787401334d6d836884046f4",
  title: "is-user-has-permission-to-create-exam",
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
      "can_create_course_lesson": {
        "$gt": [
          {
            "$size": {
              "$filter": {
                "input": { "$ifNull": ["$group_info.permissions.course_lesson_create", []] },
                "as": "p",
                "cond": { "$in": ["$$p", "$role"] }
              }
            }
          },
          0
        ]
      }
    }
  },
    {
    "$match": {
      "can_create_course_lesson": true
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserhaspermissiontocreateexamConfig = typeof ISUSERHASPERMISSIONTOCREATEEXAM;