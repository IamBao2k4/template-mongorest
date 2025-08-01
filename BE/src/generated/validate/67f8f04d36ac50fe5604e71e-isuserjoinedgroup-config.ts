export const ISUSERJOINEDGROUP = {
  _id: "67f8f04d36ac50fe5604e71e",
  title: "is-user-joined-group",
  note: "Kiểm tra xem người dùng đã tham gia vào nhóm hay chưa, trả về kết quả nếu user đã join và status là 'joined'",
  entity: "mge-group-member",
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "674028d2611a654e763a73e8",
  advance: `[
  {
    "$match": {
      "user": "@jwt:user.id",
      "social_group": "@param:group_id",
      "status": "joined"
    }
  },
  {
    "$addFields": {
      "is_member": {
        "$cond": {
          "if": {
            "$eq": [
              { "$ifNull": ["$_id", null] },
              null
            ]
          },
          "then": false,
          "else": true
        }
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
      "is_member": 1
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserjoinedgroupConfig = typeof ISUSERJOINEDGROUP;