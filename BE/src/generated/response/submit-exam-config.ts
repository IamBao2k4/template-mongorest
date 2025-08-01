export const SUBMIT_EXAM = {
  _id: "67a30c823939e2a74e49804b",
  title: "submit exam",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752cbec65017d942f7595dc"
],
  queryAdvance: `{
  "exam": "@param:exam_id",
  "status": "doing"
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "exam_id",
    "key": "exam_id"
  }
],
  headers: [],
  restricted: [
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

export type SubmitExamConfig = typeof SUBMIT_EXAM;