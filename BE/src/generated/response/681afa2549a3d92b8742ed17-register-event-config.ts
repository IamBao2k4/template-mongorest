export const REGISTER_EVENT = {
  _id: "681afa2549a3d92b8742ed17",
  title: "register event",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "681af9ce49a3d92b8742ec8a"
],
  queryAdvance: `{
  "user":"@jwt:user.id",
  "tweet":"@param:tweet_id",
  "social_group":"@param:group_id"
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "user",
    "value": "user"
  },
  {
    "key": "tweet",
    "value": "tweet"
  },
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "_id",
    "value": "_id"
  },
  {
    "key": "created_by",
    "value": "created_by"
  },
  {
    "key": "updated_by",
    "value": "updated_by"
  },
  {
    "key": "created_at",
    "value": "created_at"
  },
  {
    "key": "updated_at",
    "value": "updated_at"
  }
],
  id: "",
} as const;

export type RegisterEventConfig = typeof REGISTER_EVENT;