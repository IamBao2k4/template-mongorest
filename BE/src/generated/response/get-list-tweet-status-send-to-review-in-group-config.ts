export const GET_LIST_TWEET_STATUS_SEND_TO_REVIEW_IN_GROUP = {
  _id: "67659d196e57acaf6815b2d8",
  title: "Get list tweet status send to review in group",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6747ef07c47463d88f8c5ab1"
],
  queryAdvance: `[
  {
    "$addFields": {
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "id": "@param:group_id"
    }
  },
  {
    "$lookup": {
      "from": "mge-tweet-social-image",
      "let": { "id": { "$toString": "$_id" } },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                { "$in": ["$$id", "$social_group"] },
                { "$eq": [ "$status", "send_to_review" ] }
              ]
            }
          }
        },
        {
          "$addFields": {
            "type": "image"
          }
        }
      ],
      "as": "images"
    }
  },
  {
    "$lookup": {
      "from": "mge-tweet-social-videos",
      "let": { "id": { "$toString": "$_id" } },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                { "$in": ["$$id", "$social_group"] },
                { "$eq": [ "$status", "send_to_review" ] }
              ]
            }
          }
        },
        {
          "$addFields": {
            "type": "video"
          }
        }
      ],
      "as": "videos"
    }
  },
  {
    "$lookup": {
      "from": "mge-tweet-social-news",
      "let": { "id": { "$toString": "$_id" } },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                { "$in": ["$$id", "$social_group"] },
                { "$eq": ["$status", "send_to_review"] }
              ]
            }
          }
        },
        {
          "$addFields": {
            "type": "news"
          }
        }
      ],
      "as": "news"
    }
  },
  {
    "$lookup": {
      "from": "mge-tweet-social-votes",
      "let": { "id": { "$toString": "$_id" } },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                { "$in": ["$$id", "$social_group"] },
                { "$eq": ["$status", "send_to_review"] }
              ]
            }
          }
        },
        {
          "$addFields": {
            "type": "vote"
          }
        }
      ],
      "as": "votes"
    }
  },
  {
    "$addFields": {
      "contents": {
        "$concatArrays": [
          "$images", 
          "$videos", 
          "$news", 
          "$votes"
        ]
      }
    }
  },
  {
    "$unwind": "$contents"
  },
  {
    "$replaceRoot": { "newRoot": "$contents" }
  },
  {
    "$sort": { "created_at": 1 }
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
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListTweetStatusSendToReviewInGroupConfig = typeof GET_LIST_TWEET_STATUS_SEND_TO_REVIEW_IN_GROUP;