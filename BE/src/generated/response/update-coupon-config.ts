export const UPDATE_COUPON = {
  _id: "6806204eaac841dab05e2a6d",
  title: "UPDATE coupon",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6801cba8887875ca1b8c4a3d"
],
  queryAdvance: `{
  "price_rule": 0,
  "code": 0,
  "status": 0
}`,
  categories: [],
  tenant_id: "6801bf1b887875ca1b8c3ee4",
  documents: [],
  body: null,
  params: [
  {
    "value": "increment-usage",
    "key": "increment-usage"
  },
  {
    "value": "",
    "key": ""
  }
],
  headers: [],
  data: {
  "id": "84f03242-75d4-489e-a0de-cae045548941",
  "rules": [],
  "combinator": "and",
  "not": false
},
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
  },
  {
    "key": "price_rule",
    "value": "price_rule"
  },
  {
    "key": "code",
    "value": "code"
  },
  {
    "key": "usage_count",
    "value": "usage_count",
    "relation": "number"
  },
  {
    "key": "status",
    "value": "status"
  }
],
  id: "",
} as const;

export type UPDATECouponConfig = typeof UPDATE_COUPON;