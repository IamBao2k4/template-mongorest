export const CREATE_USER_TENANT_PROFILE = {
  _id: "67ab069ca67aaa1951ca7081",
  title: "create user tenant profile",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67aad740a67aaa1951ca64b0"
],
  queryAdvance: `{
  "email": "@jwt:user.email",
  "user": "@jwt:user.id",
  "default_password":1,
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
  restricted: [
  {
    "key": "email",
    "value": "email"
  },
  {
    "key": "user",
    "value": "user"
  },
  {
    "key": "_id",
    "value": "_id"
  },
  {
    "key": "created_by",
    "value": "created_by"
  },
  {
    "key": "updated_by",
    "value": "updated_by"
  },
  {
    "key": "created_at",
    "value": "created_at"
  },
  {
    "key": "updated_at",
    "value": "updated_at"
  }
],
  id: "",
} as const;

export type CreateUserTenantProfileConfig = typeof CREATE_USER_TENANT_PROFILE;