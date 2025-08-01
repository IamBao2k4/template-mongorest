export const LEAVE_GROUP = {
  _id: "677ba60a44af0385d64b40c9",
  title: "leave group",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674810a776462b61b5df8ece"
],
  queryAdvance: `{
  "user":"@jwt:user.id",
  "social_group":"@param:group_id",
  "status": "left"
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "_id",
    "key": "_id"
  },
  {
    "value": "group_id",
    "key": "group_id"
  }
],
  headers: [],
  data: {
  "id": "6ba4c429-0508-4107-89fb-12695f8ea4ee",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type LeaveGroupConfig = typeof LEAVE_GROUP;