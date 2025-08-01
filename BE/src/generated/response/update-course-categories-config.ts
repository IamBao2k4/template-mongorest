export const UPDATE_COURSE_CATEGORIES = {
  _id: "6854ebceced3311bbefc6c2a",
  title: "update course categories",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529b1465017d942f7592b5"
],
  queryAdvance: `{
  "title":0,
  "slug":0,
  "short_description":0,
  "featured_image":0,
  "parent_id":0,
  "position":0
}`,
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
  id: "6854ebceced3311bbefc6c2a",
} as const;

export type UpdateCourseCategoriesConfig = typeof UPDATE_COURSE_CATEGORIES;