export const USER_LIKE_TWEET = {
  _id: "676b6ca4357685825bbd0a70",
  title: "User like tweet",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "676a2762dedfcf1bf1c55abf"
],
  queryAdvance: `{
  "entity_id": "@param:tweet_id",
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
    "value": "tweet_id",
    "key": "tweet_id"
  }
],
  headers: [],
  data: {
  "id": "99869a7b-dcd1-475f-aa31-81b78f5c4425",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type UserLikeTweetConfig = typeof USER_LIKE_TWEET;