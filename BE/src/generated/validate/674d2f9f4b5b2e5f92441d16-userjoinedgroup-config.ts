export const USERJOINEDGROUP = {
  _id: "674d2f9f4b5b2e5f92441d16",
  title: "user-joined-group",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "fda2799f-6553-4d66-b2bf-b771d02a3993",
  "rules": [],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"$expr":true}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  advance: `[
  {
    "$match": {
      "user": "@jwt:user.id",
      "status": "joined",
      "$or": [
        {
          "social_group": "@param:group_id"
        },
        {
          "social_group": "@param:_id"
        },
        {
          "social_group": "@body:social_group"
        }
      ]
    }
  },
  {
    "$addFields": {
      "social_group_as_objectId": {
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
      "localField": "social_group_as_objectId",
      "foreignField": "_id",
      "as": "group_data",
      "pipeline": [
        {
          "$match": {
            "status": "active"
          }
        }
      ]
    }
  },
  {
    "$match": {
      "group_data": {
        "$ne": []
      }
    }
  }
]`,
  documents: [],
  body: [
  {
    "value": "social_group",
    "key": "social_group"
  }
],
  categories: [],
  headers: [
  {
    "value": "user.id",
    "key": "user.id"
  }
],
  params: [
  {
    "value": "group_id",
    "key": "group_id"
  },
  {
    "value": "_id",
    "key": "_id"
  }
],
} as const;

export type UserjoinedgroupConfig = typeof USERJOINEDGROUP;