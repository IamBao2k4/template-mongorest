export const GET_DETAIL_COURSE_USER_STATISTIC = {
  _id: "6823156487dcae27865d3359",
  title: "get detail course user statistic",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67aad740a67aaa1951ca64b0"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "677f6b3da3131eb0d3f9906d"
    }
  },
  {
    "$lookup": {
      "from": "mge-course-member",
      "localField": "user",
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "677f6b3da3131eb0d3f9906d",
            "status": "joined"
          }
        }
      ],
      "as": "course_joined"
    }
  },
  {
    "$addFields": {
      "total_course": {
        "$size": "$course_joined"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-course-member",
      "localField": "user",
      "foreignField": "created_by",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "677f6b3da3131eb0d3f9906d",
            "status": "joined",
            "is_finished": true
          }
        }
      ],
      "as": "is_course_finished"
    }
  },
  {
    "$addFields": {
      "total_course_finished": {
        "$size": "$is_course_finished"
      }
    }
  },
  {
    "$addFields": {
      "avg_completion_rate": {
        "$cond": [
          {
            "$gt": [
              "$total_course",
              0
            ]
          },
          {
            "$multiply": [
              {
                "$divide": [
                  "$total_course_finished",
                  "$total_course"
                ]
              },
              100
            ]
          },
          0
        ]
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussions",
      "localField": "user",
      "foreignField": "created_by",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "677f6b3da3131eb0d3f9906d"
          }
        }
      ],
      "as": "total_discussions"
    }
  },
  {
    "$addFields": {
      "total_discussions": {
        "$size": "$total_discussions"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-comment",
      "localField": "user",
      "foreignField": "created_by",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "677f6b3da3131eb0d3f9906d"
          }
        }
      ],
      "as": "total_comments"
    }
  },
  {
    "$addFields": {
      "total_comments": {
        "$size": "$total_comments"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-like",
      "localField": "user",
      "foreignField": "created_by",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "677f6b3da3131eb0d3f9906d"
          }
        }
      ],
      "as": "discussion_liked"
    }
  },
  {
    "$addFields": {
      "discussion_liked": {
        "$size": "$discussion_liked"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-comment-like",
      "localField": "user",
      "foreignField": "created_by",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "677f6b3da3131eb0d3f9906d"
          }
        }
      ],
      "as": "discussion_comment_liked"
    }
  },
  {
    "$addFields": {
      "discussion_comment_liked": {
        "$size": "$discussion_comment_liked"
      }
    }
  },
  {
    "$addFields": {
      "total_likes": {
        "$add": [
          "$discussion_liked",
          "$discussion_comment_liked"
        ]
      }
    }
  },
  {
    "$addFields": {
      "interaction_score": {
        "$add": [
          {
            "$multiply": [
              "$total_discussions",
              5
            ]
          },
          {
            "$multiply": [
              "$total_comments",
              3
            ]
          },
          {
            "$multiply": [
              "$total_likes",
              1
            ]
          }
        ]
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-user-learning-path",
      "localField": "user",
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "677f6b3da3131eb0d3f9906d"
          }
        }
      ],
      "as": "total_learning_paths"
    }
  },
  {
    "$addFields": {
      "total_learning_paths": {
        "$size": "$total_learning_paths"
      }
    }
  },
  {
    "$project": {
      "user": 1,
      "total_course": 1,
      "avg_completion_rate": 1,
      "pass_rate": 1,
      "total_discussions": 1,
      "total_comments": 1,
      "total_likes": 1,
      "interaction_score": 1,
      "total_learning_paths": 1,
      "tenant_id": 1
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
    "key": "email",
    "value": "email"
  },
  {
    "key": "user",
    "value": "user"
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
  id: "6823156487dcae27865d3359",
} as const;

export type GetDetailCourseUserStatisticConfig = typeof GET_DETAIL_COURSE_USER_STATISTIC;