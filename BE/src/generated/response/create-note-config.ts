export const CREATE_NOTE = {
  _id: "67a414ef03679925e42bc019",
  title: "create note",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67a32ec603679925e42bb2cb"
],
  queryAdvance: `{
  "content": 1,
  "timestamp": 1,
  "lesson": "@param:lesson_id"
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  data: {
  "id": "9f4489a1-66b0-48e4-aeae-1eff63f4f3bf",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type CreateNoteConfig = typeof CREATE_NOTE;