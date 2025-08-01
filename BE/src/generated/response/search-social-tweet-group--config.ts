export const SEARCH_SOCIAL_TWEET_GROUP_ = {
  _id: "67befe3f22351d6c715292e3",
  title: "search social tweet group ",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67b6a286606da18e6c1976f1"
],
  queryAdvance: `[
  {
    "$match": {
      "title": {
        "$regex": "@param:search",
        "$options": "i"
      }
    }
  },
  {
    "$addFields": {
      "collection_name": "mge-tweet"
    }
  },
  {
    "$lookup": {
      "from": "mge-group",
      "let": {
        "social_group_ids": {
          "$map": {
            "input": "$social_group",
            "as": "sg",
            "in": {
              "$toObjectId": "$$sg"
            }
          }
        }
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$in": [
                "$_id",
                "$$social_group_ids"
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
        },
        {
          "$lookup": {
            "from": "mge-group-member",
            "localField": "id",
            "foreignField": "social_group",
            "as": "group_members",
            "pipeline": [
              {
                "$match": {
                  "user": "@jwt:user.id"
                }
              },
              {
                "$set": {
                  "user": {
                    "$map": {
                      "input": "$user",
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
                  "from": "user",
                  "localField": "user",
                  "foreignField": "_id",
                  "as": "user"
                }
              },
              {
                "$unwind": "$user"
              },
              {
                "$set": {
                  "user.featured_image": {
                    "$map": {
                      "input": "$user.featured_image",
                      "as": "img",
                      "in": {
                        "$toObjectId": "$$img"
                      }
                    }
                  }
                }
              },
              {
                "$lookup": {
                  "from": "media",
                  "localField": "user.featured_image",
                  "foreignField": "_id",
                  "as": "user.media_info"
                }
              },
              {
                "$addFields": {
                  "user.media_info": {
                    "$arrayElemAt": [
                      "$user.media_info",
                      0
                    ]
                  }
                }
              },
              {
                "$addFields": {
                  "user.featured_image": {
                    "$cond": {
                      "if": {
                        "$gt": [
                          {
                            "$size": "$user.featured_image"
                          },
                          0
                        ]
                      },
                      "then": {
                        "_id": {
                          "$arrayElemAt": [
                            "$user.featured_image",
                            0
                          ]
                        },
                        "filename": "$user.media_info.filename",
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
                            "$user.media_info.disk",
                            "/",
                            "$user.media_info.filename"
                          ]
                        }
                      },
                      "else": null
                    }
                  }
                }
              },
              {
                "$project": {
                  "_id": 1,
                  "social_group": 1,
                  "status": 1,
                  "role": 1,
                  "locale": 1,
                  "created_at": 1,
                  "created_by": 1,
                  "updated_at": 1,
                  "updated_by": 1,
                  "tenant_id": 1,
                  "isFollow": 1,
                  "user._id": 1,
                  "user.email": 1,
                  "user.username": 1,
                  "user.full_name": 1,
                  "user.featured_image": 1
                }
              }
            ]
          }
        },
        {
          "$match": {
            "$expr": {
              "$or": [
                {
                  "$eq": [
                    {
                      "$size": "$group_members"
                    },
                    1
                  ]
                },
                {
                  "$eq": [
                    "$type",
                    "public"
                  ]
                }
              ]
            }
          }
        },
        {
          "$addFields": {
            "collection_name": "mge-group"
          }
        }
      ],
      "as": "group_info"
    }
  },
  {
    "$unionWith": {
      "coll": "mge-group",
      "pipeline": [
        {
          "$match": {
            "title": {
              "$regex": "@param:search",
              "$options": "i"
            }
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
            "from": "mge-group-member",
            "localField": "id",
            "foreignField": "social_group",
            "as": "group_members",
            "pipeline": [
              {
                "$match": {
                  "user": "@jwt:user.id"
                }
              },
              {
                "$set": {
                  "user": {
                    "$toObjectId": "$user"
                  }
                }
              },
              {
                "$lookup": {
                  "from": "user",
                  "localField": "user",
                  "foreignField": "_id",
                  "as": "user"
                }
              },
              {
                "$unwind": "$user"
              },
              {
                "$set": {
                  "user.featured_image": {
                    "$map": {
                      "input": "$user.featured_image",
                      "as": "img",
                      "in": {
                        "$toObjectId": "$$img"
                      }
                    }
                  }
                }
              },
              {
                "$lookup": {
                  "from": "media",
                  "localField": "user.featured_image",
                  "foreignField": "_id",
                  "as": "user.media_info"
                }
              },
              {
                "$addFields": {
                  "user.media_info": {
                    "$arrayElemAt": [
                      "$user.media_info",
                      0
                    ]
                  }
                }
              },
              {
                "$addFields": {
                  "user.featured_image": {
                    "$cond": {
                      "if": {
                        "$gt": [
                          {
                            "$size": "$user.featured_image"
                          },
                          0
                        ]
                      },
                      "then": {
                        "_id": {
                          "$arrayElemAt": [
                            "$user.featured_image",
                            0
                          ]
                        },
                        "filename": "$user.media_info.filename",
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
                            "$user.media_info.disk",
                            "/",
                            "$user.media_info.filename"
                          ]
                        }
                      },
                      "else": null
                    }
                  }
                }
              },
              {
                "$project": {
                  "_id": 1,
                  "social_group": 1,
                  "status": 1,
                  "role": 1,
                  "locale": 1,
                  "created_at": 1,
                  "created_by": 1,
                  "updated_at": 1,
                  "updated_by": 1,
                  "tenant_id": 1,
                  "isFollow": 1,
                  "user._id": 1,
                  "user.email": 1,
                  "user.username": 1,
                  "user.full_name": 1,
                  "user.featured_image": 1
                }
              }
            ]
          }
        },
        {
          "$match": {
            "$expr": {
              "$or": [
                {
                  "$eq": [
                    {
                      "$size": "$group_members"
                    },
                    1
                  ]
                },
                {
                  "$eq": [
                    "$type",
                    "public"
                  ]
                }
              ]
            }
          }
        },
        {
          "$addFields": {
            "collection_name": "mge-group"
          }
        }
      ]
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
    "value": "search",
    "key": "search"
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
  headers: [],
  restricted: [],
  id: "",
} as const;

export type SearchSocialTweetGroup Config = typeof SEARCH_SOCIAL_TWEET_GROUP_;