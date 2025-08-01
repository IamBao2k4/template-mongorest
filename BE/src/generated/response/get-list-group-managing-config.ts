export const GET_LIST_GROUP_MANAGING = {
  _id: "6763c55f0ac6cdefe65cdc83",
  title: "Get list group managing",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6747ef07c47463d88f8c5ab1"
],
  queryAdvance: `[
  {
    "$addFields": {
      "_id": { "$toString": "$_id" }
    }
  },
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$lookup": {
      "from": "mge-group-member",
      "localField": "_id",
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
      "from": "mge-group-member",
      "localField": "_id",
      "foreignField": "social_group",
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                { "$in": ["@jwt:user.id", "$user"] },
                {
                  "$or": [{ "$eq": ["$role", ["owner"]] }, { "$eq": ["$role", ["manager"]] }]
                }
              ]
            },
            "status": "joined"
          }
        }
      ],
      "as": "member_status"
    }
  },
  {
    "$match": {
      "member_status": { "$ne": [] }
    }
  },
  {
    "$project": {
      "group_members": 0
    }
  },
  {
    "$lookup": {
      "from": "media",
      "let": { "featuredImageId": { "$arrayElemAt": ["$cover", 0] } },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": ["$_id", { "$toObjectId": "$$featuredImageId" }]
            }
          }
        },
        {
          "$addFields": {
            "path": {
              "$concat": [
                {
                  "$cond": [
                    { "$eq": ["minio", "@app_settings:storage_type"] },
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
    "$match": {
      "$expr": {
        "$or": [
          { "$eq": ["@param:title", null] },
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
    "$sort": {
      "created_at": -1
    }
  },
  {
    "$facet": {
      "meta_data": [
        { "$count": "count" },
        {
          "$addFields": {
            "skip": "@param:skip",
            "limit": "@param:limit"
          }
        }
      ],
      "data": [{ "$skip": "@param:skip" }, { "$limit": "@param:limit" }]
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
  "id": "325f94cc-289c-4dc9-a1d1-009d944ceb30",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [
  {
    "key": "cover",
    "value": "cover"
  },
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "slug",
    "value": "slug"
  },
  {
    "key": "description",
    "value": "description"
  },
  {
    "key": "type",
    "value": "type"
  },
  {
    "key": "status",
    "value": "status"
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
  id: "6763c55f0ac6cdefe65cdc83",
} as const;

export type GetListGroupManagingConfig = typeof GET_LIST_GROUP_MANAGING;