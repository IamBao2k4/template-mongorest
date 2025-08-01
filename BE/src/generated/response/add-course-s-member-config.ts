export const ADD_COURSE_S_MEMBER = {
  _id: "67a181a11aaf205cfbd7084b",
  title: "add course's member",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67853fcd4c9747dfaeed5f84"
],
  queryAdvance: `{
  "user": "@body:user",
  "course": "@param:course_id",
  "status": "joined",
  "role": "member"
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: [
  {
    "value": "user",
    "key": "user"
  }
],
  params: [
  {
    "value": "course_id",
    "key": "course_id"
  }
],
  headers: [],
  data: {
  "id": "121dd603-4f67-4fa2-8079-36a28812fecf",
  "rules": [],
  "combinator": "and",
  "not": false
},
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
  id: "",
} as const;

export type AddCoursesMemberConfig = typeof ADD_COURSE_S_MEMBER;