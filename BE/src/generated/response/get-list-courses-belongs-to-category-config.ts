export const GET_LIST_COURSES_BELONGS_TO_CATEGORY = {
  _id: "67860d948dc33c7785c97c97",
  title: "get list courses belongs to category",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529b1465017d942f7592b5"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "id": "@param:category_ids"
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
    "$lookup": {
      "from": "mge-courses",
      "localField": "id",
      "foreignField": "category",
      "pipeline": [
        {
          "$match": {
            "status": "active"
          }
        }
      ],
      "as": "courses_parent"
    }
  },
  {
    "$lookup": {
      "from": "mge-courses",
      "localField": "descendants.id",
      "foreignField": "category",
      "pipeline": [
        {
          "$match": {
            "status": "active"
          }
        }
      ],
      "as": "courses_child"
    }
  },
  {
    "$addFields": {
      "all_courses": {
        "$concatArrays": [
          "$courses_parent",
          "$courses_child"
        ]
      }
    }
  },
  {
    "$addFields": {
      "courses": {
        "$reduce": {
          "input": "$all_courses",
          "initialValue": [],
          "in": {
            "$cond": [
              {
                "$in": [
                  "$$this._id",
                  {
                    "$map": {
                      "input": "$$value",
                      "as": "c",
                      "in": "$$c._id"
                    }
                  }
                ]
              },
              "$$value",
              {
                "$concatArrays": [
                  "$$value",
                  [
                    "$$this"
                  ]
                ]
              }
            ]
          }
        }
      }
    }
  },
  {
    "$project": {
      "courses": 1
    }
  },
  {
    "$unwind": "$courses"
  },
  {
    "$replaceRoot": {
      "newRoot": "$courses"
    }
  },
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
    "value": "category",
    "key": "category"
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
    "value": "category_ids",
    "key": "category_ids"
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  },
  {
    "value": "x-tenant_id",
    "key": "x-tenant_id"
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
  id: "67860d948dc33c7785c97c97",
} as const;

export type GetListCoursesBelongsToCategoryConfig = typeof GET_LIST_COURSES_BELONGS_TO_CATEGORY;