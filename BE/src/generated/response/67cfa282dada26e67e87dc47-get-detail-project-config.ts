export const GET_DETAIL_PROJECT = {
  _id: "67cfa282dada26e67e87dc47",
  title: "get detail project",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67c6ccd9412d5b4c1e2bf08c"
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
      "$or": [
        {
          "id": "@param:_id"
        },
        {
          "slug": "@param:slug"
        }
      ]
    }
  },
  {
    "$addFields": {
      "created_by": {
        "$toObjectId": "$created_by"
      }
    }
  },
  {
    "$lookup": {
      "from": "user",
      "localField": "created_by",
      "foreignField": "_id",
      "pipeline": [
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
          "$project": {
            "password": 0,
            "role_system": 0
          }
        }
      ],
      "as": "created_by"
    }
  },
  {
    "$addFields": {
      "contact": {
        "$map": {
          "input": "$contact",
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
      "from": "mge-listing-contact",
      "localField": "contact",
      "foreignField": "_id",
      "pipeline": [
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
        }
      ],
      "as": "contact"
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
  },
  {
    "value": "slug",
    "key": "slug"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetDetailProjectConfig = typeof GET_DETAIL_PROJECT;