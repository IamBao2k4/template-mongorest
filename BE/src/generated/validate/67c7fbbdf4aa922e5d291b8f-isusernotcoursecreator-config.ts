export const ISUSERNOTCOURSECREATOR = {
  _id: "67c7fbbdf4aa922e5d291b8f",
  title: "is-user-not-course-creator",
  entity: [
  "67529c0665017d942f7592d1"
],
  data: {
  "id": "08b10e3c-1379-4201-8eae-420e120b89e6",
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
    "$addFields": {
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "_id": "@param:course_id",
      "created_by": {
        "$ne": "@jwt:user.id"
      }
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsusernotcoursecreatorConfig = typeof ISUSERNOTCOURSECREATOR;