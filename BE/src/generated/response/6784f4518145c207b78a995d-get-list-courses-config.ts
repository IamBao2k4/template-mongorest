export const GET_LIST_COURSES = {
  _id: "6784f4518145c207b78a995d",
  title: "get list courses",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529c0665017d942f7592d1"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "status": "active"
    }
  },
  {
    "$lookup": {
      "from": "media",
      "let": {
        "featuredImageId": {
          "$arrayElemAt": ["$cover_image", 0]
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
                      "$eq": ["minio", "@app_settings:storage_type"]
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
  },
  {
    "$addFields": {
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$addFields": {
      "category": {
        "$cond": {
          "if": {
            "$isArray": "$category"
          },
          "then": {
            "$map": {
              "input": "$category",
              "as": "u",
              "in": {
                "$toObjectId": "$$u"
              }
            }
          },
          "else": "$category"
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-categories",
      "localField": "category",
      "foreignField": "_id",
      "pipeline": [
        {
          "$addFields": {
            "id": {
              "$toString": "$_id"
            }
          }
        }
      ],
      "as": "category"
    }
  },
  {
    "$lookup": {
      "from": "mge-categories",
      "let": {
        "categoryIds": {
          "$cond": {
            "if": {
              "$isArray": "@param:category_ids[]"
            },
            "then": "@param:category_ids[]",
            "else": {
              "$cond": {
                "if": {
                  "$eq": ["@param:category_ids[]", null]
                },
                "then": [],
                "else": "@param:category_ids[]"
              }
            }
          }
        }
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$or": [
                {
                  "$in": ["$id", "$$categoryIds"]
                }
              ]
            }
          }
        },
        {
          "$graphLookup": {
            "from": "mge-categories",
            "startWith": "$id",
            "connectFromField": "id",
            "connectToField": "parent_id",
            "as": "descendants",
            "depthField": "level",
            "maxDepth": 100
          }
        },
        {
          "$project": {
            "allCategoryIds": {
              "$concatArrays": [["$id"], "$descendants.id"]
            }
          }
        }
      ],
      "as": "categoryHierarchy"
    }
  },
  {
    "$addFields": {
      "allRelevantCategoryIds": {
        "$reduce": {
          "input": "$categoryHierarchy",
          "initialValue": [],
          "in": {
            "$concatArrays": ["$$value", "$$this.allCategoryIds"]
          }
        }
      }
    }
  },
  {
    "$match": {
      "$expr": {
        "$or": [
          {
            "$eq": ["@param:category_ids[]", null]
          },
          {
            "$gt": [
              {
                "$size": {
                  "$setIntersection": [
                    {
                      "$map": {
                        "input": "$category",
                        "as": "c",
                        "in": "$$c.id"
                      }
                    },
                    "$allRelevantCategoryIds"
                  ]
                }
              },
              0
            ]
          }
        ]
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-user-rating",
      "localField": "_id",
      "foreignField": "course",
      "pipeline": [
        {
          "$group": {
            "_id": "$rating_score",
            "count": {
              "$sum": 1
            }
          }
        },
        {
          "$project": {
            "_id": 0,
            "rating_score": "$_id",
            "count": 1
          }
        },
        {
          "$sort": {
            "rating_score": 1
          }
        }
      ],
      "as": "rating_detail"
    }
  },
  {
    "$lookup": {
      "from": "mge-user-rating",
      "localField": "_id",
      "foreignField": "course",
      "as": "rating_info"
    }
  },
  {
    "$addFields": {
      "rating_count": {
        "$size": "$rating_info"
      }
    }
  },
  {
    "$match": {
      "$expr": {
        "$or": [
          {
            "$eq": ["@param:title", null]
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
      "rating_info": 0
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
]
`,
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
  },
  {
    "value": "category",
    "key": "category"
  },
  {
    "value": "category_id",
    "key": "category_id"
  },
  {
    "value": "title",
    "key": "title"
  },
  {
    "value": "category[]",
    "key": "category[]"
  },
  {
    "value": "category_ids[]",
    "key": "category_ids[]"
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
    "key": "title",
    "value": "title"
  },
  {
    "key": "slug",
    "value": "slug"
  },
  {
    "key": "short_description",
    "value": "short_description"
  },
  {
    "key": "long_description",
    "value": "long_description"
  },
  {
    "key": "cover_image",
    "value": "cover_image"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "contains_course",
    "value": "contains_course"
  },
  {
    "key": "objectives",
    "value": "objectives"
  },
  {
    "key": "objects",
    "value": "objects"
  },
  {
    "key": "requests",
    "value": "requests"
  },
  {
    "key": "category",
    "value": "category"
  },
  {
    "key": "type",
    "value": "type"
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
  id: "6784f4518145c207b78a995d",
} as const;

export type GetListCoursesConfig = typeof GET_LIST_COURSES;