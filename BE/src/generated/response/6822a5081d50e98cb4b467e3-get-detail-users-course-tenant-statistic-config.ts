export const GET_DETAIL_USERS_COURSE_TENANT_STATISTIC = {
  _id: "6822a5081d50e98cb4b467e3",
  title: "get detail user's course tenant statistic",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67aad740a67aaa1951ca64b0"
],
  queryAdvance: `[
  {
    "$match": {
      "user": "@jwt:user.id",
      "tenant_id": "@header:x-tenant-id"
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
            "tenant_id": "@header:x-tenant-id",
            "status": "joined"
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
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id",
            "status": "joined"
          }
        }
      ],
      "as": "all_course_joined"
    }
  },
  {
    "$addFields": {
      "all_course_joined": {
        "$size": "$all_course_joined"
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
            "tenant_id": "@header:x-tenant-id",
            "status": "joined",
            "is_finished": true
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
        "$multiply": [
          {
            "$divide": [
              "$total_course_finished",
              "$all_course_joined"
            ]
          },
          100
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
            "tenant_id": "@header:x-tenant-id"
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
            "tenant_id": "@header:x-tenant-id"
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
            "tenant_id": "@header:x-tenant-id"
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
            "tenant_id": "@header:x-tenant-id"
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
            "tenant_id": "@header:x-tenant-id"
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
      "user._id": {
        "$first": "$user"
      },
      "user.email": "$email",
      "user.full_name": {
        "$concat": [
          {
            "$ifNull": [
              "$profile.last_name",
              ""
            ]
          },
          " ",
          {
            "$ifNull": [
              "$profile.first_name",
              ""
            ]
          }
        ]
      },
      "user.featured_image": "$profile.course.featured_image",
      "user.cover": "$profile.course.cover",
      "user.birthday": "$profile.course.birthday",
      "user.description": "$profile.course.description",
      "user.department": "$profile.course.department",
      "user.team": "$profile.course.team",
      "user.job_position": "$profile.course.job_position",
      "total_course": 1,
      "avg_completion_rate": 1,
      "pass_rate": 1,
      "total_discussions": 1,
      "total_comments": 1,
      "total_likes": 1,
      "interaction_score": 1,
      "total_learning_paths": 1
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
  id: "6822a5081d50e98cb4b467e3",
} as const;

export type GetDetailUsersCourseTenantStatisticConfig = typeof GET_DETAIL_USERS_COURSE_TENANT_STATISTIC;