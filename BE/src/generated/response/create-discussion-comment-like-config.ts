export const CREATE_DISCUSSION_COMMENT_LIKE = {
  _id: "67cfe37adada26e67e8807cf",
  title: "create discussion comment like",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752c71d65017d942f7595a5"
],
  queryAdvance: `{
  "comment": "@param:discussion_comment_id"
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "discussion_comment_id",
    "key": "discussion_comment_id"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type CreateDiscussionCommentLikeConfig = typeof CREATE_DISCUSSION_COMMENT_LIKE;