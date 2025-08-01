export const CREATE_COMMENT_REPORTS = {
  _id: "676e31572cff0e67149ebaf8",
  title: "create comment reports",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6764e4046e57acaf6815ab9f"
],
  queryAdvance: `{
  "type": "comment",
  "reason": 1,
  "document_id": "@param:comment_id",
  "social_group": "@param:group_id"
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "comment_id",
    "key": "comment_id"
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

export type CreateCommentReportsConfig = typeof CREATE_COMMENT_REPORTS;