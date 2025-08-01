export const UPDATE_TWEET_VOTE_WAITING_TO_ACTIVE = {
  _id: "67da3d18bab79a925cd2f65a",
  title: "update tweet vote waiting to active",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e8f8885bc5241dd6405fb"
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

export type UpdateTweetVoteWaitingToActiveConfig = typeof UPDATE_TWEET_VOTE_WAITING_TO_ACTIVE;