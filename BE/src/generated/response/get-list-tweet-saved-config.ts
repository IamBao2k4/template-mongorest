export const GET_LIST_TWEET_SAVED = {
  _id: "67cec408dada26e67e877b07",
  title: "get list tweet saved",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c66d92cb2d3f0de04bccc1"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$addFields": {
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-listing-tweet-saved",
      "localField": "id",
      "foreignField": "tweet_id",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id",
            "created_by": "@jwt:user.id"
          }
        }
      ],
      "as": "saved_info"
    }
  },
  {
    "$match": {
      "saved_info": {
        "$ne": []
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
      "from": "mge-listing-category",
      "localField": "category",
      "foreignField": "_id",
      "as": "category"
    }
  },
  {
    "$addFields": {
      "featured_image": {
        "$map": {
          "input": "$featured_image",
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
      "localField": "featured_image",
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
      "as": "featured_image"
    }
  },
  {
    "$sort":{
      "created_at":-1
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
  data: {
  "id": "95cee7d6-18b3-46d2-bcbc-179313140292",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type GetListTweetSavedConfig = typeof GET_LIST_TWEET_SAVED;