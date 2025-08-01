export const UPDATE_CONTACT = {
  _id: "67d38765abd10f64f00cd01a",
  title: "update contact",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67d29b47b6962f9420f43ebb"
],
  queryAdvance: `{
  "type": "broker,organization",
  "company_name": 0,
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
  "slug": 0
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

export type UpdateContactConfig = typeof UPDATE_CONTACT;