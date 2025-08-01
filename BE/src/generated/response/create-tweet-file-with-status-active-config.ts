export const CREATE_TWEET_FILE_WITH_STATUS_ACTIVE = {
  _id: "68189256753574930d611271",
  title: "create tweet file with status active",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "68188ea9753574930d6110a1"
],
  queryAdvance: `{
  "title": 1,
  "slug": 1,
  "short_description": 0,
  "attachments": [
    {
      "attachment": 0,
      "type": "pdf,pptx,docx,xlxs,mp4,mp3,png,jpg"
    }
  ],
  "featured_image": 0,
  "categories": 0,
  "tag": 0,
  "status": "active",
  "social_group": "@param:group_id",
  "comment_off": "false,true",
  "like_off": "false,true",
  "report_tweet_off": "false,true",
  "report_comment_off": "false,true",
  "tweet_waiting_time": 0
}
`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "group_id",
    "key": "group_id"
  }
],
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
    "key": "attachments",
    "value": "attachments"
  },
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

export type CreateTweetFileWithStatusActiveConfig = typeof CREATE_TWEET_FILE_WITH_STATUS_ACTIVE;