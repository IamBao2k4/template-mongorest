export const GET_LIST_TWEET_GROUP_(IMAGE) = {
  _id: "676523c86e57acaf6815aee8",
  title: "Get list tweet group (image)",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e89c2033700ce36e9f038"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "social_group": "@param:group_id"
    }
  },
  {
    "$sort": {
      "created_at": -1
    }
  },
  {
    "$facet": {
      "meta_data": [
        { "$count": "count" },
        {
          "$addFields": {
          "skip": "@param:skip",
          "limit": "@param:limit"
        }
        }
      ],
      "data": [
        { "$skip": "@param:skip" },
        { "$limit": "@param:limit" }
      ]
    }
  }
]`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListTweetGroupImageConfig = typeof GET_LIST_TWEET_GROUP_(IMAGE);