export const UPDATE_EXAM = {
  _id: "67888251918452081cc5b163",
  title: "update exam",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752ad7665017d942f759440"
],
  queryAdvance: `{
  "title": 0,
  "slug": 0,
  "chapters": 0,
  "course": "@param:course_id",
  "exam_type": "multiple_choice,essay",
  "essay_content": 0,
  "essay_files": 0,
  "testing_time": 0,
  "test_opening_time": 0,
  "test_closing_time": 0,
  "member_retries_allowed": 0,
  "minimum_passing_score": 0,
  "show_answer": "true,false",
  "shuffle_question": "true,false",
  "shuffle_answer": "true,false",
  "return_previous_question": "true,false",
  "score_scale": "10,100,100%",
  "time_limit_mode": "false,true",
  "position": 0,
  "questions": [
    {
      "_id": 0,
      "title": 0,
      "question_type": 0,
      "category":0,
      "level":0,
      "answer": [
        {
          "id": 0,
          "content": 0,
          "is_correct": 0,
          "position": 0
        }
      ],
      "score": 0
    }
  ],
  "is_final_exam": 0
}
`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "course_id",
    "key": "course_id"
  }
],
  headers: [],
  data: {
  "id": "e5ac069c-e82e-47c9-8361-34603318d774",
  "rules": [],
  "combinator": "and",
  "not": false
},
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
  id: "67888251918452081cc5b163",
} as const;

export type UpdateExamConfig = typeof UPDATE_EXAM;