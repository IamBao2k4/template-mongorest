export const GET_LIST_USER_EXAM_RESULT = {
  _id: "67a33b2003679925e42bb622",
  title: "get list user exam result",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752cbec65017d942f7595dc"
],
  queryAdvance: `[
  {
    "$match": {
      "created_by": "@jwt:user.id"
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

export type GetListUserExamResultConfig = typeof GET_LIST_USER_EXAM_RESULT;