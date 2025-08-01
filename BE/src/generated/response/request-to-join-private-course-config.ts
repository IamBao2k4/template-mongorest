export const REQUEST_TO_JOIN_PRIVATE_COURSE = {
  _id: "67863da36d9b09071159c355",
  title: "request to join private course",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67853fcd4c9747dfaeed5f84"
],
  queryAdvance: `{
  "user": "@jwt:user.id",
  "course": "@param:course_id",
  "status": "pending",
  "role":"member"
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

export type RequestToJoinPrivateCourseConfig = typeof REQUEST_TO_JOIN_PRIVATE_COURSE;