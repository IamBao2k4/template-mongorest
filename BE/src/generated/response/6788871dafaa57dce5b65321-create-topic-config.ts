export const CREATE_TOPIC = {
  _id: "6788871dafaa57dce5b65321",
  title: "create topic",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752bd9c65017d942f75955a"
],
  queryAdvance: `{
  "title": 1,
  "course": "@param:course_id",
  "content":0
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "course_id",
    "key": "course_id"
  }
],
  headers: [],
  data: {
  "id": "4f5915fd-c421-4134-afd6-ce38b9810a4c",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type CreateTopicConfig = typeof CREATE_TOPIC;