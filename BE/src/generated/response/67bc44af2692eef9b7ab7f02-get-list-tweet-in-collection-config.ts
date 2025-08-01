export const GET_LIST_TWEET_IN_COLLECTION = {
  _id: "67bc44af2692eef9b7ab7f02",
  title: "get list tweet in collection",
  method: "get-list",
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
      "_id":"@param:_id",
      "tenant_id":"@header:x-tenant-id"
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
            "created_by": "@jwt:user.id"
          }
        }
      ],
      "as": "tweet_saved"
    }
  },
  {
    "$unwind": {
      "path": "$tweet_saved",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$replaceRoot": {
      "newRoot": "$tweet_saved"
    }
  }, 
  {
    "$addFields": {
      "tweet_id": { "$toObjectId": "$tweet_id" }
    }
  },
  {
    "$lookup": {
      "from": "mge-tweet",
      "localField": "tweet_id",
      "foreignField": "_id",
      "as": "tweet_data"
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
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListTweetInCollectionConfig = typeof GET_LIST_TWEET_IN_COLLECTION;