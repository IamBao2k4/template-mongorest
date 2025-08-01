export const REQUEST_TO_JOIN_GROUP = {
  _id: "6762353a9923ae86205ceceb",
  title: "Request to join group",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674810a776462b61b5df8ece"
],
  queryAdvance: `{
  "user": "@jwt:user.id",
  "social_group": "@param:group_id",
  "status": "pending",
  "role": "member"
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "group_id",
    "key": "group_id"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type RequestToJoinGroupConfig = typeof REQUEST_TO_JOIN_GROUP;