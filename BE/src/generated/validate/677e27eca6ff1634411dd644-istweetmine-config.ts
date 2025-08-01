export const ISTWEETMINE = {
  _id: "677e27eca6ff1634411dd644",
  title: "is-tweet-mine",
  entity: [
  "67b6a286606da18e6c1976f1"
],
  data: {
  "id": "b944383d-86b0-4514-b973-05d06acc8916",
  "rules": [
    {
      "id": "a087cd7a-d376-46b3-931b-90c35c1a7307",
      "field": "mge-tweet._id",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-tweet._id:param._id"
    },
    {
      "id": "82ecd22b-fc98-438c-b4af-1a990194b5ee",
      "field": "mge-tweet.created_by",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-tweet.created_by:jwt.user@id"
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"mge-tweet._id":"$mge-tweet._id:param._id"},{"mge-tweet.created_by":"$mge-tweet.created_by:jwt.user@id"}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
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

export type IstweetmineConfig = typeof ISTWEETMINE;