export const GET_DETAIL_TWEET = {
  _id: "67683d2f6e57acaf6815b622",
  title: "Get detail tweet",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67b6a286606da18e6c1976f1"
],
  queryAdvance: `[
  {
    "$addFields": {
      "tweet_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "$or": [
        {
          "slug": "@param:slug"
        },
        {
          "tweet_id": "@param:tweet_id"
        },
        {
          "tweet_id": "@param:_id"
        }
      ]
    }
  },
  {
    "$addFields": {
      "tag": {
        "$map": {
          "input": "$tag",
          "as": "u",
          "in": {
            "$toObjectId": "$$u"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-social-tag",
      "localField": "tag",
      "foreignField": "_id",
      "as": "tag"
    }
  },
  {
    "$facet": {
      "files": [
        {
          "$match": {
            "type": "file"
          }
        },
        {
          "$unwind": {
            "path": "$attachments",
            "preserveNullAndEmptyArrays": true
          }
        },
        {
          "$lookup": {
            "from": "media",
            "let": {
              "attachmentId": {
                "$toObjectId": "$attachments.attachment"
              }
            },
            "pipeline": [
              {
                "$match": {
                  "$expr": {
                    "$eq": ["$_id", "$$attachmentId"]
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
            "as": "attachment_detail"
          }
        },
        {
          "$unwind": {
            "path": "$attachment_detail",
            "preserveNullAndEmptyArrays": true
          }
        },
        {
          "$addFields": {
            "attachments.attachment": "$attachment_detail"
          }
        },
        {
          "$group": {
            "_id": "$_id",
            "doc": {
              "$mergeObjects": "$$ROOT"
            },
            "attachments": {
              "$push": "$attachments"
            }
          }
        },
        {
          "$replaceRoot": {
            "newRoot": {
              "$mergeObjects": [
                "$doc",
                {
                  "attachments": "$attachments"
                }
              ]
            }
          }
        }
      ],
      "non_files": [
        {
          "$match": {
            "type": {
              "$ne": "file"
            }
          }
        }
      ]
    }
  },
  {
    "$project": {
      "all": {
        "$concatArrays": ["$files", "$non_files"]
      }
    }
  },
  {
    "$unwind": "$all"
  },
  {
    "$replaceRoot": {
      "newRoot": "$all"
    }
  },
  {
    "$facet": {
      "videos": [
        {
          "$match": {
            "type": "videos"
          }
        },
        {
          "$lookup": {
            "from": "media",
            "let": {
              "videoFileId": {
                "$arrayElemAt": ["$video_file", 0]
              }
            },
            "pipeline": [
              {
                "$match": {
                  "$expr": {
                    "$eq": [
                      "$_id",
                      {
                        "$toObjectId": "$$videoFileId"
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
            "as": "video_file"
          }
        }
      ],
      "non_videos": [
        {
          "$match": {
            "type": {
              "$ne": "videos"
            }
          }
        }
      ]
    }
  },
  {
    "$project": {
      "all": {
        "$concatArrays": ["$videos", "$non_videos"]
      }
    }
  },
  {
    "$unwind": "$all"
  },
  {
    "$replaceRoot": {
      "newRoot": "$all"
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
    "$addFields": {
      "groupObject": {
        "$map": {
          "input": "$social_group",
          "as": "u",
          "in": {
            "$toObjectId": "$$u"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-group",
      "localField": "groupObject",
      "foreignField": "_id",
      "as": "group"
    }
  },
  {
    "$addFields": {
      "categories": {
        "$map": {
          "input": "$categories",
          "as": "u",
          "in": {
            "$toObjectId": "$$u"
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
    "$addFields": {
      "joined": {
        "$cond": {
          "if": {
            "$or": [
              {
                "$eq": ["$member_status.status", ["joined"]]
              },
              {
                "$eq": ["$member_status.status", [["joined"]]]
              }
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
      "localField": "tweet_id",
      "foreignField": "entity_id",
      "pipeline": [
        {
          "$match": {
            "created_by": "@jwt:user.id"
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
      "from": "mge-tweet-saved",
      "let": {
        "currentId": "$tweet_id",
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
      "localField": "tweet_id",
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
    "$project": {
      "comment": 0
    }
  },
  {
    "$lookup": {
      "from": "mge-user-vote-result",
      "localField": "tweet_id",
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
      "localField": "tweet_id",
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
    "value": "slug",
    "key": "slug"
  },
  {
    "value": "tweet_id",
    "key": "tweet_id"
  },
  {
    "value": "_id",
    "key": "_id"
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
  }
],
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "type",
    "value": "type"
  },
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "like_count",
    "value": "like_count"
  },
  {
    "key": "comment_count",
    "value": "comment_count"
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
  id: "67683d2f6e57acaf6815b622",
} as const;

export type GetDetailTweetConfig = typeof GET_DETAIL_TWEET;