export const _ = {
  _id: "67e3dc65cbade95760900adf",
  title: " ",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67aad740a67aaa1951ca64b0"
],
  queryAdvance: `[
  {
    "$addFields": {
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$addFields": {
      "profile.full_name": {
        "$concat": [
          "$profile.first_name",
          " ",
          "$profile.last_name"
        ]
      }
    }
  },
  {
    "$unwind": {
      "path": "$user",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$addFields": {
      "profile.social._id": "$user"
    }
  },
  {
    "$addFields": {
      "profile.course._id": "$user"
    }
  },
  {
    "$match": {
      "$expr": {
        "$or": [
          {
            "$eq": [
              "@param:full_name",
              null
            ]
          },
          {
            "$regexMatch": {
              "input": "$profile.full_name",
              "regex": "@param:full_name",
              "options": "i"
            }
          }
        ]
      }
    }
  },
  {
    "$project": {
      "default_password": 0,
      "id": 0,
      "profile.first_name": 0,
      "profile.last_name": 0
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
    "value": "full_name",
    "key": "full_name"
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
  data: {
  "id": "80eac408-2a35-4e1d-a7b7-c4889f7bfe11",
  "rules": [],
  "combinator": "and",
  "not": false
},
  restricted: [
  {
    "key": "email",
    "value": "email"
  },
  {
    "key": "user",
    "value": "user"
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
  id: "",
} as const;

export type  Config = typeof _;