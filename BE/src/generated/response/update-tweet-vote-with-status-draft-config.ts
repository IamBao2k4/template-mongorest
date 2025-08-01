export const UPDATE_TWEET_VOTE_WITH_STATUS_DRAFT = {
  _id: "68873c47edb2b79b9533b70b",
  title: "update tweet vote with status draft",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e8f8885bc5241dd6405fb"
],
  queryAdvance: `{
  "title": 0,
  "slug": 0,
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
  "layout": 0
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
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "total_user_voted",
    "value": "total_user_voted"
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

export type UpdateTweetVoteWithStatusDraftConfig = typeof UPDATE_TWEET_VOTE_WITH_STATUS_DRAFT;