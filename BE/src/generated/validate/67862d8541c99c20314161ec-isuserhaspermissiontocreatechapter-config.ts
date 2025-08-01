export const ISUSERHASPERMISSIONTOCREATECHAPTER = {
  _id: "67862d8541c99c20314161ec",
  title: "is-user-has-permission-to-create-chapter",
  entity: [
  "67853fcd4c9747dfaeed5f84"
],
  data: {
  "id": "9580212b-ae22-4a1a-98e4-d642edf229b9",
  "rules": [],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"$expr":true}]}`,
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
      "can_create_chapter_in_course": {
        "$gt": [
          {
            "$size": {
              "$setIntersection": [
                "$role",
                "$course_info.permissions.course_chapter_create"
              ]
            }
          },
          0
        ]
      }
    }
  },
  { "$match": { "can_create_chapter_in_course": true } }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserhaspermissiontocreatechapterConfig = typeof ISUSERHASPERMISSIONTOCREATECHAPTER;