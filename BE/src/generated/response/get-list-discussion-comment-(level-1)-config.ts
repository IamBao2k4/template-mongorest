export const GET_LIST_DISCUSSION_COMMENT_(LEVEL_1) = {
  _id: "6792045942dbfffa43bef819",
  title: "get list discussion comment (level 1)",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752c64565017d942f759585"
],
  queryAdvance: `[
  {
    "$match": {
      "discussion": "@param:discussion_id",
      "$or": [
        { "parent_id": null },
        { "parent_id": { "$size": 0 } },
        { "parent_id": { "$exists": false } }
      ]
    }
  },
  {
    "$addFields": {
      "discussion_id": {
        "$map": {
          "input": "$discussion",
          "as": "sg",
          "in": {
            "$toObjectId": "$$sg"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-discussions",
      "localField": "discussion_id",
      "foreignField": "_id",
      "pipeline": [
        // {
        //   "$lookup": {
        //     "from": "mge-course-member",
        //     "localField": "course",
        //     "foreignField": "course",
        //     "pipeline": [
        //       {
        //         "$match": {
        //           "user": "@jwt:user.id",
        //           "status": "joined"
        //         }
        //       }
        //     ],
        //     "as": "memberStatus"
        //   }
        // },
        {
          "$addFields": {
            "course": {
              "$map": {
                "input": "$course",
                "as": "sg",
                "in": {
                  "$toObjectId": "$$sg"
                }
              }
            }
          }
        },
        {
          "$lookup": {
            "from": "mge-courses",
            "localField": "course",
            "foreignField": "_id",
            "as": "course_data",
            "pipeline": [
              {
                "$match": {
                  "status": "active"
                }
              }
            ]
          }
        }
      ],
      "as": "discussion_info"
    }
  },
  {
    "$match": {
      // "discussion_info.memberStatus": {
      //   "$ne": []
      // },
      "discussion_info.course_data": {
        "$ne": []
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
    "$project": {
      "sub_comments": 0
    }
  },
  {
    "$lookup": {
      "from": "mge-discussion-comment-like",
      "localField": "id",
      "foreignField": "comment",
      "as": "liked_details"
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
      "from": "mge-discussion-comment-like",
      "localField": "id",
      "foreignField": "comment",
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
    "$addFields": {
      "liked": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": "$liked_info"
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
    "$project": {
      "liked_details": 0,
      "discussion_id": 0,
      "id": 0
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
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  restricted: [
  {
    "key": "discussion",
    "value": "discussion"
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
  id: "6792045942dbfffa43bef819",
} as const;

export type GetListDiscussionCommentLevel1Config = typeof GET_LIST_DISCUSSION_COMMENT_(LEVEL_1);