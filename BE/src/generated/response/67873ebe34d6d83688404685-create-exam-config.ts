export const CREATE_EXAM = {
  _id: "67873ebe34d6d83688404685",
  title: "create exam",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752ad7665017d942f759440"
],
  queryAdvance: `{
  "title": 1,
  "slug": 1,
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
  "questions": [
    {
      "_id": "$id()",
      "title": 0,
      "question_type": 0,
      "category": 0,
      "level": "easy,medium,difficult",
      "answer": [
        {
          "id": "$id()",
          "content": 0,
          "is_correct": 0,
          "position": 0
        }
      ],
      "score": 0
    }
  ],
  "is_final_exam": "false,true"
}
`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: [
  {
    "value": "category",
    "key": "category"
  }
],
  params: [
  {
    "value": "course_id",
    "key": "course_id"
  }
],
  headers: [],
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "chapters",
    "value": "chapters"
  },
  {
    "key": "course",
    "value": "course"
  },
  {
    "key": "exam_type",
    "value": "exam_type"
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
  id: "67873ebe34d6d83688404685",
} as const;

export type CreateExamConfig = typeof CREATE_EXAM;