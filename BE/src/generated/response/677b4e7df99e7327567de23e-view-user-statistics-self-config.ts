export const VIEW_USER_STATISTICS_SELF = {
  _id: "677b4e7df99e7327567de23e",
  title: "view user statistics (self)",
  note: "user xem thống kê số bài viết, số follower, số  group đã tham gia của bản thân",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67b6a286606da18e6c1976f1"
],
  queryAdvance: `[
  {
    "$match": {
      "status": "active",
      "created_by": "@param:user_id",
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
            "user": "@param:user_id",
            "status": "joined",
            "tenant_id":"@header:x-tenant-id"
          }
        },
        {
          "$group": {
            "_id": null,
            "group_count": {
              "$sum": 1
            }
          }
        }
      ]
    }
  },
  {
    "$unionWith": {
      "coll": "mge-user-follow",
      "pipeline": [
        {
          "$match": {
            "to": "@param:user_id",
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
            "follower_count": "$count"
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
      "group_count": {
        "$max": "$group_count"
      },
      "follower_count": {
        "$max": "$follower_count"
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
      "group_count": {
        "$ifNull": [
          "$group_count",
          0
        ]
      },
      "follower_count": {
        "$ifNull": [
          "$follower_count",
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
    "value": {
      "value": "skip",
      "key": "skip"
    },
    "key": {
      "value": "skip",
      "key": "skip"
    }
  },
  {
    "value": {
      "value": "limit",
      "key": "limit"
    },
    "key": {
      "value": "limit",
      "key": "limit"
    }
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
    "value": "user_id",
    "key": "user_id"
  }
],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type ViewUserStatisticsSelfConfig = typeof VIEW_USER_STATISTICS_SELF;