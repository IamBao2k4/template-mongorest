export const GET_DETAIL_GROUPS_CATEGORY = {
  _id: "6764d305c34159fb897b7177",
  title: "Get detail group's category",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "674835d876462b61b5df90d1"
],
  queryAdvance: `[
{
  "$addFields": {
    "_id": { "$toString": "$_id" },
    "parent_id": {
      "$cond": {
        "if": { "$isArray": "$parent_id" },
        "then": {
          "$map": {
            "input": "$parent_id",
            "as": "pid",
            "in": {
              "$cond": {
                "if": { "$and": ["$$pid", { "$ne": ["$$pid", ""] }] },
                "then": { "$toObjectId": "$$pid" },
                "else": "$$REMOVE"
              }
            }
          }
        },
        "else": []
      }
    }
  }
},
  {
    "$match": {
      "_id": "@param:_id",
      "social_group": "@param:group_id",
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$lookup": {
      "from": "mge-group-category",
      "localField": "parent_id",
      "foreignField": "_id",
      "as": "parent_id"
    }
  },
  {
    "$facet": {
      "meta_data": [
        { "$count": "count" },
        {
          "$addFields": {
            "skip": "@param:skip",
            "limit": "@param:limit"
          }
        }
      ],
      "data": [{ "$skip": "@param:skip" }, { "$limit": "@param:limit" }]
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
    "value": "_id",
    "key": "_id"
  },
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
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "social_group",
    "value": "social_group"
  },
  {
    "key": "position",
    "value": "position"
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
  id: "6764d305c34159fb897b7177",
} as const;

export type GetDetailGroupsCategoryConfig = typeof GET_DETAIL_GROUPS_CATEGORY;