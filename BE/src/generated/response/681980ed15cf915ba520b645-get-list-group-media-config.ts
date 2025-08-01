export const GET_LIST_GROUP_MEDIA = {
  _id: "681980ed15cf915ba520b645",
  title: "get list group media",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67b6a286606da18e6c1976f1"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "social_group": "@param:group_id",
      "type": "file"
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
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$unwind": {
      "path": "$attachments",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$lookup": {
      "from": "media",
      "let": {
        "attachmentId": {
          "$toObjectId": "$attachments.attachment"
        }
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": ["$_id", "$$attachmentId"]
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
      "as": "attachment_detail"
    }
  },
  {
    "$unwind": {
      "path": "$attachment_detail",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$addFields": {
      "attachments.attachment": "$attachment_detail"
    }
  },
  {
    "$group": {
      "_id": "$_id",
      "doc": {
        "$mergeObjects": "$$ROOT"
      },
      "attachments": {
        "$push": "$attachments"
      }
    }
  },
  {
    "$replaceRoot": {
      "newRoot": {
        "$mergeObjects": [
          "$doc",
          {
            "attachments": "$attachments"
          }
        ]
      }
    }
  },
  {
    "$unwind": {
      "path": "$attachments",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$sort": {
      "created_at": -1
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
                {
                  "$ifNull": ["$profile.last_name", ""]
                },
                " ",
                {
                  "$ifNull": ["$profile.first_name", ""]
                }
              ]
            }
          }
        },
        {
          "$project": {
            "_id": "$user",
            "full_name": 1,
            "featured_image": "$profile.social.featured_image"
          }
        }
      ],
      "as": "user"
    }
  },
  {
    "$project": {
      "_id": 0,
      "attachment": "$attachments.attachment",
      "type": "$attachments.type",
      "user": 1,
      "title": 1
    }
  },
  {
    "$sort": {
      "created_at": -1
    }
  },
  {
    "$match": {
      "$expr": {
        "$or": [
          {
            "$eq": ["@param:type", null]
          },
          {
            "$eq": ["$type", ["@param:type"]]
          }
        ]
      }
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
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [
  {
    "value": "group_id",
    "key": "group_id"
  },
  {
    "value": "type",
    "key": "type"
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
    "key": "title",
    "value": "title"
  },
  {
    "key": "type",
    "value": "type"
  },
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "like_count",
    "value": "like_count"
  },
  {
    "key": "comment_count",
    "value": "comment_count"
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
  id: "681980ed15cf915ba520b645",
} as const;

export type GetListGroupMediaConfig = typeof GET_LIST_GROUP_MEDIA;