export const GET_DETAIL_COURSE_STATICS = {
  _id: "6820920fa8a8906b8fa87546",
  title: "get detail course statics",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "681dbedfa8a8906b8fa78291"
],
  queryAdvance: `[
  {
    "$match": {
      "course": "@param:course_id"
    }
  },
  {
    "$addFields": {
      "start_date": {
        "$dateTrunc": {
          "date": "$start_date",
          "unit": "day"
        }
      },
      "end_date": {
        "$dateTrunc": {
          "date": "$end_date",
          "unit": "day"
        }
      },
      "log_date": {
        "$dateTrunc": {
          "date": "$time_stamp",
          "unit": "day"
        }
      }
    }
  },
  {
    "$match": {
      "$expr": {
        "$and": [
          {
            "$or": [
              {
                "$and": [
                  {
                    "$ne": [
                      "$start_date",
                      null
                    ]
                  },
                  {
                    "$ne": [
                      "$end_date",
                      null
                    ]
                  },
                  {
                    "$and": [
                      {
                        "$gte": [
                          "$log_date",
                          "$start_date"
                        ]
                      },
                      {
                        "$lte": [
                          "$log_date",
                          "$end_date"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "$or": [
                  {
                    "$eq": [
                      "$start_date",
                      null
                    ]
                  },
                  {
                    "$eq": [
                      "$end_date",
                      null
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
{
"$lookup":{
  "from":"mge-course-member",
  "localField":"course",
  "foreignField":"course",
  "pipeline":[
    {
    "$match":{
      "tenant_id":"@header:x-tenant-id",
      "status":"joined"
    }
    }
  ],
  "as":"all_members"
}
},
  {
    "$addFields": {
      "all_members": {
        "$size": "$all_members"
      }
    }
  },
  {
    "$sort": {
      "time_stamp": -1 // Sắp xếp giảm dần để cái mới nhất lên đầu
    }
  },
  {
    "$facet": {
      "meta_data": [
        { "$count": "count" },
        {
          "$addFields": {
            "skip": "@param:skip",
            "limit": "@param:limit"
          }
        }
      ],
      "data": [
        { "$skip": "@param:skip" },
        { "$limit": "@param:limit" }
      ]
    }
  }
]`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "course_id",
    "key": "course_id"
  },
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  },
  {
    "value": "start_date",
    "key": "start_date"
  },
  {
    "value": "end_date",
    "key": "end_date"
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
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
  id: "6820920fa8a8906b8fa87546",
} as const;

export type GetDetailCourseStaticsConfig = typeof GET_DETAIL_COURSE_STATICS;