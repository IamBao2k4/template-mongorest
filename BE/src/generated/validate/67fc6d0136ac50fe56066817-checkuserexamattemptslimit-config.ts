export const CHECKUSEREXAMATTEMPTSLIMIT = {
  _id: "67fc6d0136ac50fe56066817",
  title: "check-user-exam-attempts-limit",
  note: "Kiểm tra xem người dùng đã đạt đến giới hạn số lần kiểm tra hay chưa",
  entity: "mge-user-exam-result",
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  advance: `[
  {
    "$match": {
      "exam": "@param:exam_id",
      "created_by": "@jwt:user.id"
    }
  },
  {
    "$group": {
      "_id": null,
      "totalAttempts": { "$sum": 1 }
    }
  },
  {
    "$lookup": {
      "from": "mge-exams",
      "let": { "examId": { "$toObjectId": "@param:exam_id" } },
      "pipeline": [
        {
          "$match": {
            "$expr": { "$eq": ["$_id", "$$examId"] }
          }
        },
        {
          "$project": {
            "member_retries_allowed": 1
          }
        }
      ],
      "as": "examInfo"
    }
  },
  {
    "$addFields": {
      "examInfo": { "$arrayElemAt": ["$examInfo", 0] }
    }
  },
  {
    "$project": {
      "canAttempt": {
        "$lt": ["$totalAttempts", "$examInfo.member_retries_allowed"]
      }
    }
  },
  {
    "$match": {
      "canAttempt": true
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  logged: true,
  params: null,
} as const;

export type CheckuserexamattemptslimitConfig = typeof CHECKUSEREXAMATTEMPTSLIMIT;