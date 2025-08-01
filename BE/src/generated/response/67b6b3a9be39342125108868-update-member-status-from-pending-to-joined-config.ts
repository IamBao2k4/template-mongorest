export const UPDATE_MEMBER_STATUS_FROM_PENDING_TO_JOINED = {
  _id: "67b6b3a9be39342125108868",
  title: "update member status from pending to joined",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67853fcd4c9747dfaeed5f84"
],
  queryAdvance: `{
  "status":"joined"
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

export type UpdateMemberStatusFromPendingToJoinedConfig = typeof UPDATE_MEMBER_STATUS_FROM_PENDING_TO_JOINED;