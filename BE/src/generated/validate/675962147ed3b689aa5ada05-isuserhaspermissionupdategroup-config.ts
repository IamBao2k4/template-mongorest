export const ISUSERHASPERMISSIONUPDATEGROUP = {
  _id: "675962147ed3b689aa5ada05",
  title: "is-user-has-permission-update-group",
  note: "Thêm field check status task: bug, done, in progress",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "db17f309-cfde-483d-a594-0e77b0e426b6",
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
      "$or": [
        {"social_group": "@params:group_id"},
        {"social_group": "@params:_id"}
        ]
      
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
      "can_update_group_info": {
        "$gt": [
          { 
            "$size": {
              "$setIntersection": [
                "$role", 
                "$group_info.permissions.group_info_update"
              ]
            }
          },
          0
        ]
      }
    }
  },
  { "$match": { "can_update_group_info": true } }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  logged: true,
  params: [
  {
    "value": "_id",
    "key": "_id"
  }
],
} as const;

export type IsuserhaspermissionupdategroupConfig = typeof ISUSERHASPERMISSIONUPDATEGROUP;