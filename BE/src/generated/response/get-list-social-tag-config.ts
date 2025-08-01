export const GET_LIST_SOCIAL_TAG = {
  _id: "677cac912102c096a38683c3",
  title: "get list social tag",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67590fed9b0285b4f6be778d"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$match": {
      "$expr": {
        "$or": [
          { "$eq": ["@param:title", null] },
          {
            "$regexMatch": {
              "input": "$name",
              "regex": "@param:title",
              "options": "i"
            }
          }
        ]
      }
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
        {
          "$count": "count"
        },
        {
          "$addFields": {
            "skip": "@param:skip",
            "limit": "@param:limit"
          }
        }
      ],
      "data": [
        {
          "$skip": "@param:skip"
        },
        {
          "$limit": "@param:limit"
        }
      ]
    }
  }
]
`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  },
  {
    "value": "title",
    "key": "title"
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  restricted: [
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
  id: "677cac912102c096a38683c3",
} as const;

export type GetListSocialTagConfig = typeof GET_LIST_SOCIAL_TAG;