export const UPDATE_EXAM_SUBMISSION = {
  _id: "67c91c70f4aa922e5d2a01a5",
  title: "update exam submission",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752cbec65017d942f7595dc"
],
  queryAdvance: `{
  "user_answer": [
    {
      "question_id": 0,
      "multiple_choice_answer": 0,
      "essay_answer_text": 0,
      "essay_answer_file": 0
    }
  ],
  "status":"finished"
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
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

export type UpdateExamSubmissionConfig = typeof UPDATE_EXAM_SUBMISSION;