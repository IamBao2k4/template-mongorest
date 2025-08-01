export const GET_DETAIL_GROUP_OVERVIEW = {
  _id: "67a4879eb45a45be2aa95454",
  title: "get detail group overview",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67b6a286606da18e6c1976f1"
],
  queryAdvance: `[
  {
    "$match": {
      "status": "active",
      "social_group": "@param:group_id",
      "tenant_id":"@header:x-tenant-id"
    }
  },
  {
    "$group": {
      "_id": null,
      "post_count": {
        "$sum": 1
      }
    }
  },
  {
    "$unionWith": {
      "coll": "mge-group-member",
      "pipeline": [
        {
          "$match": {
            "social_group": "@param:group_id",
            "status":"joined",
            "tenant_id":"@header:x-tenant-id"
          }
        },
        {
          "$group": {
            "_id": "$to",
            "count": {
              "$sum": 1
            }
          }
        },
        {
          "$project": {
            "_id": 0,
            "count": 1
          }
        },
        {
          "$addFields": {
            "group_member_count": "$count"
          }
        }
      ]
    }
  },
  {
    "$group": {
      "_id": null,
      "post_count": {
        "$max": "$post_count"
      },
      "group_member_count": {
        "$max": "$group_member_count"
      }
    }
  },
  {
    "$project": {
      "_id": 0,
      "post_count": {
        "$ifNull": [
          "$post_count",
          0
        ]
      },
      "group_member_count": {
        "$ifNull": [
          "$group_member_count",
          0
        ]
      }
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
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetDetailGroupOverviewConfig = typeof GET_DETAIL_GROUP_OVERVIEW;