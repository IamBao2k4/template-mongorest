export const KIM_TRA_TRNG_THI_ACTIVE_CA_NGI_DNG = {
  _id: "6805c41e484b959b5ecda5fc",
  title: "Kiểm tra trạng thái active của người dùng",
  entity: [
  "67aad740a67aaa1951ca64b0"
],
  data: {
  "id": "17cf9b7e-527b-48ab-a1f7-ba21c8e271fe",
  "rules": [
    {
      "id": "63ad0169-c9f7-4c17-ac19-9f7df78829a7",
      "field": "user-tenant-profile.user",
      "operator": "=",
      "valueSource": "value",
      "value": "$user-tenant-profile.user:jwt.user@id"
    }
  ],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"user-tenant-profile.user":"$user-tenant-profile.user:jwt.user@id"}`,
  locale: null,
  locale_id: null,
  tenant_id: "6801bf1b887875ca1b8c3ee4",
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type KimTraTrngThiActiveCaNgiDngConfig = typeof KIM_TRA_TRNG_THI_ACTIVE_CA_NGI_DNG;