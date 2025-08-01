export const GET_DETAIL_CONTACT = {
  _id: "67d3de85bb2f439d1902a2b1",
  title: "get detail contact",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67d29b47b6962f9420f43ebb"
],
  queryAdvance: `[
  {
    "$addFields": {
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "$or":[
        {"id": "@param:_id"},
        {"slug":"@param:slug"}
      ]
    }
  },
  {
    "$addFields": {
      "logo": {
        "$map": {
          "input": "$logo",
          "as": "u",
          "in": {
            "$toObjectId": "$$u"
          }
        }
      },
      "cover_image": {
        "$map": {
          "input": "$cover_image",
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
      "from": "media",
      "localField": "logo",
      "foreignField": "_id",
      "pipeline": [
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
      "as": "logo"
    }
  },
  {
    "$lookup": {
      "from": "media",
      "localField": "cover_image",
      "foreignField": "_id",
      "pipeline": [
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
  tenant_id: "67c6ad0ccb2d3f0de04c67eb",
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
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetDetailContactConfig = typeof GET_DETAIL_CONTACT;