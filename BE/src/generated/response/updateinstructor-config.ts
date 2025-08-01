export const UPDATEINSTRUCTOR = {
  _id: "67a03397545d084698a9ac2e",
  title: "update-instructor",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67853fcd4c9747dfaeed5f84"
],
  queryAdvance: `{
  "email": 0,
  "username": 0,
  "phone": 0,
  "full_name": 0,
  "first_name": 0,
  "last_name": 0,
  "birthday": 0,
  "nickname": 0
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "key": "",
    "value": "course_id",
    "description": ""
  },
  {
    "key": "",
    "value": "",
    "description": ""
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type UpdateinstructorConfig = typeof UPDATEINSTRUCTOR;