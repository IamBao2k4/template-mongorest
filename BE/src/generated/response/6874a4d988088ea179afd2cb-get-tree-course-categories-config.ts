export const GET_TREE_COURSE_CATEGORIES = {
  _id: "6874a4d988088ea179afd2cb",
  title: "Get tree course categories",
  method: "get-tree",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529b1465017d942f7592b5"
],
  queryAdvance: `{}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "slug",
    "value": "slug"
  },
  {
    "key": "parent_id",
    "value": "parent_id"
  },
  {
    "key": "featured_image",
    "value": "featured_image"
  },
  {
    "key": "_id",
    "value": "_id"
  },
  {
    "key": "created_by",
    "value": "created_by"
  },
  {
    "key": "updated_by",
    "value": "updated_by"
  },
  {
    "key": "created_at",
    "value": "created_at"
  },
  {
    "key": "updated_at",
    "value": "updated_at"
  }
],
  id: "6874a4d988088ea179afd2cb",
} as const;

export type GetTreeCourseCategoriesConfig = typeof GET_TREE_COURSE_CATEGORIES;