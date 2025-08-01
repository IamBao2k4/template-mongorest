export const CREATE_DISCUSSION_PIN = {
  _id: "67f7840e36ac50fe56042eb5",
  title: "create discussion pin",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67f7834636ac50fe56042e6e"
],
  queryAdvance: `{
  "discussion":"@param:discussion_id",
  "course":"@param:course_id",
  "position":0
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

export type CreateDiscussionPinConfig = typeof CREATE_DISCUSSION_PIN;