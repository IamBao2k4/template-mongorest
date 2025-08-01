export const UPDATE_TOPIC = {
  _id: "678cbc49163e79d8529b4c7b",
  title: "update topic",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752bd9c65017d942f75955a"
],
  queryAdvance: `{
  "title": 0
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  data: {
  "id": "636db96e-2ba6-4ced-920d-b0d8202e25b8",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type UpdateTopicConfig = typeof UPDATE_TOPIC;