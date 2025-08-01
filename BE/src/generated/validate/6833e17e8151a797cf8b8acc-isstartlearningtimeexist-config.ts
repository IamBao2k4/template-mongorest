export const ISSTARTLEARNINGTIMEEXIST = {
  _id: "6833e17e8151a797cf8b8acc",
  title: "is-start-learning-time-exist",
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
    "$match":{
      "course":"@param:course_id",
      "user":"@jwt:user.id",
      "start_learning_time": {
        "$exists": true,
        "$ne": null
      }
    }
    }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsstartlearningtimeexistConfig = typeof ISSTARTLEARNINGTIMEEXIST;