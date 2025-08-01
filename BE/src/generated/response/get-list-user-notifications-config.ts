export const GET_LIST_USER_NOTIFICATIONS = {
  _id: "67ea0bb57463d047317d32ad",
  title: "get list user notifications",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67a1b30e1aaf205cfbd70e02"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "to": "@jwt:user.id"
    }
  },
  {
    "$sort": {
      "created_at": -1
    }
  },
  {
    "$unionWith": {
      "coll": "notification-record",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id",
            "to": "@jwt:user.id",
            "status": "unread"
          }
        },
        {
          "$group": {
            "_id": null,
            "total_unread": {
              "$sum": 1
            }
          }
        },
        {
          "$project": {
            "_id": 0
          }
        }
      ]
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

export type GetListUserNotificationsConfig = typeof GET_LIST_USER_NOTIFICATIONS;