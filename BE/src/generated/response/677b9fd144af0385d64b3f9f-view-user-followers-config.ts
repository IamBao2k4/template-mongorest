export const VIEW_USER_FOLLOWERS = {
  _id: "677b9fd144af0385d64b3f9f",
  title: "view user followers",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67611eb5deb9ba00adac5876"
],
  queryAdvance: `[
  {
    "$match": {
      "to": "@param:user_id",
      "tenant_id":"@header:x-tenant-id"
    }
  },
  {
    "$addFields": {
      "to": {
        "$map": {
          "input": "$to",
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
      "localField": "to",
      "foreignField": "_id",
      "pipeline":[
        {
          "$project": {
            "password":0,
            "role_system":0
          }
        }
        ],
      "as": "followers_info"
    }
  },
  {
    "$project": {
      "followers_info.password": 0
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
]
`,
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
  restricted: [],
  id: "",
} as const;

export type ViewUserFollowersConfig = typeof VIEW_USER_FOLLOWERS;