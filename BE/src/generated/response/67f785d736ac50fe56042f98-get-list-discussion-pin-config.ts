export const GET_LIST_DISCUSSION_PIN = {
  _id: "67f785d736ac50fe56042f98",
  title: "get list discussion pin",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67f7834636ac50fe56042e6e"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "course": "@param:course_id"
    }
  },
  {
    "$addFields": {
      "discussion": {
        "$map": {
          "input": "$discussion",
          "as": "sg",
          "in": {
            "$toObjectId": "$$sg"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussions",
      "localField": "discussion",
      "foreignField": "_id",
      "as": "discussion"
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
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListDiscussionPinConfig = typeof GET_LIST_DISCUSSION_PIN;