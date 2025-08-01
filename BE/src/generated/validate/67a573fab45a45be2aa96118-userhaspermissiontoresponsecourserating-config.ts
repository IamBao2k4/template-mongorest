export const USERHASPERMISSIONTORESPONSECOURSERATING = {
  _id: "67a573fab45a45be2aa96118",
  title: "user-has-permission-to-response-course-rating",
  entity: [
  "67853fcd4c9747dfaeed5f84"
],
  data: {
  "id": "d93f0b5a-9d50-4463-aa47-15c510c47cb9",
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
      "can_response_course_rating_in_course": {
        "$gt": [
          {
            "$size": {
              "$setIntersection": [
                "$role",
                "$course_info.permissions.course_rating_response"
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
      "can_response_course_rating_in_course": true
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type UserhaspermissiontoresponsecourseratingConfig = typeof USERHASPERMISSIONTORESPONSECOURSERATING;