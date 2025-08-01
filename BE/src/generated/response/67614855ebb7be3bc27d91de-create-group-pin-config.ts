export const CREATE_GROUP_PIN = {
  _id: "67614855ebb7be3bc27d91de",
  title: "Create group pin",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "676000575a1356463269d0b0"
],
  queryAdvance: `{
  "user": "@jwt:user.id",
  "social_group": 1,
  "position":"0"
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
  headers: [
  {
    "value": "user.id",
    "key": "user.id"
  }
],
  restricted: [],
  id: "",
} as const;

export type CreateGroupPinConfig = typeof CREATE_GROUP_PIN;