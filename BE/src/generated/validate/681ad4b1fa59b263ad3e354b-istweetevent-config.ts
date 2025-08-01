export const ISTWEETEVENT = {
  _id: "681ad4b1fa59b263ad3e354b",
  title: "is-tweet-event",
  entity: [
  "681ad170fa59b263ad3e2fa4"
],
  data: {
  "id": "440477cb-97a1-4dd4-bb03-df633f6063a9",
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
    "$match":{
      "_id":"@param:_id"
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "_id",
    "key": "_id"
  },
  {
    "value": "id",
    "key": "id"
  }
],
} as const;

export type IstweeteventConfig = typeof ISTWEETEVENT;