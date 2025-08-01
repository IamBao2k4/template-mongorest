export const UPDATE_DISCUSSION = {
  _id: "678dfdc0c9f11199898e4348",
  title: "update discussion",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752bcd265017d942f759541"
],
  queryAdvance: `{
  "title": 0,
  "content": 0,
  "attachments": 0
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  data: {
  "id": "ef31c559-bb04-47ea-a7d4-5f4cb8fcc470",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type UpdateDiscussionConfig = typeof UPDATE_DISCUSSION;