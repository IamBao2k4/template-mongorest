export const USER_SUBMIT_VOTE_RESULT = {
  _id: "678f16ea34775cefc244f48f",
  title: "user submit vote result",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "678f159a34775cefc244f408"
],
  queryAdvance: `{
  "tweet_id": "@param:tweet_id",
  "answer": 1
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
    "key": "tweet_id",
    "value": "tweet_id"
  },
  {
    "key": "answer",
    "value": "answer"
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

export type UserSubmitVoteResultConfig = typeof USER_SUBMIT_VOTE_RESULT;