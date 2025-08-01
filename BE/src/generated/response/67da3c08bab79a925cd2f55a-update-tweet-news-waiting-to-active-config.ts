export const UPDATE_TWEET_NEWS_WAITING_TO_ACTIVE = {
  _id: "67da3c08bab79a925cd2f55a",
  title: "update tweet news waiting to active",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e8ed585bc5241dd6405d3"
],
  queryAdvance: `{
  "status":"active"
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

export type UpdateTweetNewsWaitingToActiveConfig = typeof UPDATE_TWEET_NEWS_WAITING_TO_ACTIVE;