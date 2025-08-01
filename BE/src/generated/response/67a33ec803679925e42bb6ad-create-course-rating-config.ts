export const CREATE_COURSE_RATING = {
  _id: "67a33ec803679925e42bb6ad",
  title: "create course rating",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6780ca7ca78c4e63fee5ab77"
],
  queryAdvance: `{
  "rating_score":"1,2,3,4,5",
  "content":0,
  "images":0,
  "course":"@param:course_id"
}`,
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
  restricted: [],
  id: "",
} as const;

export type CreateCourseRatingConfig = typeof CREATE_COURSE_RATING;