export const REQUEST_TO_JOIN_PUBLIC_COURSE = {
  _id: "678642046d9b09071159c384",
  title: "request to join public course",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67853fcd4c9747dfaeed5f84"
],
  queryAdvance: `{
  "user": "@jwt:user.id",
  "course": "@param:course_id",
  "status": "joined",
  "role": "member"
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
  restricted: [
  {
    "key": "course",
    "value": "course",
    "required": true
  },
  {
    "key": "user",
    "value": "user"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "role",
    "value": "role"
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
  id: "",
} as const;

export type RequestToJoinPublicCourseConfig = typeof REQUEST_TO_JOIN_PUBLIC_COURSE;