export const ISUSERHASPERMISSIONUPDATEGROUPMEMBER = {
  _id: "675aaa34049b30e1807cf4e5",
  title: "is-user-has-permission-update-group-member",
  note: "bảng group-member -> match user và social group -> lookup qua bảng group -> check field group_member_update chứa role gì -> trả true nếu role user nằm trong field group_member_update",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "ac164154-9c8f-4077-9f57-92585399333b",
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
                "$group_info.permissions.group_member_update"
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
    "value": "_id",
    "key": "_id"
  },
  {
    "value": "group_id",
    "key": "group_id"
  }
],
} as const;

export type IsuserhaspermissionupdategroupmemberConfig = typeof ISUSERHASPERMISSIONUPDATEGROUPMEMBER;