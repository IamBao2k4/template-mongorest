export const UPDATE_GROUP_INFO = {
  _id: "675fecfd5a1356463269cebd",
  title: "Update Group Info",
  method: "put",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6747ef07c47463d88f8c5ab1"
],
  queryAdvance: `{
  "title": 0,
  "slug": 0,
  "cover": 0,
  "description": 0,
  "type": 0,
  "status": 0
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "cover",
    "value": "cover"
  },
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "slug",
    "value": "slug"
  },
  {
    "key": "description",
    "value": "description"
  },
  {
    "key": "type",
    "value": "type"
  },
  {
    "key": "status",
    "value": "status"
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
  id: "675fecfd5a1356463269cebd",
} as const;

export type UpdateGroupInfoConfig = typeof UPDATE_GROUP_INFO;