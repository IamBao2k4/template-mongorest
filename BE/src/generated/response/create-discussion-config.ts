export const CREATE_DISCUSSION = {
  _id: "678dd6ebd799d77c03c6d4c8",
  title: "create discussion",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752bcd265017d942f759541"
],
  queryAdvance: `{
  "title":1,
  "content": 1,
  "attachments": 0,
  "course": "@param:course_id"
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
  "id": "0a81e5da-54e9-49ae-b277-7315de39bd18",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type CreateDiscussionConfig = typeof CREATE_DISCUSSION;