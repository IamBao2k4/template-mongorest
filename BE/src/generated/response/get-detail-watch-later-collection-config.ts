export const GET_DETAIL_WATCH_LATER_COLLECTION = {
  _id: "67c42946cb2d3f0de0484c61",
  title: "Get detail watch later collection",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "675b9a4a9279b9d81247c3cc"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "created_by": "@jwt:user.id",
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
      ]
    }
  },
  {
    "$addFields": {
      "tweet_id_object": {
        "$toObjectId": "$tweet_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-tweet",
      "localField": "tweet_id_object",
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
      "tweet_count": {
        "$size": "$tweet_saved"
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "title": 1,
      "tweet_count": 1,
      "featured_image": 1,
      "tweet_saved": 1,
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

export type GetDetailWatchLaterCollectionConfig = typeof GET_DETAIL_WATCH_LATER_COLLECTION;