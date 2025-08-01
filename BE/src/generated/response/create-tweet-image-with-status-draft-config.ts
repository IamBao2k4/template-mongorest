export const CREATE_TWEET_IMAGE_WITH_STATUS_DRAFT = {
  _id: "67be9a197df148c72be0c78a",
  title: "Create tweet image with status draft",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e89c2033700ce36e9f038"
],
  queryAdvance: `{
  "title":1,
  "slug":1,
  "short_description":0,
  "long_description":0,
  "images":0,
  "featured_image":0,
  "categories": 0,
  "tag":0,
  "status":"draft",
  "social_group":"@param:group_id",
  "comment_off": "false,true",
  "like_off": "false,true",
  "report_tweet_off": "false,true",
  "report_comment_off": "false,true"
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

export type CreateTweetImageWithStatusDraftConfig = typeof CREATE_TWEET_IMAGE_WITH_STATUS_DRAFT;