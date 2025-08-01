export const UPDATE_TWEET_VIDEO_WITH_STATUS_DRAFT = {
  _id: "68873c03edb2b79b9533b6e8",
  title: "update tweet video with status draft",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e8ef485bc5241dd6405dd"
],
  queryAdvance: `{
  "title": 0,
  "slug": 0,
  "short_description": 0,
  "video_link": 0,
  "video_file": 0,
  "categories": 0,
  "tag": 0,
  "status": "draft",
  "social_group": "@param:group_id",
  "comment_off": "false,true",
  "like_off": "false,true",
  "report_tweet_off": "false,true",
  "report_comment_off": "false,true",
  "youtube_path": 0,
  "featured_image": 0
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "_id",
    "value": "_id"
  },
  {
    "key": "created_by",
    "value": "created_by"
  },
  {
    "key": "updated_by",
    "value": "updated_by"
  },
  {
    "key": "created_at",
    "value": "created_at"
  },
  {
    "key": "updated_at",
    "value": "updated_at"
  }
],
  id: "",
} as const;

export type UpdateTweetVideoWithStatusDraftConfig = typeof UPDATE_TWEET_VIDEO_WITH_STATUS_DRAFT;