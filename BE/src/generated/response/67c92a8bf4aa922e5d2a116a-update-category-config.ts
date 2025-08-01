export const UPDATE_CATEGORY = {
  _id: "67c92a8bf4aa922e5d2a116a",
  title: "update category",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c6b37acb2d3f0de04c762e"
],
  queryAdvance: `{
  "title": 0,
  "slug":0,
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

export type UpdateCategoryConfig = typeof UPDATE_CATEGORY;