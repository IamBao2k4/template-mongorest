export const USERJOINEDGROUP2 = {
  _id: "67f8c51f36ac50fe5604cb61",
  title: "user-joined-group-2",
  note: "User đã tham gia nhóm chưa?",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "4cef4f65-45ba-4936-ac02-c8207f2604b3",
  "rules": [],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"$expr":true}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
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
    "key": "",
    "value": "social_group",
    "description": ""
  }
],
  categories: [],
  headers: [
  {
    "key": "",
    "value": "user.id",
    "description": ""
  }
],
  params: [
  {
    "key": "",
    "value": "group_id",
    "description": ""
  },
  {
    "key": "",
    "value": "_id",
    "description": ""
  }
],
} as const;

export type Userjoinedgroup2Config = typeof USERJOINEDGROUP2;