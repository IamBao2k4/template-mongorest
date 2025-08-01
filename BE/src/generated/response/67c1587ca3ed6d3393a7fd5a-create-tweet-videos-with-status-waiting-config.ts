export const CREATE_TWEET_VIDEOS_WITH_STATUS_WAITING = {
  _id: "67c1587ca3ed6d3393a7fd5a",
  title: "Create tweet videos with status waiting",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e8ef485bc5241dd6405dd"
],
  queryAdvance: `{
  "title":1,
  "slug":1,
  "short_description":0,
  "video_link":0,
  "video_file":0,
  "categories": 0,
  "tag":0,
  "status":"waiting",
  "social_group":"@param:group_id",
  "comment_off": "false,true",
  "like_off": "false,true",
  "report_tweet_off": "false,true",
  "report_comment_off": "false,true",
  "youtube_path":0,
  "featured_image":0,
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

export type CreateTweetVideosWithStatusWaitingConfig = typeof CREATE_TWEET_VIDEOS_WITH_STATUS_WAITING;