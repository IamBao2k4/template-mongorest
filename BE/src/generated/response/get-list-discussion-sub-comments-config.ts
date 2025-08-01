export const GET_LIST_DISCUSSION_SUB_COMMENTS = {
  _id: "6793107ef19c9b4d4de97a61",
  title: "get list discussion sub comments",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752c64565017d942f759585"
],
  queryAdvance: `[
  {
    "$match": {
      "parent_id": "@param:discussion_comment_id"
    }
  },
  {
    "$addFields": {
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-comment",
      "let": {
        "id": "$id"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": [
                [
                  "$$id"
                ],
                "$parent_id"
              ]
            }
          }
        },
        {
          "$addFields": {
            "id": {
              "$toString": "$_id"
            }
          }
        }
      ],
      "as": "sub_comments"
    }
  },
  {
    "$addFields": {
      "sub_comment_quantity": {
        "$size": "$sub_comments"
      }
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "created_by",
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id"
          }
        },
        {
          "$addFields": {
            "full_name": {
              "$concat": [
                "$profile.last_name",
                " ",
                "$profile.first_name"
              ]
            }
          }
        },
        {
          "$unwind": {
            "path": "$user",
            "preserveNullAndEmptyArrays": true
          }
        },
        {
          "$project": {
            "_id": "$user",
            "full_name": 1,
            "featured_image": "$profile.course.featured_image"
          }
        }
      ],
      "as": "user"
    }
  },
  {
    "$project": {
      "sub_comments": 0
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-comment-like",
      "localField": "id",
      "foreignField": "comment",
      "as": "like_info"
    }
  },
  {
    "$addFields": {
      "like_count": {
        "$size": "$like_info"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-comment-like",
      "let": {
        "currentId": "$id",
        "userId": "@jwt:user.id"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$eq": [
                    "$comment",
                    "$$currentId"
                  ]
                },
                {
                  "$eq": [
                    "$created_by",
                    "$$userId"
                  ]
                }
              ]
            }
          }
        }
      ],
      "as": "liked"
    }
  },
  {
    "$addFields": {
      "liked": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": "$liked"
              },
              0
            ]
          },
          "then": true,
          "else": false
        }
      }
    }
  },
  {
    "$sort": {
      "created_at": -1
    }
  },
  {
    "$facet": {
      "meta_data": [
        {
          "$count": "count" // Tổng số bản ghi thực sự không chịu ảnh hưởng của skip/limit
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
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "discussion_id",
    "key": "discussion_id"
  },
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  },
  {
    "value": "discussion_comment_id",
    "key": "discussion_comment_id"
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

export type GetListDiscussionSubCommentsConfig = typeof GET_LIST_DISCUSSION_SUB_COMMENTS;