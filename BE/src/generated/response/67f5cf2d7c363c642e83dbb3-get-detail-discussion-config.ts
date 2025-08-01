export const GET_DETAIL_DISCUSSION = {
  _id: "67f5cf2d7c363c642e83dbb3",
  title: "get detail discussion",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752bcd265017d942f759541"
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
      "tenant_id": "@header:x-tenant-id",
      "$or": [
        {
          "_id": "@param:_id"
        },
        {
          "_id": "@param:discussion_id"
        }
      ]
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
    "$lookup": {
      "from": "mge-discussion-like",
      "localField": "_id",
      "foreignField": "discussion",
      "as": "liked_details"
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-like",
      "localField": "_id",
      "foreignField": "discussion",
      "pipeline": [
        {
          "$match": {
            "created_by": "@jwt:user.id"
          }
        }
      ],
      "as": "liked_info"
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-like",
      "localField": "_id",
      "foreignField": "discussion",
      "pipeline": [
        {
          "$match": {
            "created_by": "@jwt:user.id"
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
    "$addFields": {
      "like_count": {
        "$size": "$liked_details"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-comment",
      "localField": "_id",
      "foreignField": "discussion",
      "pipeline": [
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
                "$project": {
                  "_id": "$user",
                  "full_name": 1,
                  "featured_image": "$profile.course.featured_image"
                }
              }
            ],
            "as": "user"
          }
        }
      ],
      "as": "comment"
    }
  },
  {
    "$addFields": {
      "comment_count": {
        "$size": "$comment"
      }
    }
  },
  {
    "$project": {
      "comment": 0
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
  tenant_id: "677f6b3da3131eb0d3f9906d",
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
  },
  {
    "value": "discussion_id",
    "key": "discussion_id"
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

export type GetDetailDiscussionConfig = typeof GET_DETAIL_DISCUSSION;