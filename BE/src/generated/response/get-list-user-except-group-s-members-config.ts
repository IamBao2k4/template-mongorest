export const GET_LIST_USER_EXCEPT_GROUP_S_MEMBERS = {
  _id: "676cdda94ec833ce93a07fa7",
  title: "Get list user except group's members",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6757b1998659c9e98a2f1e2b"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "user": {
        "$ne": "@jwt:user.id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-group-member",
      "localField": "user",
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "social_group": "@param:group_id",
            "$or": [
              {
                "status": "joined"
              },
              {
                "status": "pending"
              }
            ]
          }
        }
      ],
      "as": "matchedMembers"
    }
  },
  {
    "$match": {
      "matchedMembers": {
        "$eq": []
      }
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "user",
      "foreignField": "user",
      "pipeline": [
        {
          "$match":{
            "tenant_id":"@header:x-tenant-id"
          }
        },
        {
          "$addFields": {
            "full_name": {
              "$concat": [
                "$profile.social.last_name",
                " ",
                "$profile.social.first_name"
              ]
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "full_name": 1,
            "featured_image": "$profile.social.featured_image"
          }
        }
      ],
      "as": "user"
    }
  },
  {
    "$unwind": "$user"
  },
  {
    "$replaceRoot": {
      "newRoot": "$user"
    }
  },
  {
    "$match": {
      "$expr": {
        "$or": [
          {
            "$eq": [
              "@param:title",
              null
            ]
          },
          {
            "$regexMatch": {
              "input": "$full_name",
              "regex": "@param:title",
              "options": "i"
            }
          }
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
  },
  {
    "value": "title",
    "key": "title"
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  data: {
  "id": "a7c7184c-151f-4d81-b747-f9ee2c572714",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [],
  id: "",
} as const;

export type GetListUserExceptGroupsMembersConfig = typeof GET_LIST_USER_EXCEPT_GROUP_S_MEMBERS;