export const CREATE_TWEET_SAVED = {
  _id: "67ce8b2fad2f82e8c4bc4c51",
  title: "create tweet saved",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c6bd12cb2d3f0de04c8e75"
],
  queryAdvance: `{
  "tweet_id": "@param:tweet_id"
}`,
  categories: [],
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type CreateTweetSavedConfig = typeof CREATE_TWEET_SAVED;