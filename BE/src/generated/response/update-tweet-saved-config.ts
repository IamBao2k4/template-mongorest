export const UPDATE_TWEET_SAVED = {
  _id: "67765d8d06b2e962c0be705a",
  title: "update tweet saved",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "675b9a4a9279b9d81247c3cc"
],
  queryAdvance: `{
  "tweet_id": "@param:tweet_id",
  "user_collection": "@param:user_collection_id"
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: [
  {
    "value": "tweet_id",
    "key": "tweet_id"
  },
  {
    "value": "user_collection",
    "key": "user_collection"
  }
],
  params: [
  {
    "value": "tweet_id",
    "key": "tweet_id"
  },
  {
    "value": "collection_id",
    "key": "collection_id"
  },
  {
    "value": "user_collection_id",
    "key": "user_collection_id"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type UpdateTweetSavedConfig = typeof UPDATE_TWEET_SAVED;