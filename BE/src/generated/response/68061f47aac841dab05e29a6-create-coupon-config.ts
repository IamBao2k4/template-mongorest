export const CREATE_COUPON = {
  _id: "68061f47aac841dab05e29a6",
  title: "CREATE coupon",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6801cba8887875ca1b8c4a3d"
],
  queryAdvance: `{
  "price_rule": 1,
  "code": 1,
  "status": 1
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

export type CREATECouponConfig = typeof CREATE_COUPON;