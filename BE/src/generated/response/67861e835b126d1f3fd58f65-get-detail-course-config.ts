export const GET_DETAIL_COURSE = {
  _id: "67861e835b126d1f3fd58f65",
  title: "get detail course",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529c0665017d942f7592d1"
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
          "slug": "@param:slug"
        },
        {
          "_id": "@param:_id"
        }
      ]
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
    "$addFields": {
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-course-member",
      "localField": "_id",
      "foreignField": "course",
      "pipeline": [
        {
          "$match": {
            "status": "joined"
          }
        }
      ],
      "as": "group_members"
    }
  },
  {
    "$addFields": {
      "member_count": {
        "$size": "$group_members"
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
      "from": "mge-categories",
      "localField": "category",
      "foreignField": "_id",
      "as": "category"
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
                "$profile.course.last_name",
                " ",
                "$profile.course.first_name"
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
      "from": "mge-course-member",
      "localField": "_id",
      "foreignField": "course",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id",
            "tenant_id": "@header:x-tenant-id"
          }
        }
      ],
      "as": "member_status"
    }
  },
  {
    "$addFields": {
      "tenant_id": {
        "$toObjectId": "$tenant_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "tenant",
      "localField": "tenant_id",
      "foreignField": "_id",
      "as": "tenant_info"
    }
  },
  {
    "$addFields": {
      "joined": {
        "$cond": {
          "if": {
            "$or": [
              {
                "$eq": [
                  "$member_status.status",
                  [
                    "joined"
                  ]
                ]
              },
              {
                "$eq": [
                  "$member_status.status",
                  [
                    [
                      "joined"
                    ]
                  ]
                ]
              }
            ]
          },
          "then": true,
          "else": false
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-course-member",
      "localField": "_id",
      "foreignField": "course",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id",
            "tenant_id": "@header:x-tenant-id"
          }
        },
        {
          "$lookup": {
            "from": "user-tenant-profile",
            "localField": "user",
            "foreignField": "user",
            "pipeline": [
              {
                "$match": {
                  "tenant_id": "@header:x-tenant-id"
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
                  "from": "user-tenant-level-mapping",
                  "localField": "_id",
                  "foreignField": "user",
                  "as": "user_tenant_level"
                }
              }
            ],
            "as": "tenant_level_info"
          }
        }
      ],
      "as": "tenant_member_status"
    }
  },
  {
    "$unwind": {
      "path": "$tenant_member_status",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$unwind": {
      "path": "$tenant_member_status.tenant_level_info",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$unwind": {
      "path": "$tenant_member_status.tenant_level_info.user_tenant_level",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$unwind": {
      "path": "$tenant_member_status.tenant_level_info.user_tenant_level.tenant_level",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$unwind": {
      "path": "$tenant_member_status.role",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$unwind": {
      "path": "$tenant_info",
      "preserveNullAndEmptyArrays": true
    }
  },
{
  "$addFields": {
    "tenant_role": "$tenant_member_status.tenant_level_info.user_tenant_level.tenant_level"
  }
},
{
  "$addFields": {
    "user_permission.can_access_admin_dashboard": {
      "$or":[
        {"$in": [
        "$tenant_role",
        { "$ifNull": ["$tenant_info.course_setting.full_permission", []] }
      ]
        },
          {
            "$eq": [
              "$tenant_member_status.role",
              "instructor"
            ]
          },
          {
            "$eq": [
              "$tenant_member_status.role",
              "assistant"
            ]
          }
        ]
    }
  }
},
  {
    "$lookup": {
      "from": "mge-chapters",
      "localField": "_id",
      "foreignField": "course",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id"
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
            "from": "mge-lessons",
            "localField": "_id",
            "foreignField": "chapters",
            "pipeline": [
              {
                "$match": {
                  "tenant_id": "@header:x-tenant-id",
                  "status": "active"
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
                  "from": "mge-course-user-progress",
                  "localField": "_id",
                  "foreignField": "lesson",
                  "pipeline": [
                    {
                      "$match": {
                        "tenant_id": "@header:x-tenant-id",
                        "user": "@jwt:user.id"
                      }
                    }
                  ],
                  "as": "is_finished"
                }
              },
              {
                "$addFields": {
                  "is_finished": {
                    "$cond": {
                      "if": {
                        "$gt": [
                          {
                            "$size": "$is_finished"
                          },
                          0
                        ]
                      },
                      "then": true,
                      "else": false
                    }
                  }
                }
              }
            ],
            "as": "lessons"
          }
        },
        {
          "$lookup": {
            "from": "mge-exams",
            "localField": "_id",
            "foreignField": "chapters",
            "pipeline": [
              {
                "$match": {
                  "tenant_id": "@header:x-tenant-id"
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
                  "from": "mge-course-user-progress",
                  "localField": "_id",
                  "foreignField": "exam",
                  "pipeline": [
                    {
                      "$match": {
                        "tenant_id": "@header:x-tenant-id",
                        "user": "@jwt:user.id"
                      }
                    }
                  ],
                  "as": "is_finished"
                }
              },
              {
                "$addFields": {
                  "is_finished": {
                    "$cond": {
                      "if": {
                        "$gt": [
                          {
                            "$size": "$is_finished"
                          },
                          0
                        ]
                      },
                      "then": true,
                      "else": false
                    }
                  }
                }
              }
            ],
            "as": "exams"
          }
        },
        {
          "$addFields": {
            "list": {
              "$concatArrays": [
                {
                  "$map": {
                    "input": "$lessons",
                    "as": "lesson",
                    "in": {
                      "$mergeObjects": [
                        "$$lesson",
                        {
                          "posttype": "lessons"
                        }
                      ]
                    }
                  }
                },
                {
                  "$map": {
                    "input": "$exams",
                    "as": "exam",
                    "in": {
                      "$mergeObjects": [
                        "$$exam",
                        {
                          "posttype": "exams"
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        },
        {
          "$addFields": {
            "list": {
              "$sortArray": {
                "input": "$list",
                "sortBy": {
                  "position": 1
                }
              }
            }
          }
        }
      ],
      "as": "chapters"
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
    "$project": {
      "title": 1,
      "slug": 1,
      "short_description": 1,
      "cover_image": 1,
      "status": 1,
      "contains_course": 1,
      "objectives": 1,
      "objects": 1,
      "requests": 1,
      "category._id": 1,
      "category.title": 1,
      "category.slug": 1,
      "category.tenant_id": 1,
      "user": 1,
      "created_by": 1,
      "created_at": 1,
      "updated_at": 1,
      "updated_by": 1,
      "tenant_id": 1,
      "long_description": 1,
      "permissions": 1,
      "type": 1,
      "member_count": 1,
      "member_status": 1,
      "joined": 1,
      "chapters._id": 1,
      "chapters.title": 1,
      "chapters.slug": 1,
      "chapters.list._id": 1,
      "chapters.list.title": 1,
      "chapters.list.slug": 1,
      "chapters.list.lesson_type": 1,
      "chapters.list.time_learning": 1,
      "chapters.list.resources.title": 1,
      "chapters.list.resources.path": 1,
      "chapters.list.is_finished": 1,
      "chapters.list.testing_time": 1,
      "chapters.list.posttype": 1,
      "rating_detail": 1,
      "rating_count": 1,
      "user_permission": 1
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
    "value": "slug",
    "key": "slug"
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
  id: "67861e835b126d1f3fd58f65",
} as const;

export type GetDetailCourseConfig = typeof GET_DETAIL_COURSE;