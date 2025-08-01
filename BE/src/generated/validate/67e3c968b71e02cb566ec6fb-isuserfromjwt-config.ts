export const ISUSERFROMJWT = {
  _id: "67e3c968b71e02cb566ec6fb",
  title: "is-user-from-jwt",
  entity: [
  "6749933810905d9ddbd0104b"
],
  data: {
  "id": "e4a7eba8-59db-4702-abcf-25a26f93d8b7",
  "rules": [
    {
      "id": "557d5416-93be-4b0a-9f1c-9963a55faddf",
      "field": "user._id",
      "operator": "=",
      "valueSource": "value",
      "value": "$user._id:jwt.user@id"
    },
    {
      "id": "ce60d937-de06-42c9-acd9-276af7cbae8f",
      "field": "user._id",
      "operator": "=",
      "valueSource": "value",
      "value": "$user._id:param.user_id"
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"user._id":"$user._id:jwt.user@id"},{"user._id":"$user._id:param.user_id"}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserfromjwtConfig = typeof ISUSERFROMJWT;