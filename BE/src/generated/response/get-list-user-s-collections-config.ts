export const GET_LIST_USER_S_COLLECTIONS = {
  _id: "676a7019a188bea5e073db22",
  title: "Get list user's collections",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "675b99f99279b9d81247c3ba"
],
  queryAdvance: `[
  {
    "$match": {
      "created_by": "@jwt:user.id",
      "tenant_id": "@header:x-tenant-id"
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
      "from": "mge-tweet-saved",
      "localField": "_id",
      "foreignField": "user_collection",
      "pipeline": [
        {
          "$match": {
            "created_by": "@jwt:user.id",
            "tenant_id": "@header:x-tenant-id"
          }
        },
        {
          "$addFields": {
            "tweet_id": {
              "$toObjectId": "$tweet_id"
            }
          }
        },
        {
          "$lookup": {
            "from": "mge-tweet",
            "localField": "tweet_id",
            "foreignField": "_id",
            "pipeline": [
              {
                "$match": {
                  "status": "active",
                  "tenant_id": "@header:x-tenant-id"
                }
              }
            ],
            "as": "is_active"
          }
        },
        {
          "$match": {
            "is_active": {
              "$ne": []
            }
          }
        }
      ],
      "as": "tweet_saved"
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-saved",
      "pipeline": [
        {
          "$match": {
            "$or": [
              {
                "user_collection": {
                  "$exists": false
                }
              },
              {
                "user_collection": null
              },
              {
                "user_collection": {
                  "$size": 0
                }
              }
            ],
            "tenant_id": "@header:x-tenant-id",
            "created_by": "@jwt:user.id"
          }
        },
        {
          "$addFields": {
            "tweet_id": {
              "$toObjectId": "$tweet_id"
            }
          }
        },
        {
          "$lookup": {
            "from": "mge-tweet",
            "localField": "tweet_id",
            "foreignField": "_id",
            "pipeline": [
              {
                "$match": {
                  "status": "active",
                  "tenant_id": "@header:x-tenant-id"
                }
              }
            ],
            "as": "is_active"
          }
        },
        {
          "$match": {
            "is_active": {
              "$ne": []
            }
          }
        },
        {
          "$group": {
            "_id": "$created_by",
            "tweet_saved": {
              "$push": "$$ROOT"
            }
          }
        },
        {
          "$addFields": {
            "title": "Xem sau",
            "position": 0,
            "is_root": true
          }
        }
      ]
    }
  },
  {
    "$addFields": {
      "tweet_count": {
        "$size": "$tweet_saved"
      }
    }
  },
  {
    "$project": {
      "title": 1,
      "tweet_count": 1,
      "featured_image": 1,
      "tweet_saved": 1,
      "position": 1,
      "is_root": 1
    }
  },
  {
    "$match": {
      "$expr": {
        "$or": [
          {
            "$eq": [
              "@param:title",
              null
            ]
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
      "position": 1
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
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  },
  {
    "value": "title",
    "key": "title"
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  restricted: [],
  id: "",
} as const;

export type GetListUsersCollectionsConfig = typeof GET_LIST_USER_S_COLLECTIONS;