export const CREATE_TWEET_NEWS_WITH_STATUS_WAITING = {
  _id: "67c15707a3ed6d3393a7fa89",
  title: "Create tweet news with status waiting",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e8ed585bc5241dd6405d3"
],
  queryAdvance: `{
  "title":1,
  "slug":1,
  "short_description":0,
  "long_description":0,
  "featured_image":0,
  "categories": 0,
  "tag":0,
  "privacy_setting":0,
  "status":"waiting",
  "social_group":"@param:group_id",
  "comment_off": "false,true",
  "like_off": "false,true",
  "report_tweet_off": "false,true",
  "report_comment_off": "false,true",
  "tweet_waiting_time":0
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

export type CreateTweetNewsWithStatusWaitingConfig = typeof CREATE_TWEET_NEWS_WITH_STATUS_WAITING;