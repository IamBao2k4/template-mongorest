export const UPDATE_USER_NOTIFICATION = {
  _id: "67ea166c7463d047317d391b",
  title: "update user notification",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67a1b30e1aaf205cfbd70e02"
],
  queryAdvance: `{
  "status": "read"
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  data: {
  "id": "50ef93a8-0786-4e38-b622-bf3b2d925231",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type UpdateUserNotificationConfig = typeof UPDATE_USER_NOTIFICATION;