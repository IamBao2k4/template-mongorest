export const DELETE_USER_PROGRESS = {
  _id: "68066736beb73c2d42c99402",
  title: "delete user progress",
  method: "delete",
  locale: null,
  locale_id: null,
  outputEntity: [
  "680665bdbeb73c2d42c993b9"
],
  queryAdvance: `{}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
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

export type DeleteUserProgressConfig = typeof DELETE_USER_PROGRESS;