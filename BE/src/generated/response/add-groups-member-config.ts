export const ADD_GROUPS_MEMBER = {
  _id: "675ff5825a1356463269cfe8",
  title: "Add group's member",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674810a776462b61b5df8ece"
],
  queryAdvance: `{
  "user": "@body:user",
  "social_group": "@params:group_id",
  "status": "joined",
  "role": 1
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "user",
    "value": "user"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "isFollow",
    "value": "isFollow"
  },
  {
    "key": "role",
    "value": "role"
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
  id: "675ff5825a1356463269cfe8",
} as const;

export type AddGroupsMemberConfig = typeof ADD_GROUPS_MEMBER;