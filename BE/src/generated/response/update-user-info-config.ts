export const UPDATE_USER_INFO = {
  _id: "677ca0a62102c096a386810a",
  title: "update user info",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6749933810905d9ddbd0104b"
],
  queryAdvance: `{
  "username":0,
  "email":0,
  "first_name":0,
  "last_name":0,
  "featured_image":0,
  "cover":0,
  "phone":0,
  "birthday":0,
  "description":0
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type UpdateUserInfoConfig = typeof UPDATE_USER_INFO;