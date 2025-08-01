export const CREATE_DISCUSSION_S_COMMENT = {
  _id: "6790a7d32bf4488eb3ab1978",
  title: "create discussion's comment",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752c64565017d942f759585"
],
  queryAdvance: `{
  "content":1,
  "attachments":0,
  "discussion":"@param:discussion_id",
  "parent_id":0
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

export type CreateDiscussionsCommentConfig = typeof CREATE_DISCUSSION_S_COMMENT;