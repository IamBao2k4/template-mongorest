export const CREATE_LEARNING_PATH = {
  _id: "680632a4beb73c2d42c981d7",
  title: "create learning path",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "68062af5beb73c2d42c97dc5"
],
  queryAdvance: `{
  "title": 1,
  "slug": 1,
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
  id: "680632a4beb73c2d42c981d7",
} as const;

export type CreateLearningPathConfig = typeof CREATE_LEARNING_PATH;