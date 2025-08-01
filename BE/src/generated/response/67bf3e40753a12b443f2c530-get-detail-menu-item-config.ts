export const GET_DETAIL_MENU_ITEM = {
  _id: "67bf3e40753a12b443f2c530",
  title: "get detail menu item",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67493d3f10905d9ddbd007cc"
],
  queryAdvance: `[
  {
    "$addFields": {
      "id": {
        "$toString": "$_id"
      }
    }
  },
 {
   "$match": {
     "id":"@param:_id",
     "tenant_id":"@header:x-tenant-id"
   }
 },
  {
    "$facet": {
      "meta_data": [
        {
          "$count": "count"
        },
        {
          "$addFields": {
            "skip": "@param:skip",
            "limit": "@param:limit"
          }
        }
      ],
      "data": [
        {
          "$skip": "@param:skip"
        },
        {
          "$limit": "@param:limit"
        }
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
    "value": "menu_item_id",
    "key": "menu_item_id"
  },
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  },
  {
    "value": "_id",
    "key": "_id"
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  data: {
  "id": "ab4966e9-542f-42e7-b97a-44723dfe39f6",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type GetDetailMenuItemConfig = typeof GET_DETAIL_MENU_ITEM;