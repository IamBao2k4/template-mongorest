export const GET_LIST_TWEET_GROUP_(VIDEO) = {
  _id: "676523f16e57acaf6815aef9",
  title: "Get list tweet group (video)",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674e8ef485bc5241dd6405dd"
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

export type GetListTweetGroupVideoConfig = typeof GET_LIST_TWEET_GROUP_(VIDEO);