export const ISUSERACTIVEINTENANT = {
  _id: "67c92992f4aa922e5d2a1074",
  title: "is-user-active-in-tenant",
  entity: [
  "6757b1998659c9e98a2f1e2b"
],
  data: {
  "id": "075ae691-b784-42e2-9401-b0d8d1bbda2a",
  "rules": [
    {
      "id": "b6138c2d-e350-4190-8778-72b333aeb69a",
      "field": "user-tenant-level-mapping.user",
      "operator": "=",
      "valueSource": "value",
      "value": "$user-tenant-level-mapping.user:jwt.user@id"
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"user-tenant-level-mapping.user":"$user-tenant-level-mapping.user:jwt.user@id"}`,
  locale: null,
  locale_id: null,
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuseractiveintenantConfig = typeof ISUSERACTIVEINTENANT;