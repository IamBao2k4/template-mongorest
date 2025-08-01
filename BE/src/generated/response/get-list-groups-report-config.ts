export const GET_LIST_GROUPS_REPORT = {
  _id: "6764ec476e57acaf6815ac7a",
  title: "Get list group's report",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67b6a286606da18e6c1976f1"
],
  queryAdvance: `[
  {
    "$unionWith": {
      "coll": "mge-tweet-comment",
      "pipeline": [
        {
          "$addFields": {
            "type": "comment"
          }
        }
      ]
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
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "social_group": "@param:group_id"
    }
  },
  {
    "$addFields": {
      "group": {
        "$map": {
          "input": "$social_group",
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
      "from": "mge-group",
      "localField": "group",
      "foreignField": "_id",
      "as": "social_group"
    }
  },
  {
    "$lookup": {
      "from": "mge-user-reports",
      "localField": "_id",
      "foreignField": "document_id",
      "pipeline": [
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
                      "$profile.last_name",
                      " ",
                      "$profile.first_name"
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
            "as": "user_report"
          }
        }
      ],
      "as": "report_info"
    }
  },
  {
    "$match": {
      "report_info": {
        "$ne": []
      }
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "created_by",
      "foreignField": "user",
      "pipeline": [
        {
          "$addFields": {
            "full_name": {
              "$concat": [
                "$profile.last_name",
                " ",
                "$profile.first_name"
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
      "as": "author"
    }
  },
  {
    "$sort": {
      "report_info.created_at": -1
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
    "value": "group_id",
    "key": "group_id"
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

export type GetListGroupsReportConfig = typeof GET_LIST_GROUPS_REPORT;