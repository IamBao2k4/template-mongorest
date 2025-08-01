export const VIEW_USER_FOLLOWING = {
  _id: "677b9b96b664f6a42454114a",
  title: "view user following",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67611eb5deb9ba00adac5876"
],
  queryAdvance: `[
    {
        "$match": {
            "to": "@param:user_id"
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
        "$addFields": {
            "from": {
                "$map": {
                    "input": "$from",
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
            "from": "user",
            "localField": "from",
            "foreignField": "_id",
            "as": "from",
            "pipeline": [
                {
                    "$lookup": {
                        "from": "media",
                        "let": {
                            "featuredImageId": {
                                "$arrayElemAt": [
                                    "$featured_image",
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
                        "as": "featured_image"
                    }
                },
            ]
        }
    },
    {
        "$addFields": {
            "from": {
                "$map": {
                    "input": "$from",
                    "as": "user",
                    "in": {
                        "$mergeObjects": [
                            "$$user",
                            {
                                "id_record": "$id"
                            }
                        ]
                    }
                }
            }
        }
    },
    {
        "$project": {
            "from": {
                "_id": 1,
                "full_name": 1,
                "featured_image": 1,
                "id_record": 1
            }
        }
    },
    {
        "$unwind": {
            "path": "$from",
            "preserveNullAndEmptyArrays": true
        }
    },
    {
        "$replaceRoot": {
            "newRoot": "$from"
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
    "value": "user_id",
    "key": "user_id"
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
  data: {
  "id": "f6a5d5fa-282b-4fb7-b88c-c83f143a2470",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type ViewUserFollowingConfig = typeof VIEW_USER_FOLLOWING;