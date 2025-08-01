export const ENTITY_TWEET_LIKE = {
  _id: "6881a346edb2b79b9531f585",
  title: "entity tweet like",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "676a2762dedfcf1bf1c55abf"
],
  queryAdvance: `{
  "is_waiting_unlike": "false",
  "is_waiting_like": "true"
}
`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "entity_id",
    "value": "entity_id"
  },
  {
    "key": "entity_name",
    "value": "entity_name"
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

export type EntityTweetLikeConfig = typeof ENTITY_TWEET_LIKE;