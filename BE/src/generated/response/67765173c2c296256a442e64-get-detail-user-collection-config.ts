export const GET_DETAIL_USER_COLLECTION = {
  _id: "67765173c2c296256a442e64",
  title: "get detail user collection",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "675b99f99279b9d81247c3ba"
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
      "created_by": "@jwt:user.id",
      "_id": "@param:_id",
      "tenant_id": "@header:x-tenant-id"
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
                  "tenant_id":"@header:x-tenant-id"
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
    "$addFields": {
      "tweet_count": {
        "$size": "$tweet_saved"
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
  params: [
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
  restricted: [],
  id: "",
} as const;

export type GetDetailUserCollectionConfig = typeof GET_DETAIL_USER_COLLECTION;