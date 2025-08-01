export const TRANFER_GROUP_OWNER = {
  _id: "676e19e8eec9ac99f3948ce3",
  title: "tranfer group owner",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674810a776462b61b5df8ece"
],
  queryAdvance: `{
  "user": "@param:user_id",
  "social_group": "@param:group_id",
  "role": "owner",
  "status": "joined"
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

export type TranferGroupOwnerConfig = typeof TRANFER_GROUP_OWNER;