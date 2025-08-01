export const GET_LIST_GROUP_S_CATEGORIES = {
  _id: "67643b49c34159fb897b6fcd",
  title: "Get list group's categories",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674835d876462b61b5df90d1"
],
  queryAdvance: `[
  {
    "$match": {
      "social_group": "@param:group_id",
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
              "input": "$title",
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
      "position": -1
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
    "value": "group_id",
    "key": "group_id"
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
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "position",
    "value": "position"
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
  id: "67643b49c34159fb897b6fcd",
} as const;

export type GetListGroupsCategoriesConfig = typeof GET_LIST_GROUP_S_CATEGORIES;