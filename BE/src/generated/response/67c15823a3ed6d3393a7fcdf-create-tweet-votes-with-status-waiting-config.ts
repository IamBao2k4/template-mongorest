export const CREATE_TWEET_VOTES_WITH_STATUS_WAITING = {
  _id: "67c15823a3ed6d3393a7fcdf",
  title: "Create tweet votes with status waiting",
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
        "title":0,
        "path":0
      }
    }
  ],
  "reason": 0,
  "featured_image": 0,
  "categories": 0,
  "tag": 0,
  "status": "waiting",
  "social_group": "@param:group_id",
  "comment_off": "false,true",
  "like_off": "false,true",
  "report_tweet_off": "false,true",
  "report_comment_off": "false,true",
  "question_type": "image,text",
  "layout": 0,
  "tweet_waiting_time": 0
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

export type CreateTweetVotesWithStatusWaitingConfig = typeof CREATE_TWEET_VOTES_WITH_STATUS_WAITING;