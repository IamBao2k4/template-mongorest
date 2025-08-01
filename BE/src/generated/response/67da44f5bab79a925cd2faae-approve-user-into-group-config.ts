export const APPROVE_USER_INTO_GROUP = {
  _id: "67da44f5bab79a925cd2faae",
  title: "approve user into group",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674810a776462b61b5df8ece"
],
  queryAdvance: `{
  "status":"joined"
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

export type ApproveUserIntoGroupConfig = typeof APPROVE_USER_INTO_GROUP;