export const UPDATE_TWEET_NEW_WITH_STATUS_DRAFT = {
  _id: "68873af4edb2b79b9533b5ab",
  title: "update tweet new with status draft",
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
  "privacy_setting": 0,
  "status": "draft",
  "social_group": "@param:group_id",
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
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "slug",
    "value": "slug"
  },
  {
    "key": "featured_image",
    "value": "featured_image"
  },
  {
    "key": "categories.id",
    "value": "categories.id"
  },
  {
    "key": "tag",
    "value": "tag"
  },
  {
    "key": "comment_off",
    "value": "comment_off"
  },
  {
    "key": "like_off",
    "value": "like_off"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "approve_at",
    "value": "approve_at"
  },
  {
    "key": "approve_by",
    "value": "approve_by"
  },
  {
    "key": "report_tweet_off",
    "value": "report_tweet_off"
  },
  {
    "key": "report_comment_off",
    "value": "report_comment_off"
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

export type UpdateTweetNewWithStatusDraftConfig = typeof UPDATE_TWEET_NEW_WITH_STATUS_DRAFT;