export const CREATE_TWEET_SAVED_ = {
  _id: "675b9b9a9279b9d81247c41c",
  title: "Create tweet saved ",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "675b9a4a9279b9d81247c3cc"
],
  queryAdvance: `{
  "tweet_id": "@param:tweet_id",
  "user_collection":0
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
  restricted: [],
  id: "",
} as const;

export type CreateTweetSaved Config = typeof CREATE_TWEET_SAVED_;