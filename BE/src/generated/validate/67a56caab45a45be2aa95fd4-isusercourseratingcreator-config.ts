export const ISUSERCOURSERATINGCREATOR = {
  _id: "67a56caab45a45be2aa95fd4",
  title: "is-user-course-rating-creator",
  entity: [
  "6780ca7ca78c4e63fee5ab77"
],
  data: {
  "id": "5813c2bd-84e1-42e8-9ad8-da795a7a61c7",
  "rules": [
    {
      "id": "c788e3dc-1eb4-4bf7-a9d9-6ae4874966ad",
      "field": "mge-user-rating._id",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-user-rating._id:param._id"
    },
    {
      "id": "7e4fb3dd-8e5b-48fd-80e0-e0ca28f3f01e",
      "field": "mge-user-rating.created_by",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-user-rating.created_by:jwt.user@id"
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"mge-user-rating._id":"$mge-user-rating._id:param._id"},{"mge-user-rating.created_by":"$mge-user-rating.created_by:jwt.user@id"}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsusercourseratingcreatorConfig = typeof ISUSERCOURSERATINGCREATOR;