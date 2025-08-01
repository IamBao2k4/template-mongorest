export const CREATE_ORDER = {
  _id: "680628ecbeb73c2d42c97c97",
  title: "CREATE order",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6805b058f4d18535c7e63656"
],
  queryAdvance: `{
  "order_number": 1,
  "customer": 1,
  "payment_status": 1,
  "currency": 1,
  "subtotal": 1,
  "tax_amount": 1,
  "shipping_amount": 1,
  "discount_amount": 1,
  "total_price": 1,
  "order_status": 1,
  "shipping_address": {
    "full_name": 1,
    "phone": 1,
    "email": 1,
    "address": 1,
    "city": 1,
    "state": 1,
    "country": 1
  },
  "fulfillments": [
    {
      "fulfillment_id": 1,
      "tracking_number": 1,
      "carrier": 1,
      "status": 1,
      "shipped_at": 1,
      "delivered_at": 1,
      "shipper_info": {
        "full_name": 1,
        "phone": 1,
        "staff_code": 1
      }
    }
  ],
  "applied_discounts": [
    {
      "discount_code": 1,
      "code_value": 1,
      "price_rule": 1,
      "discount_type": 1,
      "value": 1,
      "amount": 1,
      "applied_at": 1
    }
  ]
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

export type CREATEOrderConfig = typeof CREATE_ORDER;