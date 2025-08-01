export const ISTHEAUTHOROFTWEET = {
  _id: "6772c07401dfc8643f077e14",
  title: "is-the-author-of-tweet",
  entity: [
  "67b6a286606da18e6c1976f1"
],
  data: {
  "id": "2649953a-0b4d-4c40-ae71-dfd71bf5d2d1",
  "rules": [],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"$expr":true}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
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
      "created_by": "@jwt:user.id",
      "_id": "@param:_id"
    }
  }
]
`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "_id",
    "key": "_id"
  }
],
} as const;

export type IstheauthoroftweetConfig = typeof ISTHEAUTHOROFTWEET;