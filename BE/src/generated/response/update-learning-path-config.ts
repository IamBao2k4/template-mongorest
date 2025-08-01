export const UPDATE_LEARNING_PATH = {
  _id: "6854fb22ced3311bbefc6cd6",
  title: "update learning path",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "68062af5beb73c2d42c97dc5"
],
  queryAdvance: `{
  "title": 0,
  "slug": 0,
  "department": 0,
  "team": 0,
  "job_position": 0,
  "featured_image": 0,
  "course": 0
}
`,
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
  id: "6854fb22ced3311bbefc6cd6",
} as const;

export type UpdateLearningPathConfig = typeof UPDATE_LEARNING_PATH;