export const UPDATE_TWEET_VOTES = {
  _id: "6772636de240a7d43f0efb6e",
  title: "update tweet votes",
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
  "vote_type": 0,
  "content": 0,
  "answer": {
    "media_type": 0,
    "content": 0,
    "is_correct": 0,
    "ordering": 0,
    "image": 0,
    "id":0
  },
  "reason": 0,
  "featured_image": 0,
  "categories": 0,
  "tag": 0,
  "comment_off": 0,
  "like_off": 0,
  "status": "active,send_to_review,archive,reject",
  "approve_at": 0,
  "approve_by": 0,
  "published_at": 0,
  "report_comment_off": 0,
  "report_tweet_off": 0,
  "question_type": "text,image"
}
`,
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

export type UpdateTweetVotesConfig = typeof UPDATE_TWEET_VOTES;