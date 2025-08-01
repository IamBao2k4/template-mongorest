export const ADD_COURSE_TO_CART = {
  _id: "68186b41753574930d610060",
  title: "add course to cart",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "681866a8753574930d60fcf3"
],
  queryAdvance: `{
  "user": "@jwt:user.id",
  "course": "@body:course"
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
    "key": "user",
    "value": "user"
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

export type AddCourseToCartConfig = typeof ADD_COURSE_TO_CART;