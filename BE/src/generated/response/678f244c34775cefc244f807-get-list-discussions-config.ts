export const GET_LIST_DISCUSSIONS = {
  _id: "678f244c34775cefc244f807",
  title: "get list discussions",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752bcd265017d942f759541"
],
  queryAdvance: `[
  {
    "$match": {
      "course": "@param:course_id"
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
      "_id": {
        "$toString": "$_id"
      }
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
    "$match": {
      "$expr": {
        "$or": [
          {
            "$eq": [
              "@param:title",
              null
            ]
          },
          {
            "$regexMatch": {
              "input": "$title",
              "regex": "@param:title",
              "options": "i"
            }
          }
        ]
      }
    }
  },
  {
    "$project": {
      "liked_details": 0,
      "comment": 0
    }
  },
  {
    "$sort": {
      "created_at": "@sort_param:created_at"
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
    "value": "topic_id",
    "key": "topic_id"
  },
  {
    "value": "course_id",
    "key": "course_id"
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
    "value": "title",
    "key": "title"
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  data: {
  "id": "879b937c-d24c-45a1-be0d-802852d88322",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "course",
    "value": "course"
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

export type GetListDiscussionsConfig = typeof GET_LIST_DISCUSSIONS;