export const CREATE_TWEET_VIDEOS_WITH_STATUS_DRAFT = {
  _id: "67be99cd7df148c72be0c6e0",
  title: "Create tweet videos with status draft",
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
  "status":"draft",
  "social_group":"@param:group_id",
  "comment_off": "false,true",
  "like_off": "false,true",
  "report_tweet_off": "false,true",
  "report_comment_off": "false,true",
  "youtube_path":0,
  "featured_image":0
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

export type CreateTweetVideosWithStatusDraftConfig = typeof CREATE_TWEET_VIDEOS_WITH_STATUS_DRAFT;