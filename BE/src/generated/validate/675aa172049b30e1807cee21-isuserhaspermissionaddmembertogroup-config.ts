export const ISUSERHASPERMISSIONADDMEMBERTOGROUP = {
  _id: "675aa172049b30e1807cee21",
  title: "is-user-has-permission-add-member-to-group",
  note: "User có được phép thêm thành viên vào nhóm không?",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "99721fa0-7f06-4bee-9412-3d3a81c7232e",
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
      "social_group": "@param:group_id"
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
      "can_add_member": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": {
                  "$setIntersection": [
                    "$role",
                    "$group_info.permissions.group_member_add"
                  ]
                }
              },
              0
            ]
          },
          "then": true,
          "else": false
        }
      }
    }
  },
  {
    "$match": {
      "can_add_member": true
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  logged: true,
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

export type IsuserhaspermissionaddmembertogroupConfig = typeof ISUSERHASPERMISSIONADDMEMBERTOGROUP;