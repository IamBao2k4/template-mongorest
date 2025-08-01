export const SUBMIT_ESSAY_EXAM = {
  _id: "685e0261b706fe522979fbcf",
  title: "submit essay exam",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752cbec65017d942f7595dc"
],
  queryAdvance: `{
  "exam": "@param:exam_id",
  "status": "finished",
  "user_essay_file":0,
  "user_essay_content":0
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
    "key": "exam",
    "value": "exam"
  },
  {
    "key": "status",
    "value": "status"
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
  id: "685e0261b706fe522979fbcf",
} as const;

export type SubmitEssayExamConfig = typeof SUBMIT_ESSAY_EXAM;