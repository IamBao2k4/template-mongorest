export const ISUSERSTATUSPENDING = {
  _id: "67da453bbab79a925cd2fac0",
  title: "is-user-status-pending",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "4381e58b-62d5-4303-acf7-251cb1ac4191",
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
      "id": { "$toString": "$_id" }
    }
  },
  {
    "$match": {
      "social_group": "@param:group_id",
      "status": "pending",
      "$or": [{ "id": "@param:_id" }, { "user": "@body:user" }]
    }
  }
]
`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserstatuspendingConfig = typeof ISUSERSTATUSPENDING;