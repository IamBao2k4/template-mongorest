export const UPDATE_MENU_ITEM = {
  _id: "67625263991509746b6a3d84",
  title: "Update menu item",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67493d3f10905d9ddbd007cc"
],
  queryAdvance: `{
  "name": 0,
  "type": 0,
  "ordering": 0,
  "link": 0,
  "status": 0,
  "social_group": "@param:group_id",
  "category": 0
}
`,
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
  restricted: [
  {
    "key": "name",
    "value": "name"
  },
  {
    "key": "link",
    "value": "link"
  },
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "category",
    "value": "category"
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
  id: "67625263991509746b6a3d84",
} as const;

export type UpdateMenuItemConfig = typeof UPDATE_MENU_ITEM;