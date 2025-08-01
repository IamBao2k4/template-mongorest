export const CREATE_MENU_ITEM = {
  _id: "67624c76991509746b6a3c7c",
  title: "Create menu item",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67493d3f10905d9ddbd007cc"
],
  queryAdvance: `{
  "name":1,
  "type":1,
  "position":0,
  "link":0,
  "status":1,
  "social_group": "@param:group_id",
  "category": "@param:category_id",
  "parent_id":0
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "group_id",
    "key": "group_id"
  },
  {
    "value": "category_id",
    "key": "category_id"
  }
],
  headers: [],
  data: {
  "id": "04fa76e7-7272-4767-9ac1-32f1230e07ee",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type CreateMenuItemConfig = typeof CREATE_MENU_ITEM;