export const CREATE_COMMENT = {
  _id: "676e33942cff0e67149ebb6c",
  title: "create comment",
  method: "post",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6764e3926e57acaf6815ab97"
],
  queryAdvance: `{
  "parent_id": 0,
  "content": 1,
  "attachments": 0,
  "tweet": "@param:tweet_id",
  "social_group": "@param:group_id"
}`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "tweet_id",
    "key": "tweet_id"
  },
  {
    "value": "group_id",
    "key": "group_id"
  }
],
  headers: [],
  data: {
  "id": "db25e574-8c69-4739-bbe2-a9a29561c8dd",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [
  {
    "key": "parent_id",
    "value": "parent_id"
  },
  {
    "key": "content",
    "value": "content"
  },
  {
    "key": "tweet",
    "value": "tweet"
  },
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "like_count",
    "value": "like_count"
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

export type CreateCommentConfig = typeof CREATE_COMMENT;