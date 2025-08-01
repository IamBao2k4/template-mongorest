export const GET_LIST_GROUP_FIELD = {
  _id: "681c3573086500ca3f1178f7",
  title: "get list group field",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67ab1ad32754c1bdc0414a0c"
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
    "value": "search",
    "key": "search"
  },
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
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
    "key": "title",
    "value": "title"
  },
  {
    "key": "slug",
    "value": "slug"
  },
  {
    "key": "categories.id",
    "value": "categories.id"
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

export type GetListGroupFieldConfig = typeof GET_LIST_GROUP_FIELD;