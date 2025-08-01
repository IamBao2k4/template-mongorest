export const CREATE_CATEGORY = {
  _id: "67c92a1df4aa922e5d2a1146",
  title: "create category",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c6b37acb2d3f0de04c762e"
],
  queryAdvance: `{
  "title": 1,
  "slug":1,
  "short_description": 0,
  "parent_id": 0
}`,
  categories: [],
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type CreateCategoryConfig = typeof CREATE_CATEGORY;