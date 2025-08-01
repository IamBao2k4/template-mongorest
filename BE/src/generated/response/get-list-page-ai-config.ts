export const GET_LIST_PAGE_AI = {
  _id: "681c31776b38a6176feb07fb",
  title: "get list page ai",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6743fba64633668aab2b41e1"
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
          {
            "$eq": [
              "@param:search",
              null
            ]
          },
          {
            "$regexMatch": {
              "input": "$title",
              "regex": "@param:search",
              "options": "i"
            }
          },
          {
            "$regexMatch": {
              "input": "$slug",
              "regex": "@param:search",
              "options": "i"
            }
          }
        ]
      }
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
]`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "title",
    "key": "title"
  },
  {
    "value": "search_slug",
    "key": "search_slug"
  },
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  },
  {
    "value": "slug",
    "key": "slug"
  }
],
  headers: [
  {
    "value": "x-teant-id",
    "key": "x-teant-id"
  },
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  restricted: [
  {
    "key": "title",
    "value": "title"
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

export type GetListPageAiConfig = typeof GET_LIST_PAGE_AI;