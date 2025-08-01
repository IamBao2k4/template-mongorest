export const CREATE_TWEET_EVENT_WITH_STATUS_DRAFT = {
  _id: "688731c2edb2b79b9533af91",
  title: "create tweet event with status draft",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "681ad170fa59b263ad3e2fa4"
],
  queryAdvance: `{
  "title": 0,
  "slug": 0,
  "short_description": 0,
  "featured_image": 0,
  "categories": 0,
  "tag": 0,
  "status": "draft",
  "social_group": "@param:group_id",
  "comment_off": "false,true",
  "like_off": "false,true",
  "event_start_time": 0,
  "event_end_time": 0,
  "event_type": "online,offline",
  "event_location": 0,
  "event_link": 0,
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

export type CreateTweetEventWithStatusDraftConfig = typeof CREATE_TWEET_EVENT_WITH_STATUS_DRAFT;