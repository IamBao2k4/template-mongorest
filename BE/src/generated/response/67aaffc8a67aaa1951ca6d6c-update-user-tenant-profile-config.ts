export const UPDATE_USER_TENANT_PROFILE = {
  _id: "67aaffc8a67aaa1951ca6d6c",
  title: "update user tenant profile",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67aad740a67aaa1951ca64b0"
],
  queryAdvance: `{
  "nickname": 0,
  "profile": {
    "social": {
      "featured_image": {
        "_id": 0,
        "title": 0,
        "path": 0
      },
      "cover": {
        "_id": 0,
        "title": 0,
        "path": 0
      },
      "first_name": 0,
      "last_name": 0,
      "birthday": 0,
      "description": 0
    }
  }
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "user_id",
    "key": "user_id"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type UpdateUserTenantProfileConfig = typeof UPDATE_USER_TENANT_PROFILE;