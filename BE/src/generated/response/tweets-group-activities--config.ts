export const TWEETS_GROUP_ACTIVITIES_ = {
  _id: "687df74efd278983cc3c3bd3",
  title: "tweets-group-activities ",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6764e3926e57acaf6815ab97"
],
  queryAdvance: `[
  {
    "$match": {
      "social_group": "@param:social_group",
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$match": {
      "$expr": {
        "$and": [
          {
            "$gte": [
              "$created_at",
              {
                "$dateFromString": {
                  "dateString": "@param:gte"
                }
              }
            ]
          },
          {
            "$lt": [
              "$created_at",
              {
                "$dateFromString": {
                  "dateString": "@param:lt"
                }
              }
            ]
          }
        ]
      }
    }
  },
  {
    "$group": {
      "_id": "$tweet",
      "comment_count": {
        "$sum": 1
      }
    }
  },
  {
    "$addFields": {
      "_id": {
        "$toObjectId": "$_id"
      }
    }
  },
  {
    "$sort": {
      "comment_count": -1
    }
  },
  {
    "$lookup": {
      "from": "mge-tweet",
      "localField": "_id",
      "foreignField": "_id",
      "as": "tweet_info"
    }
  },
  {
    "$facet": {
      "meta_data": [
        {
          "$count": "count"
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
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "type",
    "value": "type"
  },
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "like_count",
    "value": "like_count"
  },
  {
    "key": "comment_count",
    "value": "comment_count"
  },
  {
    "key": "event_registration_count",
    "value": "event_registration_count"
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
  id: "",
} as const;

export type Tweetsgroupactivities Config = typeof TWEETS_GROUP_ACTIVITIES_;