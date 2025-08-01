export const DELETE_CARTS_ITEM = {
  _id: "68186c39753574930d61007b",
  title: "delete cart's item",
  method: "delete",
  locale: null,
  locale_id: null,
  outputEntity: [
  "681866a8753574930d60fcf3"
],
  queryAdvance: `{}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
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

export type DeleteCartsItemConfig = typeof DELETE_CARTS_ITEM;