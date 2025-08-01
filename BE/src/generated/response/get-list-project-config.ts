export const GET_LIST_PROJECT = {
  _id: "67cfa4e8dada26e67e87de40",
  title: "get list project",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c6ccd9412d5b4c1e2bf08c"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
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
          "$addFields": {
            "featured_image": {
              "$map": {
                "input": "$featured_image",
                "as": "u",
                "in": {
                  "$toObjectId": "$$u"
                }
              }
            }
          }
        },
        {
          "$lookup": {
            "from": "media",
            "localField": "featured_image",
            "foreignField": "_id",
            "pipeline": [
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
          "$project": {
            "password": 0,
            "role_system": 0
          }
        }
      ],
      "as": "created_by"
    }
  },
  {
    "$match": {
      "$expr": {
        "$and": [
          //--- BỘ LỌC THEO TRẠNG THÁI ---
          {
            "$cond": {
              "if": {
                "$ne": [
                  "@param:status[]",
                  null
                ]
              },
              "then": {
                "$or": [
                  {
                    "$in": [
                      "$status",
                      [
                        "@param:status[]"
                      ]
                    ]
                  },
                  {
                    "$in": [
                      "$status",
                      [
                        [
                          "@param:status[]"
                        ]
                      ]
                    ]
                  }
                ]
              },
              "else": true
            }
          },
          //--- BỘ LỌC THEO TAG ---
          {
            "$cond": {
              "if": {
                "$ne": [
                  "@param:tag[]",
                  null
                ]
              },
              "then": {
                "$gt": [
                  {
                    "$size": {
                      "$filter": {
                        "input": "@param:tag[]",
                        "as": "tagItem",
                        "cond": {
                          "$in": [
                            "$$tagItem",
                            "$tag"
                          ]
                        }
                      }
                    }
                  },
                  0
                ]
              },
              "else": true
            }
          },
          //--- BỘ LỌC KHU VỰC ---
          {
            "$cond": {
              "if": {
                "$ne": [
                  "@param:city",
                  null
                ]
              },
              "then": {
                "$and": [
                  {
                    "$eq": [
                      "$address.city",
                      "@param:city"
                    ]
                  },
                  {
                    "$cond": {
                      "if": {
                        "$ne": [
                          "@param:district",
                          null
                        ]
                      },
                      "then": {
                        "$and": [
                          {
                            "$eq": [
                              "$address.district",
                              "@param:district"
                            ]
                          },
                          {
                            "$cond": {
                              "if": {
                                "$ne": [
                                  "@param:ward",
                                  null
                                ]
                              },
                              "then": {
                                "$eq": [
                                  "$address.ward",
                                  "@param:ward"
                                ]
                              },
                              "else": true
                            }
                          }
                        ]
                      },
                      "else": true
                    }
                  }
                ]
              },
              "else": true
            }
          },
          //--- BỘ LỌC DANH MỤC ---
          {
            "$cond": {
              "if": {
                "$ne": [
                  "@param:category[]",
                  null
                ]
              },
              "then": {
                "$or": [
                  {
                    "$in": [
                      "$category",
                      [
                        "@param:category[]"
                      ]
                    ]
                  },
                  {
                    "$in": [
                      "$category",
                      [
                        [
                          "@param:category[]"
                        ]
                      ]
                    ]
                  }
                ]
              },
              "else": true
            }
          },
          //--- BỘ LỌC CHỦ ĐẦU TƯ ---
          {
            "$cond": {
              "if": {
                "$ne": [
                  "@param:contact[]",
                  null
                ]
              },
              "then": {
                "$or": [
                  {
                    "$in": [
                      "$contact",
                      [
                        "@param:contact[]"
                      ]
                    ]
                  },
                  {
                    "$in": [
                      "$contact",
                      [
                        [
                          "@param:contact[]"
                        ]
                      ]
                    ]
                  }
                ]
              },
              "else": true
            }
          },
          //--- BỘ LỌC GIÁ ---
          {
            "$cond": {
              "if": {
                "$and": [
                  {
                    "$ne": [
                      {
                        "$toDouble": "@param:minPrice"
                      },
                      null
                    ]
                  },
                  {
                    "$ne": [
                      {
                        "$toDouble": "@param:maxPrice"
                      },
                      null
                    ]
                  }
                ]
              },
              "then": {
                "$and": [
                  {
                    "$gte": [
                      "$overview_static.price",
                      {
                        "$toDouble": "@param:minPrice"
                      }
                    ]
                  },
                  {
                    "$lte": [
                      "$overview_static.price",
                      {
                        "$toDouble": "@param:maxPrice"
                      }
                    ]
                  }
                ]
              },
              "else": {
                "$cond": {
                  "if": {
                    "$ne": [
                      {
                        "$toDouble": "@param:minPrice"
                      },
                      null
                    ]
                  },
                  "then": {
                    "$gte": [
                      "$overview_static.price",
                      {
                        "$toDouble": "@param:minPrice"
                      }
                    ]
                  },
                  "else": {
                    "$cond": {
                      "if": {
                        "$ne": [
                          {
                            "$toDouble": "@param:maxPrice"
                          },
                          null
                        ]
                      },
                      "then": {
                        "$lte": [
                          "$overview_static.price",
                          {
                            "$toDouble": "@param:maxPrice"
                          }
                        ]
                      },
                      "else": true
                    }
                  }
                }
              }
            }
          },
          //--- BỘ LỌC DIỆN TÍCH ---
          {
            "$cond": {
              "if": {
                "$and": [
                  {
                    "$ne": [
                      {
                        "$toDouble": "@param:minArea"
                      },
                      null
                    ]
                  },
                  {
                    "$ne": [
                      {
                        "$toDouble": "@param:maxArea"
                      },
                      null
                    ]
                  }
                ]
              },
              "then": {
                "$and": [
                  {
                    "$gte": [
                      "$overview_static.acreage",
                      {
                        "$toDouble": "@param:minArea"
                      }
                    ]
                  },
                  {
                    "$lte": [
                      "$overview_static.acreage",
                      {
                        "$toDouble": "@param:maxArea"
                      }
                    ]
                  }
                ]
              },
              "else": {
                "$cond": {
                  "if": {
                    "$ne": [
                      {
                        "$toDouble": "@param:minArea"
                      },
                      null
                    ]
                  },
                  "then": {
                    "$gte": [
                      "$overview_static.acreage",
                      {
                        "$toDouble": "@param:minArea"
                      }
                    ]
                  },
                  "else": {
                    "$cond": {
                      "if": {
                        "$ne": [
                          {
                            "$toDouble": "@param:maxArea"
                          },
                          null
                        ]
                      },
                      "then": {
                        "$lte": [
                          "$overview_static.acreage",
                          {
                            "$toDouble": "@param:maxArea"
                          }
                        ]
                      },
                      "else": true
                    }
                  }
                }
              }
            }
          }
        ]
      }
    }
  },
  {
    "$addFields": {
      "category": {
        "$map": {
          "input": "$category",
          "as": "u",
          "in": {
            "$toObjectId": "$$u"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-listing-category",
      "localField": "category",
      "foreignField": "_id",
      "as": "category"
    }
  },
  {
    "$addFields": {
      "tag": {
        "$map": {
          "input": "$tag",
          "as": "u",
          "in": {
            "$toObjectId": "$$u"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-listing-tag",
      "localField": "tag",
      "foreignField": "_id",
      "pipeline": [
        {
          "$project": {
            "title": 1
          }
        }
      ],
      "as": "tag"
    }
  },
  {
    "$addFields": {
      "contact": {
        "$map": {
          "input": "$contact",
          "as": "u",
          "in": {
            "$toObjectId": "$$u"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-listing-contact",
      "localField": "contact",
      "foreignField": "_id",
      "pipeline": [
        {
          "$addFields": {
            "logo": {
              "$map": {
                "input": "$logo",
                "as": "u",
                "in": {
                  "$toObjectId": "$$u"
                }
              }
            }
          }
        },
        {
          "$lookup": {
            "from": "media",
            "localField": "logo",
            "foreignField": "_id",
            "pipeline": [
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
            "as": "logo"
          }
        }
      ],
      "as": "contact"
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
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
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
  },
  {
    "value": "status[]",
    "key": "status[]"
  },
  {
    "value": "type[]",
    "key": "type[]"
  },
  {
    "value": "city",
    "key": "city"
  },
  {
    "value": "district",
    "key": "district"
  },
  {
    "value": "ward",
    "key": "ward"
  },
  {
    "value": "category[]",
    "key": "category[]"
  },
  {
    "value": "minPrice",
    "key": "minPrice"
  },
  {
    "value": "maxPrice",
    "key": "maxPrice"
  },
  {
    "value": "minArea",
    "key": "minArea"
  },
  {
    "value": "maxArea",
    "key": "maxArea"
  },
  {
    "value": "tag[]",
    "key": "tag[]"
  },
  {
    "value": "tag[]]",
    "key": "tag[]]"
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

export type GetListProjectConfig = typeof GET_LIST_PROJECT;