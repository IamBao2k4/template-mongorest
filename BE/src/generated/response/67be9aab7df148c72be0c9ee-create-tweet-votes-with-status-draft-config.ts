export const CREATE_TWEET_VOTES_WITH_STATUS_DRAFT = {
  _id: "67be9aab7df148c72be0c9ee",
  title: "Create tweet votes with status draft",
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
            "image": 0
        }
    ],
    "reason": 0,
    "featured_image": 0,
    "categories": 0,
    "tag": 0,
    "status": "draft",
    "social_group": "@param:group_id",
    "comment_off": "false,true",
    "like_off": "false,true",
    "report_tweet_off": "false,true",
    "report_comment_off": "false,true",
    "question_type": "image,text",
    "layout":0
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

export type CreateTweetVotesWithStatusDraftConfig = typeof CREATE_TWEET_VOTES_WITH_STATUS_DRAFT;