export const ISSTARTLEARNINGTIMENOTEXIST = {
  _id: "6833e43a8151a797cf8b8bc7",
  title: "is-start-learning-time-not-exist",
  entity: [
  "67853fcd4c9747dfaeed5f84"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
  advance: `[
  {
    "$match": {
      "course": "@param:course_id",
      "user": "@jwt:user.id",
      "start_learning_time": {
        "$exists": false
      }
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "course_id",
    "key": "course_id"
  }
],
} as const;

export type IsstartlearningtimenotexistConfig = typeof ISSTARTLEARNINGTIMENOTEXIST;