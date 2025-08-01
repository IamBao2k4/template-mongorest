export const GET_LIST_GROUP_JOINED = {
  _id: "6763ca940ac6cdefe65cdd88",
  title: "Get list group joined",
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
    "$match":{
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
            "$expr": {
              "$and": [
                { "$in": ["@jwt:user.id", "$user"] },
                { "$eq": ["$status", ["joined"]] }

              ]
            }
          }
        }
      ],
      "as": "memberStatus"
    }
  },
    {
    "$match": {
      "memberStatus": { "$ne": [] }
    }
  },
  {
    "$project": {
      "group_members":0
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
    "$sort": {
      "member_count":-1
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
  restricted: [],
  id: "",
} as const;

export type GetListGroupJoinedConfig = typeof GET_LIST_GROUP_JOINED;