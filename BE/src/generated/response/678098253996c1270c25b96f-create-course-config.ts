export const CREATE_COURSE = {
  _id: "678098253996c1270c25b96f",
  title: "create course",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529c0665017d942f7592d1"
],
  queryAdvance: `{
  "title":1,
  "slug":1,
  "short_description":0,
  "long_description":0,
  "cover_image":0,
  "status":0,
  "type":"public,private",
  "contains_course":[
    {"title":0}
  ],
  "objectives":[
    {"title":0}
  ],
  "objects":[
    {"title":0}
  ],
  "requests":[
    {"title":0}
  ],
  "category":0,
  "permissions":0
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type CreateCourseConfig = typeof CREATE_COURSE;