export const UPGRADE_ROLE_OF_GROUPS_MEMBER = {
  _id: "67db8c8cbab79a925cd3b79b",
  title: "upgrade role of group's member",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674810a776462b61b5df8ece"
],
  queryAdvance: `{
  "user":"@param:user_id",
  "social_group":"@param:group_id",
  "role":"manager"
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

export type UpgradeRoleOfGroupsMemberConfig = typeof UPGRADE_ROLE_OF_GROUPS_MEMBER;