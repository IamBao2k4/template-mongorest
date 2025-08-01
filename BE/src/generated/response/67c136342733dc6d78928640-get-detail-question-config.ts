export const GET_DETAIL_QUESTION = {
  _id: "67c136342733dc6d78928640",
  title: "get detail question",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752b83a65017d942f759501"
],
  queryAdvance: `[
  {
    "$addFields": {
      "question_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "question_id":"@param:_id",
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$addFields": {
      "category": {
        "$map": {
          "input": "$category",
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
      "from": "mge-categories",
      "localField": "category",
      "foreignField": "_id",
      "as": "category"
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
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "_id",
    "key": "_id"
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
  restricted: [],
  id: "",
} as const;

export type GetDetailQuestionConfig = typeof GET_DETAIL_QUESTION;