export const UPDATE_SHIPPING = {
  _id: "6807691dfa0fd1ce85988ef6",
  title: "UPDATE shipping",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "68076802fa0fd1ce85988e85"
],
  queryAdvance: `{
  "title": 0,
  "code": 0,
  "description": 0,
  "status": 0
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

export type UPDATEShippingConfig = typeof UPDATE_SHIPPING;