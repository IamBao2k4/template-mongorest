export const ISFINALEXAMFALSE = {
  _id: "680f37537cff9ff0d0ec3d24",
  title: "is-final-exam-false",
  entity: [
  "6752cbec65017d942f7595dc"
],
  data: {
  "id": "791457d0-4624-403c-9951-42e550ee2bbc",
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
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match":{
      "tenant_id":"@header:x-tenant-id",
      "id":"@param:_id"
    }
  },
  {
    "$addFields": {
      "exam": {
        "$map": {
          "input": "$exam",
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
      "from": "mge-exams",
      "localField": "exam",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "is_final_exam":false
          }
        }
      ],
      "as": "is_final_exam"
    }
  },
  {
    "$match": {
      "is_final_exam": { "$ne": [] }
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsfinalexamfalseConfig = typeof ISFINALEXAMFALSE;