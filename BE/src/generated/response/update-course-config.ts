export const UPDATE_COURSE = {
  _id: "6780a09ef18d5f30a867231f",
  title: "update course",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529c0665017d942f7592d1"
],
  queryAdvance: `{
  "title":0,
  "slug":0,
  "short_description":0,
  "long_description":0,
  "cover_image":0,
  "status":0,
  "contains_course":[
    {"title":0}
  ],
  "objectives":[
    {"title":0}
  ],
  "objects":[
    {"title":0}
  ],
  "category":0
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

export type UpdateCourseConfig = typeof UPDATE_COURSE;