export const CREATE_USER_PROGRESS = {
  _id: "68066676beb73c2d42c993d0",
  title: "create user progress",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "680665bdbeb73c2d42c993b9"
],
  queryAdvance: `{
  "user": "@jwt:user.id",
  "lesson": "@param:lesson_id",
  "course": "@param:course_id"
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "lesson_id",
    "key": "lesson_id"
  },
  {
    "value": "exam_id",
    "key": "exam_id"
  },
  {
    "value": "course_id",
    "key": "course_id"
  }
],
  headers: [],
  restricted: [
  {
    "key": "user",
    "value": "user"
  },
  {
    "key": "lesson",
    "value": "lesson"
  },
  {
    "key": "exam",
    "value": "exam"
  },
  {
    "key": "course",
    "value": "course"
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

export type CreateUserProgressConfig = typeof CREATE_USER_PROGRESS;