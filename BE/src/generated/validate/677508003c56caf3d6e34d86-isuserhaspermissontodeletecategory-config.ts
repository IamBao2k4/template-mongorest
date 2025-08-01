export const ISUSERHASPERMISSONTODELETECATEGORY = {
  _id: "677508003c56caf3d6e34d86",
  title: "is-user-has-permisson-to-delete-category",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "7607e6a6-1d19-46d3-9d97-a03dd4e59062",
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
        "$addFields": {
            "social_group_object_id": {
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
        "$match": {
            "user": "@jwt:user.id",
            "$or": [
            {"social_group": "@param:_id"},
            {"social_group": "@param:group_id"}
            ]
        }
    },
    {
        "$lookup": {
            "from": "mge-group",
            "localField": "social_group_object_id",
            "foreignField": "_id",
            "as": "group_info"
        }
    },
  {
    "$addFields": {
      "group_info": {
        "$arrayElemAt": [
          "$group_info",
          0
        ]
      }
    }
  },
  {
    "$addFields": {
      "can_update_member_in_group": {
        "$gt": [
          { 
            "$size": {
              "$setIntersection": [
                "$role", 
                "$group_info.permissions.group_category_delete"
              ]
            }
          },
          0
        ]
      }
    }
  },
  { "$match": { "can_update_member_in_group": true } }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: [
  {
    "value": "group_id",
    "key": "group_id"
  }
],
} as const;

export type IsuserhaspermissontodeletecategoryConfig = typeof ISUSERHASPERMISSONTODELETECATEGORY;