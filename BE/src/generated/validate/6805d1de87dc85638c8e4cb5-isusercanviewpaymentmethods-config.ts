export const ISUSERCANVIEWPAYMENTMETHODS = {
  _id: "6805d1de87dc85638c8e4cb5",
  title: "is-user-can-view-payment-methods",
  note: "Kiểm tra người dùng có quyền xem danh sách phương thức thanh toán",
  entity: [
  "6805ba9df4d18535c7e63b1d"
],
  data: {
  "id": "f5b65fba-70d3-46d9-89a3-24f4ebf4b663",
  "rules": [],
  "combinator": "and",
  "not": false
},
  required: [],
  queryMongodb: `{"$and":[{"$expr":true}]}`,
  locale: null,
  locale_id: null,
  tenant_id: "6801bf1b887875ca1b8c3ee4",
  advance: `[
  {
    "$match": {
      "$expr": {
        "$eq": [
          "$_id",
          { "$toObjectId": "@jwt:user.id" }
        ]
      }
    }
  },
  {
    "$lookup": {
      "from": "role",
      "localField": "role",
      "foreignField": "_id",
      "as": "roles"
    }
  },
  {
    "$project": {
      "_id": 0,
      "hasPermission": {
        "$cond": {
          "if": {
            "$gt": [
              {
                "$size": {
                  "$filter": {
                    "input": "$roles",
                    "as": "role",
                    "cond": {
                      "$gt": [
                        {
                          "$size": {
                            "$filter": {
                              "input": "$$role.permission",
                              "as": "perm",
                              "cond": {
                                "$and": [
                                  { "$eq": ["$$perm.entity", "ecommerce-payment-method"] },
                                  { 
                                    "$gt": [
                                      { 
                                        "$size": { 
                                          "$setIntersection": [
                                            "$$perm.filter", 
                                            ["get", "get-all"]
                                          ] 
                                        } 
                                      }, 
                                      0
                                    ]
                                  }
                                ]
                              }
                            }
                          }
                        },
                        0
                      ]
                    }
                  }
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
  }
]
`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsusercanviewpaymentmethodsConfig = typeof ISUSERCANVIEWPAYMENTMETHODS;