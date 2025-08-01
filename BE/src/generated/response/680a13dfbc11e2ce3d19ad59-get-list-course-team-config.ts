export const GET_LIST_COURSE_TEAM = {
  _id: "680a13dfbc11e2ce3d19ad59",
  title: "get list course team",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "680608aaaac841dab05e1907"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$match": {
      "$expr": {
        "$and": [
          {
            "$cond": {
              "if": { "$ne": ["@param:department", null] },
              "then": { "$eq": ["$department", ["@param:department"]] },
              "else": true
            }
          }
        ]
      }
    }
  },
  {
    "$match": {
      "$expr": {
        "$or": [
          { "$eq": ["@param:title", null] },
          {
            "$regexMatch": {
              "input": "$title",
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
]
`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
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
  },
  {
    "value": "department",
    "key": "department"
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
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "code",
    "value": "code"
  },
  {
    "key": "department",
    "value": "department"
  },
  {
    "key": "_id",
    "value": "_id"
  },
  {
    "key": "created_by",
    "value": "created_by"
  },
  {
    "key": "updated_by",
    "value": "updated_by"
  },
  {
    "key": "created_at",
    "value": "created_at"
  },
  {
    "key": "updated_at",
    "value": "updated_at"
  }
],
  id: "680a13dfbc11e2ce3d19ad59",
} as const;

export type GetListCourseTeamConfig = typeof GET_LIST_COURSE_TEAM;