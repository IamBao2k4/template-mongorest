export const ISUSERHASPERMISSIONMANAGEGROUPREPORTS_NOT_NEED_GROUP_ID = {
  _id: "67848a582669d501febe379a",
  title: "is-user-has-permission-manage-group-reports (not need group id)",
  entity: [
  "6747ef07c47463d88f8c5ab1"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  advance: `[
  {
    "$match": {
      "_id": { "$exists": false }
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-image",
      "pipeline": [
        {
          "$addFields": {
            "type": "social-images"
          }
        }
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-videos",
      "pipeline": [
        {
          "$addFields": {
            "type": "videos"
          }
        }
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-tweet-social-news",
      "pipeline": [
        {
          "$addFields": {
            "type": "social-news"
          }
        }
      ]
    }
  },
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
      "document_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-user-reports",
      "localField": "document_id",
      "foreignField": "document_id",
      "pipeline": [
        {
          "$addFields": {
            "_id": {
              "$toString": "$_id"
            }
          }
        },
        {
          "$match": {
            "_id": "@param:_id"
          }
        }
      ],
      "as": "report_info"
    }
  },
  {
    "$match": {
      "report_info": { "$ne": [] }
    }
  },
  {
    "$lookup": {
      "from": "mge-group-member",
      "localField": "social_group",
      "foreignField": "social_group",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id",
            "status": "joined"
          }
        }
      ],
      "as": "memberStatus"
    }
  },
  {
    "$addFields": {
      "social_group": {
        "$map": {
          "input": "$social_group",
          "as": "sg",
          "in": {
            "$toObjectId": "$$sg"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-group",
      "localField": "social_group",
      "foreignField": "_id",
      "as": "group_info"
    }
  },
  {
    "$addFields": {
      "memberStatus": {
        "$arrayElemAt": ["$memberStatus", 0]
      }
    }
  },
  {
    "$addFields": {
      "group_info_permissions_match": {
        "$map": {
          "input": "$group_info",
          "as": "group",
          "in": {
            "$or": [
              {
                "$and": [
                  { "$isArray": "$$group.permissions.group_reports_manage" },
                  { "$in": ["$memberStatus.role", "$$group.permissions.group_reports_manage"] }
                ]
              },
              {
                "$and": [
                  { "$not": { "$isArray": "$$group.permissions.group_reports_manage" } },
                  { "$eq": ["$memberStatus.role", "$$group.permissions.group_reports_manage"] }
                ]
              }
            ]
          }
        }
      }
    }
  },
  {
    "$match": {
      "group_info_permissions_match": { "$elemMatch": { "$eq": true } }
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserhaspermissionmanagegroupreportsNotNeedGroupIdConfig = typeof ISUSERHASPERMISSIONMANAGEGROUPREPORTS_NOT_NEED_GROUP_ID;