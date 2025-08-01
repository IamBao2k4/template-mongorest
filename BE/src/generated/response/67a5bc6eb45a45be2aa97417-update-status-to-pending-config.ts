export const UPDATE_STATUS_TO_PENDING = {
  _id: "67a5bc6eb45a45be2aa97417",
  title: "update status to pending",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674810a776462b61b5df8ece"
],
  queryAdvance: `{
  "status": "pending"
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type UpdateStatusToPendingConfig = typeof UPDATE_STATUS_TO_PENDING;