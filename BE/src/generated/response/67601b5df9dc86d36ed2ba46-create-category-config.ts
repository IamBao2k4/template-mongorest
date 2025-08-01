export const CREATE_CATEGORY = {
  _id: "67601b5df9dc86d36ed2ba46",
  title: "Create category",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674835d876462b61b5df90d1"
],
  queryAdvance: `{
  "title":1,
  "slug":1,
  "short_description":0,
  "parent_id":0,
  "social_group":"@params:group_id"
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

export type CreateCategoryConfig = typeof CREATE_CATEGORY;