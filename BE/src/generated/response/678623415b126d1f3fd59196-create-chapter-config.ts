export const CREATE_CHAPTER = {
  _id: "678623415b126d1f3fd59196",
  title: "create chapter",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529e3265017d942f759319"
],
  queryAdvance: `{
  "title":1,
  "slug":1,
  "position":0,
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
  restricted: [],
  id: "",
} as const;

export type CreateChapterConfig = typeof CREATE_CHAPTER;