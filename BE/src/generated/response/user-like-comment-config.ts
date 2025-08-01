export const USER_LIKE_COMMENT = {
  _id: "677578253c56caf3d6e34eb0",
  title: "user like comment",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "676a2762dedfcf1bf1c55abf"
],
  queryAdvance: `{
  "entity_id": "@param:comment_id",
  "entity_name": 1,
  "type": "like",
  "social_group":"@param:group_id"
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "comment_id",
    "key": "comment_id"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type UserLikeCommentConfig = typeof USER_LIKE_COMMENT;