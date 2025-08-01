export const GET_LIST_TOPIC = {
  _id: "678dc9d16b0c9dca1257a8bb",
  title: "get list topic",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6752bd9c65017d942f75955a"
],
  queryAdvance: `[
  {
    "$match": {
      "course": "@param:course_id"
    }
  },
  {
    "$addFields": {
      "created_by": {
        "$toObjectId": "$created_by"
      }
    }
  },
  {
    "$lookup": {
      "from": "user",
      "localField": "created_by",
      "foreignField": "_id",
      "pipeline": [
        {
          "$project": {
            "password": 0,
            "role_system": 0
          }
        },
        {
          "$addFields": {
            "full_name": {
              "$concat": [
                "$first_name",
                " ",
                "$last_name"
              ]
            }
          }
        },
        {
          "$lookup": {
            "from": "media",
            "let": {
              "featuredImageId": {
                "$arrayElemAt": [
                  "$cover",
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
            "as": "cover"
          }
        },
        {
          "$lookup": {
            "from": "media",
            "let": {
              "featuredImageId": {
                "$arrayElemAt": [
                  "$featured_image",
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
            "as": "featured_image"
          }
        }
      ],
      "as": "created_by"
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
      "from": "mge-discussions",
      "localField": "_id",
      "foreignField": "topic",
      "pipeline": [
        {
          "$addFields": {
            "created_by": {
              "$toObjectId": "$created_by"
            }
          }
        },
        {
          "$lookup": {
            "from": "user",
            "localField": "created_by",
            "foreignField": "_id",
            "pipeline": [
              {
                "$lookup": {
                  "from": "media",
                  "let": {
                    "featuredImageId": {
                      "$arrayElemAt": [
                        "$featured_image",
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
                  "as": "featured_image"
                }
              },
              {
                "$lookup": {
                  "from": "media",
                  "let": {
                    "featuredImageId": {
                      "$arrayElemAt": [
                        "$cover",
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
                  "as": "cover"
                }
              }
            ],
            "as": "created_by"
          }
        }
      ],
      "as": "discussions"
    }
  },
  {
    "$sort": {
      "created_at":-1
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
  }
],
  headers: [],
  data: {
  "id": "43882dd4-725e-420e-b167-33f979581777",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type GetListTopicConfig = typeof GET_LIST_TOPIC;