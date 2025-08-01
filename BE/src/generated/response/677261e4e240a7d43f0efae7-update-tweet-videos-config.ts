export const UPDATE_TWEET_VIDEOS = {
  _id: "677261e4e240a7d43f0efae7",
  title: "update tweet videos",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e8ef485bc5241dd6405dd"
],
  queryAdvance: `{
  "title":0,
  "slug":0,
  "short_description":0,
  "video_link":0,
  "video_file":0,
  "featured_image":0,
  "categories":0,
  "tag":0,
  "youtube_path":0,
  "comment_off":0,
  "like_off":0,
  "status":"active,send_to_review,archive,reject",
  "approve_at":0,
  "approve_by":0,
  "published_at":0,
  "report_tweet_off":0,
  "report_comment_off":0
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

export type UpdateTweetVideosConfig = typeof UPDATE_TWEET_VIDEOS;