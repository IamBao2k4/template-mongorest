export const GET_DANH_SÁCH_COUPON = {
  _id: "68061e95aac841dab05e296f",
  title: "GET danh sách coupon",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6801cba8887875ca1b8c4a3d"
],
  queryAdvance: `[

  {
    "$facet": {
      "meta_data": [
        {
          "$count": "count"
        },
        {
          "$addFields": {
            "skip": "@param:skip",
            "limit": "@param:limit"
          }
        }
      ],
      "data": [
        {
          "$skip": "@param:skip"
        },
        {
          "$limit": "@param:limit"
        }
      ]
    }
  }
]`,
  categories: [],
  tenant_id: "6801bf1b887875ca1b8c3ee4",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "_id",
    "value": "_id"
  },
  {
    "key": "created_by",
    "value": "created_by"
  },
  {
    "key": "updated_by",
    "value": "updated_by"
  },
  {
    "key": "created_at",
    "value": "created_at"
  },
  {
    "key": "updated_at",
    "value": "updated_at"
  }
],
  id: "",
} as const;

export type GETDanhSchCouponConfig = typeof GET_DANH_SÁCH_COUPON;