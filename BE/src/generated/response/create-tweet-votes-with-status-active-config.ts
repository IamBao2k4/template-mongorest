export const CREATE_TWEET_VOTES_WITH_STATUS_ACTIVE = {
  _id: "67bd8063fd928cd081e73da3",
  title: "Create tweet votes with status active",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e8f8885bc5241dd6405fb"
],
  queryAdvance: `{
  "title": 1,
  "slug": 1,
  "short_description": 0,
  "long_description": 0,
  "vote_type": "multiple_choice,vote",
  "content": 0,
  "answers": [
    {
      "id": "$id()",
      "content": 0,
      "is_correct": 0,
      "ordering": 0,
      "image": {
        "title": 0,
        "path": 0
      }
    }
  ],
  "reason": 0,
  "featured_image": 0,
  "categories": 0,
  "tag": 0,
  "status": "active",
  "social_group": "@param:group_id",
  "comment_off": "false,true",
  "like_off": "false,true",
  "report_tweet_off": "false,true",
  "report_comment_off": "false,true",
  "question_type": "image,text",
  "layout": 0,
  "tweet_time_waiting": 0
}`,
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
  restricted: [],
  id: "",
} as const;

export type CreateTweetVotesWithStatusActiveConfig = typeof CREATE_TWEET_VOTES_WITH_STATUS_ACTIVE;