export const UPDATE_COMMENT = {
  _id: "676e4efcde20f5a098f19a35",
  title: "update comment",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6764e3926e57acaf6815ab97"
],
  queryAdvance: `{
  "content": 0,
  "attachments":0
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "parent_id",
    "value": "parent_id"
  },
  {
    "key": "content",
    "value": "content"
  },
  {
    "key": "tweet",
    "value": "tweet"
  },
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "like_count",
    "value": "like_count"
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

export type UpdateCommentConfig = typeof UPDATE_COMMENT;