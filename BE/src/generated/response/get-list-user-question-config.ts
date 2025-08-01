export const GET_LIST_USER_QUESTION = {
  _id: "67d0fabc563a6f3245cb11d8",
  title: "get list user question",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752b83a65017d942f759501"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "created_by":"@jwt:user.id"
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

export type GetListUserQuestionConfig = typeof GET_LIST_USER_QUESTION;