export const ISUSERQUESTIONCREATOR = {
  _id: "67bd40c02692eef9b7ac3aef",
  title: "is-user-question-creator",
  entity: [
  "6752b83a65017d942f759501"
],
  data: {
  "id": "f21fb7f7-aa09-477b-bdd0-7360b87433e8",
  "rules": [
    {
      "id": "654981e8-1d13-45b3-99dd-06f542fd3bd9",
      "field": "mge-questions._id",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-questions._id:param._id"
    },
    {
      "id": "2065e37a-910f-4e8d-b5b8-d8a416993337",
      "field": "mge-questions.created_by",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-questions.created_by:jwt.user@id"
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"mge-questions._id":"$mge-questions._id:param._id"},{"mge-questions.created_by":"$mge-questions.created_by:jwt.user@id"}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserquestioncreatorConfig = typeof ISUSERQUESTIONCREATOR;