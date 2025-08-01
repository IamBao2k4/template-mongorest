export const GET_LIST_QUESTION_ = {
  _id: "67bd3c7a2692eef9b7ac2f13",
  title: "get list question ",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752b83a65017d942f759501"
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
            "$eq": ["@param:title", null]
          },
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
      "data": [{ "$skip": "@param:skip" }, { "$limit": "@param:limit" }]
    }
  }
]
`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
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
    "key": "question_type",
    "value": "question_type"
  },
  {
    "key": "answer",
    "value": "answer"
  },
  {
    "key": "level",
    "value": "level"
  },
  {
    "key": "category",
    "value": "category"
  },
  {
    "key": "score",
    "value": "score"
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
  id: "67bd3c7a2692eef9b7ac2f13",
} as const;

export type GetListQuestion Config = typeof GET_LIST_QUESTION_;