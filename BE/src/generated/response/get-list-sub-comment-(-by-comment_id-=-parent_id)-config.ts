export const GET_LIST_SUB_COMMENT_(_BY_COMMENT_ID_&#x3D;_PARENT_ID) = {
  _id: "677b8ad4b664f6a424540dd6",
  title: "Get list sub comment ( by comment_id = parent_id)",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6764e3926e57acaf6815ab97"
],
  queryAdvance: `[
  {
    "$match": {
      "parent_id": "@param:comment_id",
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$lookup": {
      "from": "media",
      "let": {
        "attachmentsIds": {
          "$cond": {
            "if": {
              "$and": [
                {
                  "$isArray": "$attachments"
                },
                {
                  "$gt": [
                    {
                      "$size": "$attachments"
                    },
                    0
                  ]
                }
              ]
            },
            "then": {
              "$map": {
                "input": "$attachments",
                "as": "attId",
                "in": {
                  "$toObjectId": "$$attId"
                }
              }
            },
            "else": []
          }
        }
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$in": [
                "$_id",
                "$$attachmentsIds"
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
      "as": "attachments"
    }
  },
  {
    "$addFields": {
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-tweet-comment",
      "let": {
        "id": "$id"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                [
                  "$$id"
                ],
                "$parent_id"
              ]
            }
          }
        },
        {
          "$addFields": {
            "id": {
              "$toString": "$_id"
            }
          }
        }
      ],
      "as": "sub_comments"
    }
  },
  {
    "$addFields": {
      "sub_comment_quantity": {
        "$size": "$sub_comments"
      }
    }
  },
  {
    "$project": {
      "sub_comments": 0
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
                "$profile.last_name",
                " ",
                "$profile.first_name"
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
    "$lookup": {
      "from": "mge-entity-like",
      "localField": "id",
      "foreignField": "entity_id",
      "as": "liked_info"
    }
  },
  {
    "$addFields": {
      "like_count": {
        "$size": "$liked_info"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-entity-like",
      "let": {
        "currentId": "$id",
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
      "as": "liked"
    }
  },
  {
    "$addFields": {
      "liked": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": "$liked"
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
    "$sort": {
      "created_at": -1
    }
  },
  {
    "$facet": {
      "meta_data": [
        {
          "$count": "count" // Tổng số bản ghi thực sự không chịu ảnh hưởng của skip/limit
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
  params: [
  {
    "value": "tweet_id",
    "key": "tweet_id"
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
    "value": "comment_id",
    "key": "comment_id"
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
    "key": "parent_id",
    "value": "parent_id"
  },
  {
    "key": "content",
    "value": "content"
  },
  {
    "key": "tweet",
    "value": "tweet"
  },
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "like_count",
    "value": "like_count"
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
  id: "677b8ad4b664f6a424540dd6",
} as const;

export type GetListSubCommentByCommentIdParentIdConfig = typeof GET_LIST_SUB_COMMENT_(_BY_COMMENT_ID_&#x3D;_PARENT_ID);