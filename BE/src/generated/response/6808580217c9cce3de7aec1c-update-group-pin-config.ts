export const UPDATE_GROUP_PIN = {
  _id: "6808580217c9cce3de7aec1c",
  title: "update group pin",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "676000575a1356463269d0b0"
],
  queryAdvance: `{
  "user": "@jwt:user.id",
  "social_group": 0,
  "position": 0
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
    "key": "position",
    "value": "position"
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

export type UpdateGroupPinConfig = typeof UPDATE_GROUP_PIN;