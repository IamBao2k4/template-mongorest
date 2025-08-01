export const UPDATE_ORDER = {
  _id: "68062bb0beb73c2d42c97e38",
  title: "UPDATE order",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6805b058f4d18535c7e63656"
],
  queryAdvance: `{
  "order_number": 0,
  "customer": 0,
  "payment_status": 0,
  "currency": 0,
  "subtotal": 0,
  "tax_amount": 0,
  "shipping_amount": 0,
  "discount_amount": 0,
  "total_price": 0,
  "shipping_address": {
    "full_name": 0,
    "phone": 0,
    "email": 0,
    "address": 0,
    "city": 0,
    "state": 0,
    "country": 0
  }
}`,
  categories: [],
  tenant_id: "6801bf1b887875ca1b8c3ee4",
  documents: [],
  body: null,
  params: [
  {
    "key": "",
    "value": "order_status",
    "description": "",
    "relation": "string"
  },
  {
    "key": "",
    "value": "",
    "description": ""
  }
],
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

export type UPDATEOrderConfig = typeof UPDATE_ORDER;