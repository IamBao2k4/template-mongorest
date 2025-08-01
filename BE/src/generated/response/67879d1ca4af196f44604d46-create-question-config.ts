export const CREATE_QUESTION = {
  _id: "67879d1ca4af196f44604d46",
  title: "create question",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752b83a65017d942f759501"
],
  queryAdvance: `{
  "title":1,
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
  data: {
  "id": "2cd8a1c7-7bef-4d70-b26c-c843a88818c0",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type CreateQuestionConfig = typeof CREATE_QUESTION;