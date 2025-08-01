export const UPDATE_TWEET_NEWS = {
  _id: "67ee00278660ad558d91ec82",
  title: "update tweet news",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e8ed585bc5241dd6405d3"
],
  queryAdvance: `{
  "title": 0,
  "slug": 0,
  "short_description": 0,
  "long_description": 0,
  "featured_image": 0,
  "categories": 0,
  "tag": 0,
  "comment_off": 0,
  "like_off": 0,
  "status": "active,send_to_review,archive,reject",
  "approve_at": 0,
  "published_at": 0,
  "report_tweet_off": 0
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

export type UpdateTweetNewsConfig = typeof UPDATE_TWEET_NEWS;