export const ISGROUPINTENANT = {
  _id: "67d276ceb6962f9420f4114a",
  title: "is-group-in-tenant",
  entity: [
  "6747ef07c47463d88f8c5ab1"
],
  data: {
  "id": "9bb30300-aab9-43ae-8d56-f1608670268e",
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
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match":{
      "id":"@param:group_id",
      "tenant_id":"@header:x-tenant-id"
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsgroupintenantConfig = typeof ISGROUPINTENANT;