export const CHECKUSERREACHEDMAXATTEMPTCOUNT = {
  _id: "67fc7cbe36ac50fe5606739f",
  title: "check-user-reached-max-attempt-count",
  note: "Kiểm tra xem user đã đạt đến số lần kiểm tra tối đa cho phép hay chưa",
  entity: "6749933810905d9ddbd0104b",
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  advance: `[
  {
    "$match": {
      "_id": {
        "$toObjectId": "@jwt:user.id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-user-exam-result",
      "let": { "user_id": "$_id" },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                { "$eq": ["$created_by", { "$toString": "$$user_id" }] },
                { "$eq": ["$exam", "@param:exam_id"] }
              ]
            }
          }
        }
      ],
      "as": "exam_attempts"
    }
  },
  {
    "$addFields": {
      "attempt_count": { "$size": "$exam_attempts" },
      "max_attempts": { "$toInt": "@param:max_attempts" }
    }
  },
  {
    "$match": {
      "$expr": {
        "$lt": ["$attempt_count", "$max_attempts"]
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

export type CheckuserreachedmaxattemptcountConfig = typeof CHECKUSERREACHEDMAXATTEMPTCOUNT;