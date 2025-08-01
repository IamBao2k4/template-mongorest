export const GET_LIST_TWEET_FROM_GROUP_TYPE_PUBLIC = {
  _id: "67640b24c34159fb897b6e9c",
  title: "Get list tweet from group type public",
  note: "Lấy danh sách bài viết thuộc nhóm public, các bài viết phải có trạng thái là active",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6747ef07c47463d88f8c5ab1"
],
  queryAdvance: `[
  { "$match": { "type": "public" } },
  { "$addFields": { "id": { "$toString": "$_id" } } },
  { "$lookup": {
        "from": "mge-tweet-social-image", 
        "let": { "id": { "$toString": "$_id" } },
        "pipeline": [
            { "$match": {
                "$expr": {
                    "$and": [
                        { "$in": ["$$id", "$social_group"] },
                        { "$eq": ["$status", "active"] }
                    ]
                }
            } },
            { "$addFields": { "type": "image" } }
        ],
        "as": "images"
    }
  },
  { "$lookup": {
        "from": "mge-tweet-social-videos", 
        "let": { "id": { "$toString": "$_id" } },
        "pipeline": [
            { "$match": {
                "$expr": {
                    "$and": [
                        { "$in": ["$$id", "$social_group"] },
                        { "$eq": ["$status", "active"] }
                    ]
                }
            } },
            { "$addFields": { "type": "video" } }
        ],
        "as": "videos"
    }
  },
  { "$lookup": {
        "from": "mge-tweet-social-news", 
        "let": { "id": { "$toString": "$_id" } },
        "pipeline": [
            { "$match": {
                "$expr": {
                    "$and": [
                        { "$in": ["$$id", "$social_group"] },
                        { "$eq": ["$status", "active"] }
                    ]
                }
            } },
            { "$addFields": { "type": "news" } }
        ],
        "as": "news"
    }
  },
  { "$lookup": {
        "from": "mge-tweet-social-votes", 
        "let": { "id": { "$toString": "$_id" } },
        "pipeline": [
            { "$match": {
                "$expr": {
                    "$and": [
                        { "$in": ["$$id", "$social_group"] },
                        { "$eq": ["$status", "active"] }
                    ]
                }
            } },
            { "$addFields": { "type": "vote" } }
        ],
        "as": "votes"
    }
  },
  { "$addFields": {
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
  { "$unwind": "$contents" },
  { "$replaceRoot": { "newRoot": "$contents" } },
  { "$sort": { "created_at": 1 } },
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

export type GetListTweetFromGroupTypePublicConfig = typeof GET_LIST_TWEET_FROM_GROUP_TYPE_PUBLIC;