export const GET_DETAIL_USER_EXAM_RESULT = {
  _id: "67a33d6303679925e42bb66a",
  title: "get detail user exam result",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752cbec65017d942f7595dc"
],
  queryAdvance: `[
    {
    "$addFields": {
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "tenant_id":"@header:x-tenant-id",
      "created_by": "@jwt:user.id",
      "exam": "@param:exam_id",
      "id":"@param:_id"
    }
  },
  {
    "$addFields": {
      "exam": {
        "$map": {
          "input": "$exam",
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
      "from": "mge-exams",
      "localField": "exam",
      "foreignField": "_id",
      "as": "exam"
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
  params: [
  {
    "value": "exam_id",
    "key": "exam_id"
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
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetDetailUserExamResultConfig = typeof GET_DETAIL_USER_EXAM_RESULT;