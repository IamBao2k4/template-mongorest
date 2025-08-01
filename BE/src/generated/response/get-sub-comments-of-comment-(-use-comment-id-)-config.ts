export const GET_SUB_COMMENTS_OF_COMMENT_(_USE_COMMENT_ID_) = {
  _id: "677b4aa0f99e7327567de18d",
  title: "Get sub comments of comment ( use comment id )",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6764e3926e57acaf6815ab97"
],
  queryAdvance: `[
    {
        "$addFields": {
            "id": { "$toString": "$_id" }
        }
    },
    {
        "$match": {
            "id": "@param:comment_id"
        }
    },
    {
        "$lookup": {
            "from": "mge-tweet-comment",
            "let": { "id": "$id" },
            "pipeline": [
                {
                    "$match": {
                        "$expr": {
                            "$eq": [["$$id"], "$parent_id"]
                        }
                    }
                },
                {
                    "$addFields": {
                        "id": { "$toString": "$_id" }
                    }
                },
                {
                    "$lookup": {
                        "from": "mge-tweet-comment",
                        "let": { "id": "$id" },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": {
                                        "$eq": [["$$id"], "$parent_id"]
                                    }
                                }
                            },
                            {
                                "$addFields": {
                                    "id": { "$toString": "$_id" }
                                }
                            }
                        ],
                        "as": "sub_comments"
                    }
                },
                {
                    "$addFields": {
                        "sub_comment_quantity": { "$size": "$sub_comments" }
                    }
                }
            ],
            "as": "sub_comments"
        }
    },
    {
        "$addFields": {
            "sub_comment_quantity": { "$size": "$sub_comments" }
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
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetSubCommentsOfCommentUseCommentId Config = typeof GET_SUB_COMMENTS_OF_COMMENT_(_USE_COMMENT_ID_);