export const GET_INFO_TENANT_ = {
  _id: "67b4bad14cd70d34a3f028fb",
  title: "get info tenant ",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6740251baefaffc3e4662e6b"
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
      "_id": "@header:x-tenant-id"
    }
  },
  {
    "$lookup": {
    "from": "media",
    "let": { "logoId": { "$arrayElemAt": [ "$settings.logo", 0 ] } },
    "pipeline": [
              {
                "$match": {
                  "$expr": {
                    "$eq": [ "$_id", { "$toObjectId": "$$logoId" } ]
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
            "as": "settings.logo"
          }
        },
  {
    "$project":{
      "mge_setting":0,
      "course_setting":0
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
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetInfoTenant Config = typeof GET_INFO_TENANT_;