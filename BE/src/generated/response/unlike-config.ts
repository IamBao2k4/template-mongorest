export const UNLIKE = {
  _id: "6773bd62ab2649a80d75bced",
  title: "unlike",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "676a2762dedfcf1bf1c55abf"
],
  queryAdvance: `{
  "is_waiting_unlike": "true",
  "is_waiting_like": "false"
}
`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "entity_id",
    "value": "entity_id"
  },
  {
    "key": "entity_name",
    "value": "entity_name"
  },
  {
    "key": "social_group",
    "value": "social_group"
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

export type UnlikeConfig = typeof UNLIKE;