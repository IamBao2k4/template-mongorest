export const UPDATE_COURSE_RATING = {
  _id: "67a48ba8b45a45be2aa955b3",
  title: "update course rating",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6780ca7ca78c4e63fee5ab77"
],
  queryAdvance: `{
  "rating_score": "1,2,3,4,5",
  "content": 0,
  "images": 0
  }`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  data: {
  "id": "ec5fdfbd-87fc-4618-b4a4-c1fb8c316964",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type UpdateCourseRatingConfig = typeof UPDATE_COURSE_RATING;