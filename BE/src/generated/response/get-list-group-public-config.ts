export const GET_LIST_GROUP_PUBLIC = {
  _id: "6763b78d66e06fcc01e7545b",
  title: "Get list group public",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6747ef07c47463d88f8c5ab1"
],
  queryAdvance: `[
    {
        "$match": {
            "type": "public",
            "tenant_id":"@header:x-tenant-id"
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
            "from": "mge-group-member",
            "localField": "_id",
            "foreignField": "social_group",
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
        "$lookup": {
            "from": "mge-group-member",
            "localField": "_id",
            "foreignField": "social_group",
            "pipeline": [
                {
                    "$match": {
                        "$or": [
                        {"status": "joined"},
                        {"status": "pending"}
                        ],
                        "user":"@jwt:user.id"
                    }
                }
            ],
            "as": "user_joined_groups"
        }
    },
    {
        "$addFields": {
            "is_user_in_group": {
                "$gt": [{ "$size": "$user_joined_groups" }, 0]
            }
        }
    },
    {
        "$match": {
            "is_user_in_group": false
        }
    },
    {
        "$project": {
            "group_members": 0,
            "id": 0,
            "user_joined_groups": 0,
            "is_user_in_group": 0
        }
    },
    {
          "$lookup": {
            "from": "media",
            "let": { "featuredImageId": { "$arrayElemAt": [ "$cover", 0 ] } },
            "pipeline": [
              {
                "$match": {
                  "$expr": {
                    "$eq": [ "$_id", { "$toObjectId": "$$featuredImageId" } ]
                  }
                }
              },
              {
                "$addFields": {
                  "path": {
                    "$concat": [
                      {
                        "$cond": [
                          { "$eq": [ "minio", "@app_settings:storage_type" ] },
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
            "let": { "featuredImageId": { "$arrayElemAt": [ "$featured_image", 0 ] } },
            "pipeline": [
              {
                "$match": {
                  "$expr": {
                    "$eq": [ "$_id", { "$toObjectId": "$$featuredImageId" } ]
                  }
                }
              },
              {
                "$addFields": {
                  "path": {
                    "$concat": [
                      {
                        "$cond": [
                          { "$eq": [ "minio", "@app_settings:storage_type" ] },
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
    "$match": {
      "$expr": {
        "$or": [
          { "$eq": [ "@param:title", null ] },
          {
            "$regexMatch": {
              "input": "$title",
              "regex": "@param:title",
              "options": "i"
            }
          }
        ]
      },
      "status": "active"
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
            "data": [
                { "$skip": "@param:skip" },
                { "$limit": "@param:limit" }
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
  restricted: [],
  id: "",
} as const;

export type GetListGroupPublicConfig = typeof GET_LIST_GROUP_PUBLIC;