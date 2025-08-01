export const ISUSERTWEETCREATOR = {
  _id: "67cab38631eb23d2750289a5",
  title: "is-user-tweet-creator",
  entity: [
  "67c66d92cb2d3f0de04bccc1"
],
  data: {
  "id": "94170de8-b8c9-450a-a391-84eee5b3d768",
  "rules": [
    {
      "id": "d4377297-6088-4d05-a8db-6ae53ef3bdae",
      "field": "mge-listing-tweet._id",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-listing-tweet._id:param._id"
    },
    {
      "id": "24ebd4d7-f705-4f9d-ac6b-32d3fa382c93",
      "field": "mge-listing-tweet.created_by",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-listing-tweet.created_by:jwt.user@id"
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"mge-listing-tweet._id":"$mge-listing-tweet._id:param._id"},{"mge-listing-tweet.created_by":"$mge-listing-tweet.created_by:jwt.user@id"}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsusertweetcreatorConfig = typeof ISUSERTWEETCREATOR;