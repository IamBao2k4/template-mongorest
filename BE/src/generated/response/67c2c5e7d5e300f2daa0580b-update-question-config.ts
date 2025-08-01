export const UPDATE_QUESTION = {
  _id: "67c2c5e7d5e300f2daa0580b",
  title: "update question",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752b83a65017d942f759501"
],
  queryAdvance: `{
  "title":0,
  "question_type":"multiple_choice,check_box,true_false,fill_in_blank",
  "answer": [{
    "id": "$id()",
    "content":0,
    "is_correct":0,
    "position":0
  }],
  "level":"easy,medium,difficult",
  "category":0,
  "score":0
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type UpdateQuestionConfig = typeof UPDATE_QUESTION;