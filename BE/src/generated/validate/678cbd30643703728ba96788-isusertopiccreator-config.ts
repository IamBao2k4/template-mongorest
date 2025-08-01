export const ISUSERTOPICCREATOR = {
  _id: "678cbd30643703728ba96788",
  title: "is-user-topic-creator",
  entity: [
  "6752bd9c65017d942f75955a"
],
  data: {
  "id": "468abd45-393d-4e73-bd1a-cc12e4e6e0b9",
  "rules": [
    {
      "id": "061cbbd1-62ba-4466-a3c8-d88edbdd2ea7",
      "field": "mge-topics._id",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-topics._id:param._id"
    },
    {
      "id": "c180adce-0117-49be-a011-78db85594ccb",
      "field": "mge-topics.created_by",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-topics.created_by:jwt.user@id"
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"mge-topics._id":"$mge-topics._id:param._id"},{"mge-topics.created_by":"$mge-topics.created_by:jwt.user@id"}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsusertopiccreatorConfig = typeof ISUSERTOPICCREATOR;