export const ISUSERJOINEDGROUP = {
  _id: "67f8f15436ac50fe5604e7b5",
  title: "is-user-joined-group",
  note: "Kiểm tra xem người dùng đã tham gia vào nhóm hay chưa, trả về kết quả nếu user đã join và status là 'joined'",
  entity: [
  "674810a776462b61b5df8ece"
],
  data: {
  "id": "is-user-joined-group",
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
  },
  {
    "$project": {
      "_id": 1,
      "user": 1,
      "social_group": 1,
      "status": 1,
      "role": 1,
      "is_member": true
    }
  }
]`,
  documents: [],
  body: [
  {
    "key": "",
    "value": "social_group",
    "description": "ID của nhóm được gửi trong body request"
  }
],
  categories: [],
  headers: [
  {
    "key": "",
    "value": "user.id",
    "description": "ID của người dùng hiện tại từ JWT token"
  }
],
  params: [
  {
    "key": "",
    "value": "group_id",
    "description": "ID của nhóm cần kiểm tra tư cách thành viên"
  }
],
} as const;

export type IsuserjoinedgroupConfig = typeof ISUSERJOINEDGROUP;