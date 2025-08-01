export const UPDATE_PRICE_RULE = {
  _id: "680619eaaac841dab05e2836",
  title: "UPDATE price rule",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6801c6e2887875ca1b8c4945"
],
  queryAdvance: `{
  "title": 0,
  "value_type": 0,
  "value": 0,
  "starts_at": 0,
  "ends_at": 0,
  "status": 0,
  "minimum_subtotal": 0,
  "usage_limit": 0,
  "usage_limit_per_customer": 0,
  "can_combine": 0,
  "once_per_customer": 0
}`,
  categories: [],
  tenant_id: "6801bf1b887875ca1b8c3ee4",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "value_type",
    "value": "value_type"
  },
  {
    "key": "value",
    "value": "value"
  },
  {
    "key": "starts_at",
    "value": "starts_at"
  },
  {
    "key": "ends_at",
    "value": "ends_at"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "minimum_subtotal",
    "value": "minimum_subtotal"
  },
  {
    "key": "usage_limit",
    "value": "usage_limit"
  },
  {
    "key": "usage_limit_per_customer",
    "value": "usage_limit_per_customer"
  },
  {
    "key": "can_combine",
    "value": "can_combine"
  },
  {
    "key": "once_per_customer",
    "value": "once_per_customer"
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

export type UPDATEPriceRuleConfig = typeof UPDATE_PRICE_RULE;