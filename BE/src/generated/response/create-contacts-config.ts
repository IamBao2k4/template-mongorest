export const CREATE_CONTACTS = {
  _id: "67d2a71fb6962f9420f44e2d",
  title: "create contacts",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67d29b47b6962f9420f43ebb"
],
  queryAdvance: `{
  "type": "broker,organization",
  "company_name": 1,
  "address": {
    "city": 0,
    "district": 0,
    "ward": 0,
    "street": 0,
    "full_address": 0
  },
  "phone": 0,
  "mail": 0,
  "logo": 0,
  "cover_image": 0,
  "slug": 1
}`,
  categories: [],
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type CreateContactsConfig = typeof CREATE_CONTACTS;