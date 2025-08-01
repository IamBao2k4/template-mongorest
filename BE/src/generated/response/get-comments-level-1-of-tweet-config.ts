export const GET_COMMENTS_LEVEL_1_OF_TWEET = {
  _id: "677b434df99e7327567de020",
  title: "Get comments level 1 of tweet",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6764e3926e57acaf6815ab97"
],
  queryAdvance: `[
  {
    "$match": {
      "tweet": "@param:tweet_id",
      "$or": [
        { "parent_id": null },
        { "parent_id": { "$size": 0 } },
        { "parent_id": { "$exists": false } }
      ]
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
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  data: {
  "id": "f12290ab-5c35-4ab6-b9bd-70df2c60379e",
  "rules": [],
  "combinator": "and",
  "not": false
},
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
  id: "677b434df99e7327567de020",
} as const;

export type GetCommentsLevel1OfTweetConfig = typeof GET_COMMENTS_LEVEL_1_OF_TWEET;