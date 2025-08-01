export const USERJOINEDCOURSE = {
  _id: "67862ea941c99c2031416254",
  title: "user-joined-course",
  entity: [
  "67853fcd4c9747dfaeed5f84"
],
  data: {
  "id": "26d7c8e1-b1fd-4170-86e7-65b80ed12737",
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
      "status": "joined",
      "tenant_id":"@header:x-tenant-id",
      "$or": [
        {
          "course": "@param:course_id"
        },
        {
          "course": "@param:_id"
        }
      ]
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
      "as": "course_data",
      "pipeline": [
        {
          "$match": {
            "status": "active"
          }
        }
      ]
    }
  },
  {
    "$match": {
      "course_data": {
        "$ne": []
      }
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "course_id",
    "key": "course_id"
  },
  {
    "value": "_id",
    "key": "_id"
  }
],
} as const;

export type UserjoinedcourseConfig = typeof USERJOINEDCOURSE;