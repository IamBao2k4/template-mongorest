export const UPDATE_PAYMENT_METHOD = {
  _id: "6805c799484b959b5ecda76e",
  title: "UPDATE payment method",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6805ba9df4d18535c7e63b1d"
],
  queryAdvance: `{
  "title": 0,
  "code": 0,
  "description": 0,
  "instructions": 0,
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
    "key": "title",
    "value": "title"
  },
  {
    "key": "code",
    "value": "code"
  },
  {
    "key": "description",
    "value": "description"
  },
  {
    "key": "status",
    "value": "status"
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

export type UPDATEPaymentMethodConfig = typeof UPDATE_PAYMENT_METHOD;