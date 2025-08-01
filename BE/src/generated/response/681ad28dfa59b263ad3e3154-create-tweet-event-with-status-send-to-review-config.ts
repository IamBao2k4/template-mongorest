export const CREATE_TWEET_EVENT_WITH_STATUS_SEND_TO_REVIEW = {
  _id: "681ad28dfa59b263ad3e3154",
  title: "create tweet event with status send to review",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "681ad170fa59b263ad3e2fa4"
],
  queryAdvance: `{
  "title": 1,
  "slug": 1,
  "short_description": 0,
  "featured_image": 0,
  "categories": 0,
  "tag": 0,
  "status": "send_to_review",
  "social_group": "@param:group_id",
  "comment_off": "false,true",
  "like_off": "false,true",
  "event_start_time":0,
  "event_end_time":0,
  "event_type":"online,offline",
  "event_location":0,
  "event_link":0,
  "tweet_waiting_time": 0
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

export type CreateTweetEventWithStatusSendToReviewConfig = typeof CREATE_TWEET_EVENT_WITH_STATUS_SEND_TO_REVIEW;