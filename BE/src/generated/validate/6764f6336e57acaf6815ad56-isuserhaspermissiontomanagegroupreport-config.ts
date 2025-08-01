export const ISUSERHASPERMISSIONTOMANAGEGROUPREPORT = {
  _id: "6764f6336e57acaf6815ad56",
  title: "is-user-has-permission-to-manage-group-report",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "6362fcce-1c1d-40c8-8af8-3bbb5ee39ae1",
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
      "social_group": "@params:group_id"
    }
  },
  {
    "$addFields": {
      "social_group": {
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
      "localField": "social_group",
      "foreignField": "_id",
      "as": "group_info"
    }
  },
  {
    "$addFields": {
      "group_info": { "$arrayElemAt": ["$group_info", 0] }
    }
  },
  {
    "$addFields": {
      "can_manage_group_reports": {
        "$gt": [
          { 
            "$size": {
              "$setIntersection": [
                "$role", 
                "$group_info.permissions.group_reports_manage"
              ]
            }
          },
          0
        ]
      }
    }
  },
  { "$match": { "can_manage_group_reports": true } }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "_id",
    "key": "_id"
  },
  {
    "value": "group_id",
    "key": "group_id"
  }
],
} as const;

export type IsuserhaspermissiontomanagegroupreportConfig = typeof ISUSERHASPERMISSIONTOMANAGEGROUPREPORT;