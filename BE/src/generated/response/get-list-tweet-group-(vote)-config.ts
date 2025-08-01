export const GET_LIST_TWEET_GROUP_(VOTE) = {
  _id: "6765243e6e57acaf6815af0b",
  title: "Get list tweet group (vote)",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e8f8885bc5241dd6405fb"
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

export type GetListTweetGroupVoteConfig = typeof GET_LIST_TWEET_GROUP_(VOTE);