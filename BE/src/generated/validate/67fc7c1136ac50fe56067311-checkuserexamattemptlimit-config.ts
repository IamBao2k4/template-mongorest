export const CHECKUSEREXAMATTEMPTLIMIT = {
  _id: "67fc7c1136ac50fe56067311",
  title: "check-user-exam-attempt-limit",
  note: "Kiểm tra xem người dùng đã đạt đến giới hạn số lần làm bài kiểm tra cho phép hay chưa",
  entity: "6749933810905d9ddbd0104b",
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  advance: `[
  {
    "$lookup": {
      "from": "mge-user-exam-result",
      "let": { "user_id": { "$toObjectId": "@jwt:user.id" }, "exam_id": { "$toObjectId": "@param:exam_id" } },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                { "$eq": ["$created_by", "$$user_id"] },
                { "$eq": ["$exam", "$$exam_id"] }
              ]
            }
          }
        }
      ],
      "as": "exam_attempts"
    }
  },
  {
    "$lookup": {
      "from": "mge-exams",
      "let": { "exam_id": { "$toObjectId": "@param:exam_id" } },
      "pipeline": [
        {
          "$match": {
            "$expr": { "$eq": ["$_id", "$$exam_id"] }
          }
        }
      ],
      "as": "exam_info"
    }
  },
  {
    "$addFields": {
      "exam_info": { "$arrayElemAt": ["$exam_info", 0] },
      "attempts_count": { "$size": "$exam_attempts" },
      "max_attempts": { "$ifNull": [{ "$toInt": { "$arrayElemAt": ["$exam_info.member_retries_allowed", 0] } }, 1] }
    }
  },
  {
    "$match": {
      "$expr": {
        "$lt": ["$attempts_count", "$max_attempts"]
      }
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

export type CheckuserexamattemptlimitConfig = typeof CHECKUSEREXAMATTEMPTLIMIT;