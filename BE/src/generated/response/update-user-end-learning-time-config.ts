export const UPDATE_USER_END_LEARNING_TIME = {
  _id: "6833e0668151a797cf8b8a5f",
  title: "update user end learning time",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67853fcd4c9747dfaeed5f84"
],
  queryAdvance: `{
  "end_learning_time": 0
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "course",
    "value": "course"
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
    "key": "is_finished",
    "value": "is_finished"
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
  id: "6833e0668151a797cf8b8a5f",
} as const;

export type UpdateUserEndLearningTimeConfig = typeof UPDATE_USER_END_LEARNING_TIME;