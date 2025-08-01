export const CREATE_SHIPPING = {
  _id: "680768e3fa0fd1ce85988ee6",
  title: "CREATE shipping",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "68076802fa0fd1ce85988e85"
],
  queryAdvance: `{
  "title": 1,
  "code": 1,
  "description": 1
}`,
  categories: [],
  tenant_id: "6801bf1b887875ca1b8c3ee4",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
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

export type CREATEShippingConfig = typeof CREATE_SHIPPING;