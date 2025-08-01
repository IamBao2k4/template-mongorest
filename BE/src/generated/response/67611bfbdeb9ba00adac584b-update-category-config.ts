export const UPDATE_CATEGORY = {
  _id: "67611bfbdeb9ba00adac584b",
  title: "Update Category",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674835d876462b61b5df90d1"
],
  queryAdvance: `{
  "title": 0,
  "slug": 0,
  "short_description": 0,
  "parent_id": 0,
  "position":0
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type UpdateCategoryConfig = typeof UPDATE_CATEGORY;