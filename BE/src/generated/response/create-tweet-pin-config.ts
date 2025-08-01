export const CREATE_TWEET_PIN = {
  _id: "67b60ed4daf8793d547d8314",
  title: "create tweet pin",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67b60e53daf8793d547d82d3"
],
  queryAdvance: `{
  "tweet":"@body:tweet",
  "position":"0",
  "social_group":0
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: [
  {
    "value": "social_group",
    "key": "social_group"
  }
],
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type CreateTweetPinConfig = typeof CREATE_TWEET_PIN;