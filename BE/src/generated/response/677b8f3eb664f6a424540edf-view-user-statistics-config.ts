export const VIEW_USER_STATISTICS = {
  _id: "677b8f3eb664f6a424540edf",
  title: "view user statistics",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6747ef07c47463d88f8c5ab1"
],
  queryAdvance: `[
  {
    "$match": {
      "_id": { "$exists": false }
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-image",
      "pipeline": [
        {
          "$addFields": {
            "type": "images"
          }
        }
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-videos",
      "pipeline": [
        {
          "$addFields": {
            "type": "videos"
          }
        }
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-news",
      "pipeline": [
        {
          "$addFields": {
            "type": "news"
          }
        }
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-votes",
      "pipeline": [
        {
          "$addFields": {
            "type": "votes"
          }
        }
      ]
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
    "$match": {
      "status": "active",
      "created_by": "@param:user_id"
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
      "pipeline": [
        {
          "$match": {
            "type": "public"
          }
        }
      ],
      "as": "groupData"
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
            "status": "joined"
          }
        }
      ],
      "as": "memberData"
    }
  },
  {
    "$match": {
      "$or": [
        { "groupData": { "$ne": [] } },
        { "memberData": { "$ne": [] } }
      ]
    }
  },
  {
    "$group": {
      "_id": "$created_by",
      "count": { "$sum": 1 }
    }
  },
  {
    "$project": {
      "_id": 0,
      "count": 1,
      "name": 1
    }
  },
  {
    "$addFields": {
      "name": {
        "$toString": "userCountPosts"
      }
    }
  },
  {
    "$unionWith": {
      "coll": "mge-user-follow",
      "pipeline": [
        {
          "$match": {
            "to": "@param:user_id"
          }
        },
        {
          "$group": {
            "_id": "$to",
            "count": { "$sum": 1 }
          }
        },
        {
          "$project": {
            "_id": 0,
            "count": 1,
            "name": 1
          }
        },
        {
          "$addFields": {
            "name": {
              "$toString": "userCountFollowers"
            }
          }
        }
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-group-member",
      "pipeline": [
        {
          "$match": {
            "user": "@param:user_id",
            "status": "joined"
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
                  "status": "joined"
                }
              }
            ],
            "as": "resultA"
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
            "pipeline": [
              {
                "$match": {
                  "type": "public"
                }
              }
            ],
            "as": "resultB"
          }
        },
        {
          "$match": {
            "$or": [
              { "resultA": { "$ne": [] } },
              { "resultB": { "$ne": [] } }
            ]
          }
        },
        {
          "$group": {
            "_id": "$to",
            "count": { "$sum": 1 }
          }
        },
        {
          "$project": {
            "_id": 0,
            "count": 1,
            "name": 1
          }
        },
        {
          "$addFields": {
            "name": {
              "$toString": "userCountGroups"
            }
          }
        }
      ]
    }
  },
  {
    "$facet": {
      "meta_data": [
        { "$count": "count" },
        {
          "$addFields": {
            "skip": "@param:skip",
            "limit": "@param:limit"
          }
        }
      ],
      "data": [
        { "$skip": "@param:skip" },
        { "$limit": "@param:limit" }
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
    "key": "",
    "value": "aas",
    "description": ""
  },
  {
    "key": "",
    "value": "",
    "description": ""
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type ViewUserStatisticsConfig = typeof VIEW_USER_STATISTICS;