export const GET_GROUP_DETAIL_TEMPLATE = {
  _id: "6760fea26f97c1a3464764a8",
  title: "Get group detail template",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6747ef07c47463d88f8c5ab1"
],
  queryAdvance: `[
    {
        "$addFields": {
            "_id": {
                "$toString": "$_id"
            }
        }
    },
    {
        "$match": {
            "_id": "@param:group_id",
            "tenant_id":"@header:x-tenant-id"
        }
    },
    {
        "$lookup": {
            "from": "media",
            "let": {
                "featuredImageId": {
                    "$arrayElemAt": [
                        "$cover",
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
            "as": "cover"
        }
    },
    {
        "$lookup": {
            "from": "mge-group-member",
            "localField": "_id",
            "foreignField": "social_group",
            "pipeline": [
              {
                "$match": {
                  "user":"@jwt:user.id",
                  "tenant_id":"@header:x-tenant-id"
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
            { "$eq": ["$member_status.status", ["joined"]] },
            { "$eq": ["$member_status.status", [["joined"]]] }
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
            "from": "mge-group-member",
            "localField": "_id",
            "foreignField": "social_group",
            "pipeline": [
                {
                    "$match": {
                      "status": "joined",
                      "tenant_id":"@header:x-tenant-id"
                    }
                },
                {
                    "$count": "member_count"
                }
            ],
            "as": "member_count"
        }
    },
    {
        "$addFields": {
            "member_count": {
                "$ifNull": [
                    {
                        "$arrayElemAt": [
                            "$member_count.member_count",
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
            "from": "mge-tweet-social-news",
            "localField": "_id",
            "foreignField": "social_group",
            "as": "news"
        }
    },
    {
        "$lookup": {
            "from": "mge-tweet-social-image",
            "localField": "_id",
            "foreignField": "social_group",
            "as": "images"
        }
    },
    {
        "$lookup": {
            "from": "mge-tweet-social-videos",
            "localField": "_id",
            "foreignField": "social_group",
            "as": "videos"
        }
    },
    {
        "$lookup": {
            "from": "mge-tweet-social-votes",
            "localField": "_id",
            "foreignField": "social_group",
            "as": "votes"
        }
    },
    {
        "$addFields": {
            "tweet_avaliable": {
                "$or": [
                    {
                        "$gt": [
                            {
                                "$size": "$news"
                            },
                            0
                        ]
                    },
                    {
                        "$gt": [
                            {
                                "$size": "$images"
                            },
                            0
                        ]
                    },
                    {
                        "$gt": [
                            {
                                "$size": "$videos"
                            },
                            0
                        ]
                    },
                    {
                        "$gt": [
                            {
                                "$size": "$votes"
                            },
                            0
                        ]
                    }
                ]
            }
        }
    },
    {
        "$addFields": {
            "tweet_count": {
                "$add": [
                    {
                        "$size": "$news"
                    },
                    {
                        "$size": "$images"
                    },
                    {
                        "$size": "$videos"
                    },
                    {
                        "$size": "$votes"
                    }
                ]
            }
        }
    },
    {
        "$project": {
            "news": 0,
            "votes": 0,
            "videos": 0,
            "images": 0
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
  body: [
  {
    "value": "social_group",
    "key": "social_group"
  }
],
  params: [
  {
    "value": {
      "key": "",
      "value": "group_id",
      "description": ""
    },
    "key": {
      "key": "",
      "value": "group_id",
      "description": ""
    }
  },
  {
    "value": {
      "key": "",
      "value": "",
      "description": ""
    },
    "key": {
      "key": "",
      "value": "",
      "description": ""
    }
  },
  {
    "value": "_id",
    "key": "_id"
  },
  {
    "value": "group_id",
    "key": "group_id"
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
    "value": "user.id",
    "key": "user.id"
  },
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  data: {
  "id": "7029c999-05ae-464f-a2f4-3a711922c74d",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type GetGroupDetailTemplateConfig = typeof GET_GROUP_DETAIL_TEMPLATE;