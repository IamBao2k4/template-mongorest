export const GET_LIST_ALL_GROUP_(EXCEPT_SECRET_GROUP) = {
  _id: "67b60b8adaf8793d547d81e3",
  title: "get list all group (except secret group)",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6747ef07c47463d88f8c5ab1"
],
  queryAdvance: `[
    {
        "$match": {
          "$or": [
            {"type": "public"},
            {"type": "private"}
            ],
            "status":"active",
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
                        "status": "joined",
                        "tenant_id":"@header:x-tenant-id"
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
      }
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

export type GetListAllGroupExceptSecretGroupConfig = typeof GET_LIST_ALL_GROUP_(EXCEPT_SECRET_GROUP);