export const HASUSERNOTREACHEDMAXIMUMEXAMATTEMPTSYET = {
  _id: "67fc816936ac50fe56067804",
  title: "has-user-not-reached-maximum-exam-attempts-yet",
  note: "Kiểm tra xem người dùng vẫn chưa đạt đến số lần thi tối đa",
  entity: [
  "6752cbec65017d942f7595dc"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
  advance: `[
  {
    "$facet": {
      "attempts": [
        {
          "$match": {
            "exam": "@param:exam_id",
            "created_by": "@jwt:user.id",
            "tenant_id": "@header:x-tenant-id",
            "status": "finished"
          }
        },
        {
          "$group": {
            "_id": null,
            "attempt_count": {
              "$sum": 1
            }
          }
        },
        {
          "$project": {
            "_id": 0,
            "attempt_count": 1
          }
        }
      ]
    }
  },
  {
    "$project": {
      "attempt_count": {
        "$ifNull": [
          {
            "$arrayElemAt": [
              "$attempts.attempt_count",
              0
            ]
          },
          0
        ]
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-exams",
      "let": {
        "exam_id": {
          "$toObjectId": "@param:exam_id"
        }
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                "$_id",
                "$$exam_id"
              ]
            }
          }
        }
      ],
      "as": "exam_info"
    }
  },
  {
    "$addFields": {
      "exam_info": {
        "$arrayElemAt": [
          "$exam_info",
          0
        ]
      }
    }
  },
  {
    "$addFields": {
      "max_attempts": "$exam_info.member_retries_allowed",
      "has_reached_max": {
        "$gte": [
          "$attempt_count",
          "$exam_info.member_retries_allowed"
        ]
      }
    }
  },
  {
    "$match": {
      "has_reached_max": false
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  params: [
  {
    "value": "exam_id",
    "key": "exam_id"
  }
],
} as const;

export type HasusernotreachedmaximumexamattemptsyetConfig = typeof HASUSERNOTREACHEDMAXIMUMEXAMATTEMPTSYET;