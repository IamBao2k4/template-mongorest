export const ISUSERDISCUSSIONCREATOR = {
  _id: "678e18b49cb7777fb689cca7",
  title: "is-user-discussion-creator",
  entity: [
  "6752bcd265017d942f759541"
],
  data: {
  "id": "e984fd07-c108-4bd1-b8e7-9b0e3cad7f94",
  "rules": [
    {
      "id": "ac151bb2-3c85-47a0-bdfa-dee5c08cfb4f",
      "field": "mge-discussions._id",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-discussions._id:param._id"
    },
    {
      "id": "3260af95-65c3-4884-9312-39083bb52937",
      "field": "mge-discussions.created_by",
      "operator": "=",
      "valueSource": "value",
      "value": "$mge-discussions.created_by:jwt.user@id"
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"mge-discussions._id":"$mge-discussions._id:param._id"},{"mge-discussions.created_by":"$mge-discussions.created_by:jwt.user@id"}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserdiscussioncreatorConfig = typeof ISUSERDISCUSSIONCREATOR;