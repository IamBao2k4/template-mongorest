export const GET_LIST_GROUPS_MENU_ITEM = {
  _id: "67644396c34159fb897b7047",
  title: "Get list group's menu item",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67493d3f10905d9ddbd007cc"
],
  queryAdvance: `  [
  {
    "$match": {
      "social_group": "@param:group_id",
      "tenant_id":"@header:x-tenant-id"
  }
  },
  {
    "$facet": {
      "meta_data": [
        { "$count": "count" },
        {
          "$addFields": {
          "skip": "@param:skip",
          "limit": "@param:limit"
        }
        }
      ],
      "data": [
        { "$skip": "@param:skip" },
        { "$limit": "@param:limit" }
      ]
    }
  }
]`,
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
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListGroupsMenuItemConfig = typeof GET_LIST_GROUPS_MENU_ITEM;