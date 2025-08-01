export const GET_LIST_USER_S_LEARNING_PATH = {
  _id: "68077851fa0fd1ce859894b9",
  title: "get list user's learning  path",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "68062af5beb73c2d42c97dc5"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
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
      "from": "mge-user-learning-path",
      "localField": "id",
      "foreignField": "learning_path",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id"
          }
        }
      ],
      "as": "user_learning_path"
    }
  },
  {
    "$match": {
      "user_learning_path": {
        "$ne": []
      }
    }
  },
  {
    "$facet": {
      "with_courses": [
        {
          "$match": {
            "courses": {
              "$exists": true,
              "$type": "array",
              "$ne": []
            }
          }
        },
        {
          "$unwind": {
            "path": "$courses",
            "preserveNullAndEmptyArrays": false
          }
        },
        {
          "$lookup": {
            "from": "mge-courses",
            "localField": "courses.course",
            "foreignField": "id",
            "pipeline":[
                {
                  "$lookup": {
                    "from": "media",
                    "let": {
                      "featuredImageId": {
                        "$arrayElemAt": [
                          "$cover_image",
                          0
                        ]
                      }
                    },
                    "pipeline": [
                      {
                        "$match": {
                          "$expr": {
                            "$eq": [
                              "$_id",
                              {
                                "$toObjectId": "$$featuredImageId"
                              }
                            ]
                          }
                        }
                      },
                      {
                        "$addFields": {
                          "path": {
                            "$concat": [
                              {
                                "$cond": [
                                  {
                                    "$eq": [
                                      "minio",
                                      "@app_settings:storage_type"
                                    ]
                                  },
                                  "@app_settings:minio.public",
                                  "@app_settings:doSpace.public"
                                ]
                              },
                              "/",
                              "$disk",
                              "/",
                              "$filename"
                            ]
                          }
                        }
                      }
                    ],
                    "as": "cover_image"
                  }
                }
            ],
            "as": "course_info"
          }
        },
        {
          "$addFields": {
            "courses.course": "$course_info"
          }
        },
        {
          "$group": {
            "_id": "$_id",
            "title": {
              "$first": "$title"
            },
            "slug": {
              "$first": "$slug"
            },
            "department": {
              "$first": "$department"
            },
            "team": {
              "$first": "$team"
            },
            "locale": {
              "$first": "$locale"
            },
            "locale_id": {
              "$first": "$locale_id"
            },
            "created_at": {
              "$first": "$created_at"
            },
            "created_by": {
              "$first": "$created_by"
            },
            "updated_at": {
              "$first": "$updated_at"
            },
            "updated_by": {
              "$first": "$updated_by"
            },
            "tenant_id": {
              "$first": "$tenant_id"
            },
            "id": {
              "$first": "$id"
            },
            "user_learning_path": {
              "$first": "$user_learning_path"
            },
            "courses": {
              "$push": "$courses"
            }
          }
        }
      ],
      "without_courses": [
        {
          "$match": {
            "$or": [
              {
                "courses": {
                  "$exists": false
                }
              },
              {
                "courses": {
                  "$eq": []
                }
              }
            ]
          }
        }
      ]
    }
  },
  {
    "$project": {
      "data": {
        "$concatArrays": [
          "$with_courses",
          "$without_courses"
        ]
      }
    }
  },
  {
    "$unwind": "$data"
  },
  {
    "$replaceRoot": {
      "newRoot": "$data"
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
    "value": "x-tenant_id",
    "key": "x-tenant_id"
  },
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  data: {
  "id": "df94a4cf-8359-4421-9f27-a58631e2f597",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [
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
  id: "68077851fa0fd1ce859894b9",
} as const;

export type GetListUsersLearningPathConfig = typeof GET_LIST_USER_S_LEARNING_PATH;