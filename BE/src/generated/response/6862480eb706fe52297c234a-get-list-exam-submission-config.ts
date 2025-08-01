export const GET_LIST_EXAM_SUBMISSION = {
  _id: "6862480eb706fe52297c234a",
  title: "get list exam submission",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752cbec65017d942f7595dc"
],
  queryAdvance: `[
  {
    "$match": {
      "exam": "@param:exam_id"
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
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "created_by",
      "foreignField": "user",
      "pipeline": [
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "created_by",
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id"
          }
        },
        {
          "$project": {
            "default_password": 0
          }
        }
      ],
      "as": "user"
    }
  }
      ],
      "as": "user"
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
  restricted: [
  {
    "key": "exam",
    "value": "exam"
  },
  {
    "key": "status",
    "value": "status"
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
  id: "6862480eb706fe52297c234a",
} as const;

export type GetListExamSubmissionConfig = typeof GET_LIST_EXAM_SUBMISSION;