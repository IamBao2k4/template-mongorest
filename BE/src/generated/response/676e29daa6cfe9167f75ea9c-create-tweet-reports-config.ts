export const CREATE_TWEET_REPORTS = {
  _id: "676e29daa6cfe9167f75ea9c",
  title: "create tweet reports",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6764e4046e57acaf6815ab9f"
],
  queryAdvance: `{
  "type": "tweet",
  "reason": 1,
  "document_id": "@param:tweet_id",
  "social_group":"@param:group_id"
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "tweet_id",
    "key": "tweet_id"
  },
  {
    "value": "group_id",
    "key": "group_id"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type CreateTweetReportsConfig = typeof CREATE_TWEET_REPORTS;