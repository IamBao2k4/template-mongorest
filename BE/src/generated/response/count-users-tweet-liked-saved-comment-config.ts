export const COUNT_USERS_TWEET_LIKED_SAVED_COMMENT = {
  _id: "67761c713c56caf3d6e35306",
  title: "count user's tweet, liked, saved, comment",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67b6a286606da18e6c1976f1"
],
  queryAdvance: `[
  {
    "$match": {
      "status": "active",
      "created_by":"@param:user_id",
      "tenant_id":"@header:x-tenant-id"
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
        "$toString": "tweet_count"
      }
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-saved",
      "pipeline": [
        {
    "$match": {
      "created_by":"@param:user_id",
      "tenant_id":"@header:x-tenant-id"
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
      "from": "mge-tweet-social-image",
      "localField": "tweet_id",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "status":"active",
            "tenant_id":"@header:x-tenant-id"
          }
        }
      ],
      "as": "image"
    }
  },
                  {
    "$lookup": {
      "from": "mge-tweet-social-news",
      "localField": "tweet_id",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "status":"active",
            "tenant_id":"@header:x-tenant-id"
          }
        }
      ],
      "as": "news"
    }
  },
                          {
    "$lookup": {
      "from": "mge-tweet-social-votes",
      "localField": "tweet_id",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "status":"active",
            "tenant_id":"@header:x-tenant-id"
          }
        }
      ],
      "as": "votes"
    }
  },
                                  {
    "$lookup": {
      "from": "mge-tweet-social-videos",
      "localField": "tweet_id",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "status":"active",
            "tenant_id":"@header:x-tenant-id"
          }
        }
      ],
      "as": "videos"
    }
  },
        {
  "$match": {
    "$or": [
      { "image": { "$ne": [] } },
      { "news": { "$ne": [] } },
      { "votes": { "$ne": [] } },
      { "videos": { "$ne": [] } }
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
        "$toString": "tweet_saved_count"
      }
    }
  } 
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-entity-like",
      "pipeline": [
        {
    "$match": {
      "created_by":"@param:user_id",
      "tenant_id":"@header:x-tenant-id"
    }
  },
            {
    "$addFields": {
      "entity_id": {
        "$toObjectId": "$entity_id"
      }
    }
  },
          {
    "$lookup": {
      "from": "mge-tweet-social-image",
      "localField": "entity_id",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "status":"active",
            "tenant_id":"@header:x-tenant-id"
          }
        }
      ],
      "as": "image"
    }
  },
                  {
    "$lookup": {
      "from": "mge-tweet-social-news",
      "localField": "entity_id",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "status":"active",
            "tenant_id":"@header:x-tenant-id"
          }
        }
      ],
      "as": "news"
    }
  },
                          {
    "$lookup": {
      "from": "mge-tweet-social-votes",
      "localField": "entity_id",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "status":"active",
            "tenant_id":"@header:x-tenant-id"
          }
        }
      ],
      "as": "votes"
    }
  },
                                  {
    "$lookup": {
      "from": "mge-tweet-social-videos",
      "localField": "entity_id",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "status":"active",
            "tenant_id":"@header:x-tenant-id"
          }
        }
      ],
      "as": "videos"
    }
  },
        {
  "$match": {
    "$or": [
      { "image": { "$ne": [] } },
      { "news": { "$ne": [] } },
      { "votes": { "$ne": [] } },
      { "videos": { "$ne": [] } }
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
        "$toString": "tweet_liked_count"
      }
    }
  } 
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-comment",
      "pipeline": [
        {
    "$match": {
      "created_by": "@param:user_id",
      "tenant_id":"@header:x-tenant-id"
    }
  },
          {
    "$addFields": {
      "tweet": {
        "$toObjectId": "$tweet"
      }
    }
  },
          {
    "$lookup": {
      "from": "mge-tweet-social-image",
      "localField": "tweet",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "status":"active",
            "tenant_id":"@header:x-tenant-id"
          }
        }
      ],
      "as": "image"
    }
  },
                  {
    "$lookup": {
      "from": "mge-tweet-social-news",
      "localField": "tweet",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "status":"active",
            "tenant_id":"@header:x-tenant-id"
          }
        }
      ],
      "as": "news"
    }
  },
                          {
    "$lookup": {
      "from": "mge-tweet-social-votes",
      "localField": "tweet",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "status":"active",
            "tenant_id":"@header:x-tenant-id"
          }
        }
      ],
      "as": "votes"
    }
  },
                                  {
    "$lookup": {
      "from": "mge-tweet-social-videos",
      "localField": "tweet",
      "foreignField": "_id",
      "pipeline":[
        {
          "$match":{
            "status":"active",
            "tenant_id":"@header:x-tenant-id"
          }
        }
      ],
      "as": "videos"
    }
  },
        {
  "$match": {
    "$or": [
      { "image": { "$ne": [] } },
      { "news": { "$ne": [] } },
      { "votes": { "$ne": [] } },
      { "videos": { "$ne": [] } }
    ]
  }
},
        {
    "$group": {
      "_id": "$created_by",
      "unique_tweet_ids": { "$addToSet": "$tweet" }
      
    }
  },
  {
    "$project": {
      "_id": 0,
      "count": { "$size": "$unique_tweet_ids" },
      "name": 1
    }
  },
            {
    "$addFields": {
      "name": {
        "$toString": "tweet_comment_count"
      }
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
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  },
  {
    "value": "user_id",
    "key": "user_id"
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

export type CountUsersTweetLikedSavedCommentConfig = typeof COUNT_USERS_TWEET_LIKED_SAVED_COMMENT;