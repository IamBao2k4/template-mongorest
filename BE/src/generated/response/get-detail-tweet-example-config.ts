export const GET_DETAIL_TWEET_EXAMPLE = {
  _id: "67ee019a8660ad558d91ee8a",
  title: "Get detail tweet example",
  note: "nhập mô tả cho response ở đây",
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
              "$concat": [
                "$profile.social.last_name",
                " ",
                "$profile.social.first_name"
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
                "$eq": [
                  "$member_status.status",
                  [
                    "joined"
                  ]
                ]
              },
              {
                "$eq": [
                  "$member_status.status",
                  [
                    [
                      "joined"
                    ]
                  ]
                ]
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
                  "$eq": [
                    "$entity_id",
                    "$$currentId"
                  ]
                },
                {
                  "$eq": [
                    "$created_by",
                    "$$userId"
                  ]
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
      "localField": "tweet_id",
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
                  "$eq": [
                    "$tweet_id",
                    "$$currentId"
                  ]
                },
                {
                  "$eq": [
                    "$created_by",
                    "$$userId"
                  ]
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
          "$arrayElemAt": [
            "$featured_image",
            0
          ]
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
                      "$eq": [
                        "minio",
                        "@app_settings:storage_type"
                      ]
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
                    "$concat": [
                      "$profile.social.last_name",
                      " ",
                      "$profile.social.first_name"
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
      "vote_info": {
        "$cond": {
          "if": {
            "$eq": [
              "$type",
              "votes"
            ]
          },
          "then": "$vote_info",
          "else": "$$REMOVE"
        }
      },
      "total_user_voted": {
        "$cond": {
          "if": {
            "$eq": [
              "$type",
              "votes"
            ]
          },
          "then": "$total_user_voted",
          "else": "$$REMOVE"
        }
      },
      "answers": {
        "$cond": {
          "if": {
            "$eq": [
              "$type",
              "votes"
            ]
          },
          "then": "$answers",
          "else": "$$REMOVE"
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
]`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetDetailTweetExampleConfig = typeof GET_DETAIL_TWEET_EXAMPLE;