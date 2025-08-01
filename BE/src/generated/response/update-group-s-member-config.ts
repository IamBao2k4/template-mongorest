export const UPDATE_GROUP_S_MEMBER = {
  _id: "676d12a54ec833ce93a08403",
  title: "Update group's member",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674810a776462b61b5df8ece"
],
  queryAdvance: `{
"user":"@param:user_id",
"status":0,
"role":0
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

export type UpdateGroupsMemberConfig = typeof UPDATE_GROUP_S_MEMBER;