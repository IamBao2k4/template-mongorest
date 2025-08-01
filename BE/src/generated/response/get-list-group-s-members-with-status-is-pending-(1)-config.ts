export const GET_LIST_GROUP_S_MEMBERS_WITH_STATUS_IS_PENDING_(1) = {
  _id: "676cd4964ec833ce93a07eec",
  title: "Get list group's members with status is pending (1)",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674810a776462b61b5df8ece"
],
  queryAdvance: `[
  {
    "$match": {
      "social_group": "@param:group_id",
      "status": "pending"
    }
  },
  {
    "$addFields": {
      "userObject": {
        "$map": {
          "input": "$user",
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
      "localField": "userObject",
      "foreignField": "_id",
      "pipeline": [
        {
          "$project": {
            "password": 0
          }
        }
      ],
      "as": "user"
    }
  },
  {
    "$addFields": {
      "user": {
        "$arrayElemAt": ["$user", 0]
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
]
`,
  categories: [],
  tenant_id: "674028d2611a654e763a73e8",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [],
  id: "",
} as const;

export type GetListGroupsMembersWithStatusIsPending1Config = typeof GET_LIST_GROUP_S_MEMBERS_WITH_STATUS_IS_PENDING_(1);