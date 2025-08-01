export const DELETE_LEARNING_PATH = {
  _id: "680afea3ea7aac56e895036c",
  title: "delete learning path",
  method: "delete",
  locale: null,
  locale_id: null,
  outputEntity: [
  "68062af5beb73c2d42c97dc5"
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
  id: "",
} as const;

export type DeleteLearningPathConfig = typeof DELETE_LEARNING_PATH;