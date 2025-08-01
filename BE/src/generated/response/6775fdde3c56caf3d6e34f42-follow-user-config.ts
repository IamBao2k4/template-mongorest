export const FOLLOW_USER = {
  _id: "6775fdde3c56caf3d6e34f42",
  title: "follow user",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67611eb5deb9ba00adac5876"
],
  queryAdvance: `{
  "from":"@jwt:user.id",
  "to":"@param:user_id"
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

export type FollowUserConfig = typeof FOLLOW_USER;