export const CREATE_DISCUSSION_LIKE = {
  _id: "67906a6ae4fd414ec000ddb9",
  title: "create discussion like",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752be9865017d942f759573"
],
  queryAdvance: `{
  "discussion":"@param:discussion_id"
}`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type CreateDiscussionLikeConfig = typeof CREATE_DISCUSSION_LIKE;