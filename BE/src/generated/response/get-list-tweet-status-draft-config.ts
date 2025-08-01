export const GET_LIST_TWEET_STATUS_DRAFT = {
  _id: "6765137c6e57acaf6815ae51",
  title: "Get list tweet status draft",
  note: "Lấy danh sách bài viết của user có status : draft",
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
    "$lookup": {
      "from": "mge-group-member",
      "localField": "id",
      "foreignField": "social_group",
      "as": "group_members"
    }
  },
  {
    "$match": {
      "$or": [
        {
          "$and": [
            {
              "group_members.user": "@jwt:user.id"
            },
            {
              "group_members.status": "joined"
            }
          ]
        },
        {
          "type": "public"
        }
      ]
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
                { "$eq": [ "$status", "daft" ] }
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
                { "$eq": [ "$status", "daft" ] }
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
                { "$eq": [ "$status", "daft" ] }
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
                { "$eq": [ "$status", "daft" ] }
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
    "$match": {
      "created_by": "@jwt:user.id"
    }
  },
  {
    "$sort": { "created_at": 1 }
  }
]
`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListTweetStatusDraftConfig = typeof GET_LIST_TWEET_STATUS_DRAFT;