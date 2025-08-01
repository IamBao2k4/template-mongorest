export const GET_DETAIL_USERS_COURSE_STATISTIC = {
  _id: "6822c6d61d50e98cb4b496cc",
  title: "get detail user's course statistic",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67853fcd4c9747dfaeed5f84"
],
  queryAdvance: `[
  {
    "$match": {
      "course": "@param:course_id",
      "user": "@param:user_id"
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "user",
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id"
          }
        }
      ],
      "as": "user_profile"
    }
  },
  {
    "$unwind": {
      "path": "$user_profile",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$lookup": {
      "from": "mge-course-user-progress",
      "localField": "course",
      "foreignField": "course",
      "pipeline": [
        {
          "$match": {
            "user": "@param:user_id"
          }
        },
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$or": [
                    {
                      "$and": [
                        {
                          "$ne": [
                            "@param:start_date",
                            null
                          ]
                        },
                        {
                          "$ne": [
                            "@param:end_date",
                            null
                          ]
                        },
                        {
                          "$and": [
                            {
                              "$gte": [
                                "$created_at",
                                {
                                  "$toDate": "@param:start_date"
                                }
                              ]
                            },
                            {
                              "$lte": [
                                "$created_at",
                                {
                                  "$toDate": "@param:end_date"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "$or": [
                        {
                          "$eq": [
                            "@param:start_date",
                            null
                          ]
                        },
                        {
                          "$eq": [
                            "@param:end_date",
                            null
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      ],
      "as": "completed_lessons"
    }
  },
  {
    "$addFields": {
      "completed_lessons": {
        "$size": "$completed_lessons"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-lessons",
      "localField": "course",
      "foreignField": "course",
      "pipeline": [
        {
          "$match": {
            "status": "active"
          }
        }
      ],
      "as": "total_lessons"
    }
  },
  {
    "$addFields": {
      "total_lessons": {
        "$size": "$total_lessons"
      }
    }
  },
  {
    "$addFields": {
      "completion_rate": {
        "$cond": [
          {
            "$gt": [
              "$total_lessons",
              0
            ]
          },
          {
            "$multiply": [
              {
                "$divide": [
                  "$completed_lessons",
                  "$total_lessons"
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
      "from": "mge-exams",
      "localField": "course",
      "foreignField": "course",
      "pipeline": [
        {
          "$match": {
            "tenant": "@header:x-tenant_id",
            "is_final_exam": true
          }
        },
        {
          "$addFields": {
            "_id": {
              "$toString": "$_id"
            }
          }
        },
        {
          "$lookup": {
            "from": "mge-user-exam-result",
            "localField": "_id",
            "foreignField": "exam",
            "pipeline": [
              {
                "$match": {
                  "created_by": "@param:user_id"
                }
              },
              {
                "$project": {
                  "total_score": 1
                }
              }
            ],
            "as": "user_final_exam"
          }
        },
        {
          "$unwind": {
            "path": "$user_final_exam",
            "preserveNullAndEmptyArrays": true
          }
        }
      ],
      "as": "final_exam_score"
    }
  },
  {
    "$unwind": {
      "path": "$final_exam_score",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$addFields": {
      "final_exam_score": {
        "$cond": {
          "if": {
            "$or": [
              {
                "$eq": [
                  "$final_exam_score.user_final_exam.total_score",
                  null
                ]
              },
              {
                "$eq": [
                  "$final_exam_score.user_final_exam.total_score",
                  ""
                ]
              },
              {
                "$not": [
                  "$final_exam_score.user_final_exam.total_score"
                ]
              }
            ]
          },
          "then": "Chưa làm",
          "else": "$final_exam_score.user_final_exam.total_score"
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-user-exam-result",
      "localField": "user",
      "foreignField": "created_by",
      "pipeline": [
        {
          "$match": {
            "status": "finished",
            "total_score": {
              "$type": "number"
            }
          }
        },
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$or": [
                    {
                      "$and": [
                        {
                          "$ne": [
                            "@param:start_date",
                            null
                          ]
                        },
                        {
                          "$ne": [
                            "@param:end_date",
                            null
                          ]
                        },
                        {
                          "$and": [
                            {
                              "$gte": [
                                "$created_at",
                                {
                                  "$toDate": "@param:start_date"
                                }
                              ]
                            },
                            {
                              "$lte": [
                                "$created_at",
                                {
                                  "$toDate": "@param:end_date"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "$or": [
                        {
                          "$eq": [
                            "@param:start_date",
                            null
                          ]
                        },
                        {
                          "$eq": [
                            "@param:end_date",
                            null
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        },
        {
          "$sort": {
            "created_at": 1
          }
        }
      ],
      "as": "user_exams"
    }
  },
  {
    "$addFields": {
      "progress_percentage": {
        "$cond": {
          "if": {
            "$gte": [
              {
                "$size": "$user_exams"
              },
              2
            ]
          },
          "then": {
            "$subtract": [
              {
                "$arrayElemAt": [
                  "$user_exams.total_score",
                  {
                    "$subtract": [
                      {
                        "$size": "$user_exams"
                      },
                      1
                    ]
                  }
                ]
              },
              {
                "$arrayElemAt": [
                  "$user_exams.total_score",
                  0
                ]
              }
            ]
          },
          "else": 0
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussions",
      "localField": "course",
      "foreignField": "course",
      "pipeline": [
        {
          "$match": {
            "created_by": "@param:user_id"
          }
        },
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$or": [
                    {
                      "$and": [
                        {
                          "$ne": [
                            "@param:start_date",
                            null
                          ]
                        },
                        {
                          "$ne": [
                            "@param:end_date",
                            null
                          ]
                        },
                        {
                          "$and": [
                            {
                              "$gte": [
                                "$created_at",
                                {
                                  "$toDate": "@param:start_date"
                                }
                              ]
                            },
                            {
                              "$lte": [
                                "$created_at",
                                {
                                  "$toDate": "@param:end_date"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "$or": [
                        {
                          "$eq": [
                            "@param:start_date",
                            null
                          ]
                        },
                        {
                          "$eq": [
                            "@param:end_date",
                            null
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      ],
      "as": "discussions_created"
    }
  },
  {
    "$addFields": {
      "discussions_created": {
        "$size": "$discussions_created"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-comment",
      "let": {
        "tenantId": "$tenant_id",
        "userId": "$user",
        "courseId": "$course"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$eq": [
                    "$tenant_id",
                    "$$tenantId"
                  ]
                },
                {
                  "$in": [
                    "$created_by",
                    "$$userId"
                  ]
                }
              ]
            }
          }
        },
        {
          "$lookup": {
            "from": "mge-discussions",
            "let": {
              "courseId": "$$courseId",
              "discussionId": "$discussion"
            },
            "pipeline": [
              {
                "$addFields": {
                  "_id": {
                    "$toString": "$_id"
                  }
                }
              },
              {
                "$match": {
                  "$expr": {
                    "$and": [
                      {
                        "$eq": [
                          [
                            "$_id"
                          ],
                          "$$discussionId"
                        ]
                      },
                      {
                        "$eq": [
                          "$course",
                          "$$courseId"
                        ]
                      }
                    ]
                  }
                }
              }
            ],
            "as": "is_course_discussion"
          }
        },
        {
          "$match": {
            "is_course_discussion": {
              "$ne": []
            }
          }
        },
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$or": [
                    {
                      "$and": [
                        {
                          "$ne": [
                            "@param:start_date",
                            null
                          ]
                        },
                        {
                          "$ne": [
                            "@param:end_date",
                            null
                          ]
                        },
                        {
                          "$and": [
                            {
                              "$gte": [
                                "$created_at",
                                {
                                  "$toDate": "@param:start_date"
                                }
                              ]
                            },
                            {
                              "$lte": [
                                "$created_at",
                                {
                                  "$toDate": "@param:end_date"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "$or": [
                        {
                          "$eq": [
                            "@param:start_date",
                            null
                          ]
                        },
                        {
                          "$eq": [
                            "@param:end_date",
                            null
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      ],
      "as": "comments_created"
    }
  },
  {
    "$addFields": {
      "comments_created": {
        "$size": "$comments_created"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-like",
      "let": {
        "userId": "$user",
        "courseId": "$course"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$in": [
                "$created_by",
                "$$userId"
              ]
            }
          }
        },
        {
          "$lookup": {
            "from": "mge-discussions",
            "let": {
              "courseId": "$$courseId",
              "discussionId": "$discussion"
            },
            "pipeline": [
              {
                "$addFields": {
                  "_id": {
                    "$toString": "$_id"
                  }
                }
              },
              {
                "$match": {
                  "$expr": {
                    "$and": [
                      {
                        "$in": [
                          "$_id",
                          "$$discussionId"
                        ]
                      },
                      {
                        "$eq": [
                          "$course",
                          "$$courseId"
                        ]
                      }
                    ]
                  }
                }
              }
            ],
            "as": "is_course_discussion"
          }
        },
        {
          "$match": {
            "is_course_discussion": {
              "$ne": []
            }
          }
        },
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$or": [
                    {
                      "$and": [
                        {
                          "$ne": [
                            "@param:start_date",
                            null
                          ]
                        },
                        {
                          "$ne": [
                            "@param:end_date",
                            null
                          ]
                        },
                        {
                          "$and": [
                            {
                              "$gte": [
                                "$created_at",
                                {
                                  "$toDate": "@param:start_date"
                                }
                              ]
                            },
                            {
                              "$lte": [
                                "$created_at",
                                {
                                  "$toDate": "@param:end_date"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "$or": [
                        {
                          "$eq": [
                            "@param:start_date",
                            null
                          ]
                        },
                        {
                          "$eq": [
                            "@param:end_date",
                            null
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      ],
      "as": "discussion_like_created"
    }
  },
  {
    "$addFields": {
      "discussion_like_created": {
        "$size": "$discussion_like_created"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-comment-like",
      "let": {
        "userId": "$user",
        "courseId": "$course"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$in": [
                "$created_by",
                "$$userId"
              ]
            }
          }
        },
        {
          "$lookup": {
            "from": "mge-discussion-comment",
            "let": {
              "courseId": "$$courseId",
              "commentId": "$comment"
            },
            "pipeline": [
              {
                "$addFields": {
                  "_id": {
                    "$toString": "$_id"
                  }
                }
              },
              {
                "$match": {
                  "$expr": {
                    "$and": [
                      {
                        "$in": [
                          "$_id",
                          "$$commentId"
                        ]
                      }
                    ]
                  }
                }
              },
              {
                "$lookup": {
                  "from": "mge-discussions",
                  "let": {
                    "courseId": "$$courseId",
                    "discussionId": "$discussion"
                  },
                  "pipeline": [
                    {
                      "$addFields": {
                        "_id": {
                          "$toString": "$_id"
                        }
                      }
                    },
                    {
                      "$match": {
                        "$expr": {
                          "$and": [
                            {
                              "$in": [
                                "$_id",
                                "$$discussionId"
                              ]
                            },
                            {
                              "$eq": [
                                "$course",
                                "$$courseId"
                              ]
                            }
                          ]
                        }
                      }
                    }
                  ],
                  "as": "is_course_discussion"
                }
              },
              {
                "$match": {
                  "is_course_discussion": {
                    "$ne": []
                  }
                }
              }
            ],
            "as": "is_comment_discussion"
          }
        },
        {
          "$match": {
            "is_comment_discussion": {
              "$ne": []
            }
          }
        },
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$or": [
                    {
                      "$and": [
                        {
                          "$ne": [
                            "@param:start_date",
                            null
                          ]
                        },
                        {
                          "$ne": [
                            "@param:end_date",
                            null
                          ]
                        },
                        {
                          "$and": [
                            {
                              "$gte": [
                                "$created_at",
                                {
                                  "$toDate": "@param:start_date"
                                }
                              ]
                            },
                            {
                              "$lte": [
                                "$created_at",
                                {
                                  "$toDate": "@param:end_date"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "$or": [
                        {
                          "$eq": [
                            "@param:start_date",
                            null
                          ]
                        },
                        {
                          "$eq": [
                            "@param:end_date",
                            null
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          }
        }
      ],
      "as": "discussion_comment_like_created"
    }
  },
  {
    "$addFields": {
      "discussion_comment_like_created": {
        "$size": "$discussion_comment_like_created"
      }
    }
  },
  {
    "$addFields": {
      "likes_created": {
        "$add": [
          "$discussion_like_created",
          "$discussion_comment_like_created"
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
              "$discussions_created",
              5
            ]
          },
          {
            "$multiply": [
              "$comments_created",
              3
            ]
          },
          {
            "$multiply": [
              "$likes_created",
              1
            ]
          }
        ]
      }
    }
  },
{
  "$lookup": {
    "from": "mge-course-member",
    "let": {
      "userId": "$user",
      "courseId": "$course"
    },
    "pipeline": [
      {
        "$match": {
          "$expr": {
            "$and": [
              { "$eq": ["$user", "$$userId"] },
              { "$eq": ["$course", "$$courseId"] }
            ]
          }
        }
      },
      {
        "$project": {
          "start_learning_time": 1,
          "end_learning_time": 1
        }
      }
    ],
    "as": "course_member_info"
  }
},
{
  "$unwind": {
    "path": "$course_member_info",
    "preserveNullAndEmptyArrays": true
  }
},
{
  "$addFields": {
    "completion_time": {
      "$cond": {
        "if": {
          "$and": [
            { "$ne": ["$course_member_info.start_learning_time", null] },
            { "$ne": ["$course_member_info.end_learning_time", null] }
          ]
        },
        "then": {
          "$divide": [
            {
              "$subtract": [
                "$course_member_info.end_learning_time",
                "$course_member_info.start_learning_time"
              ]
            },
            3600000 // convert to hours
          ]
        },
        "else": "null"
      }
    }
  }
},
  {
    "$lookup": {
      "from": "mge-courses",
      "localField": "course",
      "foreignField": "id",
      "as": "course_info"
    }
  },
{
  "$addFields": {
    "learning_status": {
      "$cond": {
        "if": {
          "$or": [
            { "$not": ["$start_learning_time"] },
            { "$not": ["$end_learning_time"] }
          ]
        },
        "then": "not_completed",
        "else": {
          "$cond": {
            "if": {
              "$or": [
                { "$eq": ["$course_info.time_to_complete", null] },
                { "$not": ["$course_info.time_to_complete"] }
              ]
            },
            "then": "on_time",
            "else": {
              "$cond": {
                "if": { "$gt": ["$completion_time", "$course_info.time_to_complete"] },
                "then": "late",
                "else": {
                  "$cond": {
                    "if": { "$lt": ["$completion_time", "$course_info.time_to_complete"] },
                    "then": "fast",
                    "else": "on_time"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
},
  {
    "$project": {
      "user._id": "$user_profile._id",
      "user.email": "$user_profile.email",
      "user.full_name": {
        "$concat": [
          {
            "$ifNull": [
              "$user_profile.profile.last_name",
              ""
            ]
          },
          " ",
          {
            "$ifNull": [
              "user_profile.profile.first_name",
              ""
            ]
          }
        ]
      },
      "user.featured_image": "$user_profile.profile.course.featured_image",
      "user.cover": "$user_profile.profile.course.cover",
      "user.birthday": "$user_profile.profile.course.birthday",
      "user.description": "$user_profile.profile.course.description",
      "user.department": "$user_profile.profile.course.department",
      "user.team": "$user_profile.profile.course.team",
      "user.job_position": "$user_profile.profile.course.job_position",
      "completed_lessons": 1,
      "completion_rate": 1,
      "final_exam_score": 1,
      "pass_status": 1,
      "completion_time": 1,
      "progress_percentage": 1,
      "discussions_created": 1,
      "comments_created": 1,
      "likes_created": 1,
      "interaction_score": 1,
      "learning_status":1,
      "total_lessons":1
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
    "value": "course_id",
    "key": "course_id"
  },
  {
    "value": "user_id",
    "key": "user_id"
  },
  {
    "value": "start_date",
    "key": "start_date"
  },
  {
    "value": "end_date",
    "key": "end_date"
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
  },
  {
    "value": "x-tenant_id",
    "key": "x-tenant_id"
  }
],
  restricted: [
  {
    "key": "course",
    "value": "course"
  },
  {
    "key": "user",
    "value": "user"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "role",
    "value": "role"
  },
  {
    "key": "is_finished",
    "value": "is_finished"
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
  id: "6822c6d61d50e98cb4b496cc",
} as const;

export type GetDetailUsersCourseStatisticConfig = typeof GET_DETAIL_USERS_COURSE_STATISTIC;