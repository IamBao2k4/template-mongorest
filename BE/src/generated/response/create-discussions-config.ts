export const CREATE_DISCUSSIONS = {
  _id: "678886a8afaa57dce5b652f4",
  title: "create discussions",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752bcd265017d942f759541"
],
  queryAdvance: `{
  "content":1,
  "attachments":0,
  "course":"@param:course_id",
  "topic":"@param:topic"
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  data: {
  "id": "65049315-227b-4a0b-9a13-bf2aef83f81f",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type CreateDiscussionsConfig = typeof CREATE_DISCUSSIONS;