export const GET_LIST_GROUPS_PIN = {
  _id: "67642fc5c34159fb897b6f7b",
  title: "Get list groups pin",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674810a776462b61b5df8ece"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "user": "@jwt:user.id",
      "status": "joined"
    }
  },
  {
    "$addFields": {
      "groupObject": {
        "$map": {
          "input": "$social_group",
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
      "from": "mge-group",
      "localField": "groupObject",
      "foreignField": "_id",
      "pipeline": [
        {
          "$match": {
            "status": "active",
            "tenant_id": "@header:x-tenant-id"
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
      "as": "social_group"
    }
  },
  {
    "$unwind": "$social_group"
  },
  {
    "$replaceRoot": {
      "newRoot": "$social_group"
    }
  },
  {
    "$addFields": {
      "group_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-group-member",
      "localField": "group_id",
      "foreignField": "social_group",
      "pipeline": [
        {
          "$match": {
            "status": "joined",
            "tenant_id": "@header:x-tenant-id"
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
    "$lookup": {
      "from": "mge-group-pin",
      "localField": "group_id",
      "foreignField": "social_group",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id"
          }
        }
      ],
      "as": "pinned_info"
    }
  },
  {
    "$addFields": {
      "pinned": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": "$pinned_info"
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
    "$match": {
      "$expr": {
        "$and": [
          {
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
          },
          {
            "$or": [
              {
                "$eq": [
                  "@param:pinned",
                  null
                ]
              },
              {
                "$eq": [
                  "$pinned",
                  {
                    "$convert": {
                      "input": "@param:pinned",
                      "to": "bool",
                      "onError": false,
                      "onNull": null
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
{
  "$addFields": {
    "sort_position": {
      "$cond": {
        "if": {
          "$or": [
            { "$eq": [{ "$type": "$pinned_info.position" }, "missing"] },
            { "$eq": ["$pinned_info.position", null] },
            { "$eq": [{ "$type": "$pinned_info" }, "missing"] },
            { "$eq": ["$pinned_info", null] },
            { "$eq": [{ "$size": "$pinned_info" }, 0] }
          ]
        },
        "then": 9999999999999,
        "else": "$pinned_info.position"
      }
    }
  }
},
  {
    "$unwind": {
      "path": "$sort_position",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$sort": {
      "sort_position": 1,
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
]`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "title",
    "key": "title"
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
    "value": "group_id",
    "key": "group_id"
  },
  {
    "value": "pinned",
    "key": "pinned"
  }
],
  headers: [
  {
    "value": "user.id",
    "key": "user.id"
  },
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  restricted: [
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "user",
    "value": "user"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "isFollow",
    "value": "isFollow"
  },
  {
    "key": "role",
    "value": "role"
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

export type GetListGroupsPinConfig = typeof GET_LIST_GROUPS_PIN;