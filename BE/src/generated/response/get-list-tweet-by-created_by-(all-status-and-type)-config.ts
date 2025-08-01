export const GET_LIST_TWEET_BY_CREATED_BY_(ALL_STATUS_AND_TYPE) = {
  _id: "6764fab46e57acaf6815ae07",
  title: "Get list tweet by created_by (all status and type)",
  note: "Lấy danh sách bài viết của user (theo status được chọn trên param và all types), các group có thể lấy bài được. Api dành cho user muốn lấy ds tổng hợp các bài viết đã viết ở các group.",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6747ef07c47463d88f8c5ab1"
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
      "tenant_id": "@header:x-tenant-id",
      "status": "active"
    }
  },
  {
    "$lookup": {
      "from": "mge-group-member",
      "localField": "id",
      "foreignField": "social_group",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id",
            "status": "joined"
          }
        }
      ],
      "as": "group_members"
    }
  },
  {
    "$match": {
      "group_members": {
        "$ne": []
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-tweet",
      "let": {
        "groupId": {
          "$toString": "$_id"
        }
      },
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id",
            "$expr": {
              "$in": [
                "$$groupId",
                {
                  "$cond": {
                    "if": {
                      "$isArray": "$social_group"
                    },
                    "then": "$social_group",
                    "else": ["$social_group"]
                  }
                }
              ]
            }
          }
        }
      ],
      "as": "tweet"
    }
  },
  {
    "$addFields": {
      "contents": {
        "$concatArrays": ["$tweet"]
      }
    }
  },
  {
    "$unwind": "$contents"
  },
  {
    "$replaceRoot": {
      "newRoot": "$contents"
    }
  },
  {
    "$addFields": {
      "categories": {
        "$map": {
          "input": "$categories",
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
      "from": "mge-group-category",
      "localField": "categories",
      "foreignField": "_id",
      "as": "categories"
    }
  },
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
          "$addFields": {
            "full_name": {
              "$concat": ["$profile.last_name", " ", "$profile.first_name"]
            }
          }
        },
        {
          "$project": {
            "_id": "$user",
            "full_name": 1,
            "featured_image": "$profile.social.featured_image"
          }
        }
      ],
      "as": "user"
    }
  },
  {
    "$match": {
      "created_by": "@param:user_id",
      "$expr": {
        "$and": [
          {
            "$cond": {
              "if": {
                "$ne": ["@param:status[]", null]
              },
              "then": {
                "$or": [
                  {
                    "$in": ["$status", ["@param:status[]"]]
                  },
                  {
                    "$in": ["$status", [["@param:status[]"]]]
                  }
                ]
              },
              "else": true
            }
          },
          {
            "$cond": {
              "if": {
                "$ne": ["@param:type[]", null]
              },
              "then": {
                "$in": ["$type", "@param:type[]"]
              },
              "else": true
            }
          },
          {
            "$cond": {
              "if": {
                "$ne": ["@param:tag[]", null]
              },
              "then": {
                "$in": ["$tag", "@param:tag[]"]
              },
              "else": true
            }
          }
        ]
      }
    }
  },
  {
    "$addFields": {
      "social_group_object": {
        "$map": {
          "input": "$social_group",
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
      "from": "mge-group",
      "localField": "social_group_object",
      "foreignField": "_id",
      "pipeline": [
        {
          "$lookup": {
            "from": "media",
            "let": {
              "featuredImageId": {
                "$arrayElemAt": ["$cover", 0]
              }
            },
            "pipeline": [
              {
                "$match": {
                  "$expr": {
                    "$eq": [
                      "$_id",
                      {
                        "$toObjectId": "$$featuredImageId"
                      }
                    ]
                  }
                }
              },
              {
                "$addFields": {
                  "path": {
                    "$concat": [
                      {
                        "$cond": [
                          {
                            "$eq": ["minio", "@app_settings:storage_type"]
                          },
                          "@app_settings:minio.public",
                          "@app_settings:doSpace.public"
                        ]
                      },
                      "/",
                      "$disk",
                      "/",
                      "$filename"
                    ]
                  }
                }
              }
            ],
            "as": "cover"
          }
        }
      ],
      "as": "group"
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
      "from": "mge-entity-like",
      "let": {
        "currentId": "$_id",
        "userId": "@jwt:user.id"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$eq": ["$entity_id", "$$currentId"]
                },
                {
                  "$eq": ["$created_by", "$$userId"]
                }
              ]
            }
          }
        }
      ],
      "as": "liked_info"
    }
  },
  {
    "$addFields": {
      "liked": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": "$liked_info"
              },
              0
            ]
          },
          "then": true,
          "else": false
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-entity-like",
      "localField": "_id",
      "foreignField": "entity_id",
      "as": "liked_details"
    }
  },
  {
    "$addFields": {
      "like_count": {
        "$size": "$liked_details"
      }
    }
  },
  {
    "$addFields": {
      "joined": true
    }
  },
  {
    "$lookup": {
      "from": "mge-tweet-saved",
      "let": {
        "currentId": "$_id",
        "userId": "@jwt:user.id"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$eq": ["$tweet_id", "$$currentId"]
                },
                {
                  "$eq": ["$created_by", "$$userId"]
                }
              ]
            }
          }
        }
      ],
      "as": "saved_info"
    }
  },
  {
    "$addFields": {
      "saved": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": "$saved_info"
              },
              0
            ]
          },
          "then": true,
          "else": false
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-tweet-comment",
      "localField": "_id",
      "foreignField": "tweet",
      "as": "comment"
    }
  },
  {
    "$addFields": {
      "comment_count": {
        "$size": "$comment"
      }
    }
  },
  {
    "$project": {
      "comment": 0
    }
  },
  {
    "$lookup": {
      "from": "mge-group-member",
      "localField": "social_group",
      "foreignField": "social_group",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id",
            "tenant_id": "@header:x-tenant-id"
          }
        }
      ],
      "as": "member_status"
    }
  },
  {
    "$lookup": {
      "from": "media",
      "let": {
        "featuredImageId": {
          "$arrayElemAt": ["$featured_image", 0]
        }
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                "$_id",
                {
                  "$toObjectId": "$$featuredImageId"
                }
              ]
            }
          }
        },
        {
          "$addFields": {
            "path": {
              "$concat": [
                {
                  "$cond": [
                    {
                      "$eq": ["minio", "@app_settings:storage_type"]
                    },
                    "@app_settings:minio.public",
                    "@app_settings:doSpace.public"
                  ]
                },
                "/",
                "$disk",
                "/",
                "$filename"
              ]
            }
          }
        }
      ],
      "as": "featured_image"
    }
  },
  {
    "$lookup": {
      "from": "mge-user-vote-result",
      "localField": "_id",
      "foreignField": "tweet_id",
      "pipeline": [
        {
          "$lookup": {
            "from": "user-tenant-profile",
            "localField":"created_by",
            "foreignField":"user",
            "pipeline": [
            {
              "$match": {
                "tenant_id":"@header:x-tenant-id"
              }
            },
              {
                "$addFields": {
                  "full_name": {
                    "$concat": [
                      {
                        "$ifNull": ["$profile.last_name", ""]
                      },
                      {
                        "$cond": {
                          "if": {
                            "$and": [
                              {
                                "$ne": ["$profile.last_name", null]
                              },
                              {
                                "$ne": ["$profile.last_name", ""]
                              },
                              {
                                "$ne": ["$profile.first_name", null]
                              },
                              {
                                "$ne": ["$profile.first_name", ""]
                              }
                            ]
                          },
                          "then": " ",
                          "else": ""
                        }
                      },
                      {
                        "$ifNull": ["$profile.first_name", ""]
                      }
                    ]
                  }
                }
              },
              {
                "$project": {
                  "_id": "$user",
                  "full_name": 1,
                  "featured_image": "$profile.social.featured_image"
                }
              }
            ],
            "as": "user"
          }
        }
      ],
      "as": "vote_info"
    }
  },
  {
    "$addFields": {
      "total_user_voted": {
        "$size": "$vote_info"
      }
    }
  },
  {
    "$addFields": {
      "vote_info": {
        "$map": {
          "input": "$vote_info",
          "as": "vote",
          "in": {
            "$mergeObjects": [
              "$$vote",
              {
                "_id": {
                  "$toString": "$$vote._id"
                }
              }
            ]
          }
        }
      }
    }
  },
{
  "$addFields": {
    "answers": {
      "$map": {
        "input": "$answers",
        "as": "answer",
        "in": {
          "$mergeObjects": [
            "$$answer",
            {
              "total": {
                "$size": {
                  "$filter": {
                    "input": "$vote_info",
                    "as": "vote",
                    "cond": {
                      "$in": ["$$answer.id", "$$vote.answer"]
                    }
                  }
                }
              }
            },
            {
              "user_voted_info": {
                "$map": {
                  "input": {
                    "$filter": {
                      "input": { "$ifNull": ["$vote_info", []] },
                      "as": "user",
                      "cond": {
                        "$in": ["$$answer.id", "$$user.answer"]
                      }
                    }
                  },
    "as": "v",
    "in": {
      "$arrayElemAt": ["$$v.user", 0]
    }
                }
              }
            }
          ]
        }
      }
    }
  }
},
  {
    "$lookup": {
      "from": "mge-user-vote-result",
      "localField": "_id",
      "foreignField": "tweet_id",
      "pipeline": [
        {
          "$match": {
            "created_by": "@jwt:user.id",
            "tenant_id": "@header:x-tenant-id"
          }
        }
      ],
      "as": "my_voted_info"
    }
  },
  {
    "$addFields": {
      "voted": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": "$my_voted_info"
              },
              0
            ]
          },
          "then": true,
          "else": false
        }
      }
    }
  },
  {
    "$addFields": {
      "vote_info": {
        "$cond": {
          "if": {
            "$eq": ["$type", "votes"]
          },
          "then": "$vote_info",
          "else": "$$REMOVE"
        }
      },
      "total_user_voted": {
        "$cond": {
          "if": {
            "$eq": ["$type", "votes"]
          },
          "then": "$total_user_voted",
          "else": "$$REMOVE"
        }
      },
      "answers": {
        "$cond": {
          "if": {
            "$eq": ["$type", "votes"]
          },
          "then": "$answers",
          "else": "$$REMOVE"
        }
      },
      "voted": {
        "$cond": {
          "if": {
            "$eq": ["$type", "votes"]
          },
          "then": "$voted",
          "else": "$$REMOVE"
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-social-event-registration",
      "localField": "id",
      "foreignField": "tweet",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id",
            "tenant_id": "@header:x-tenant-id"
          }
        }
      ],
      "as": "event_registered"
    }
  },
  {
    "$addFields": {
      "event_registered": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": "$event_registered"
              },
              0
            ]
          },
          "then": true,
          "else": false
        }
      }
    }
  },
  {
    "$addFields": {
      "event_registered": {
        "$cond": {
          "if": {
            "$eq": ["$type", "event"]
          },
          "then": "$event_registered",
          "else": "$$REMOVE" // Xóa field nếu không phải vote
        }
      }
    }
  },
  {
    "$match": {
      "$expr": {
        "$or": [
          {
            "$eq": ["@param:title", null]
          },
          {
            "$regexMatch": {
              "input": "$title",
              "regex": "@param:title",
              "options": "i"
            }
          }
        ]
      }
    }
  },
  {
    "$sort": {
      "created_at": -1
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
]
`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "user_id",
    "key": "user_id"
  },
  {
    "value": "status[]",
    "key": "status[]"
  },
  {
    "value": "type[]",
    "key": "type[]"
  },
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  },
  {
    "value": "tag[]",
    "key": "tag[]"
  },
  {
    "value": "title",
    "key": "title"
  }
],
  headers: [
  {
    "value": "user.id",
    "key": "user.id"
  },
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  restricted: [
  {
    "key": "cover",
    "value": "cover"
  },
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "slug",
    "value": "slug"
  },
  {
    "key": "description",
    "value": "description"
  },
  {
    "key": "type",
    "value": "type"
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
  id: "6764fab46e57acaf6815ae07",
} as const;

export type GetListTweetByCreatedByAllStatusAndTypeConfig = typeof GET_LIST_TWEET_BY_CREATED_BY_(ALL_STATUS_AND_TYPE);