export const CREATE_GROUP = {
  _id: "675fe9a75a1356463269cdcc",
  title: "Create group",
  note: "Thêm restricted field",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6747ef07c47463d88f8c5ab1"
],
  queryAdvance: `{
  "cover": 0,
  "title": 1,
  "slug": 1,
  "desctiption": 0,
  "type": 1,
  "status": "active",
  "permissions":{
    "tweet_approve_mode":"false,true",
    "post_create":"owner,manager,member"
  }
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
  id: "675fe9a75a1356463269cdcc",
} as const;

export type CreateGroupConfig = typeof CREATE_GROUP;