export const GET_DETAIL_COURSE_USER_TENANT_PROFILE = {
  _id: "67f49c22b3f8c11eb1bf6236",
  title: "get detail course user tenant profile",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67aad740a67aaa1951ca64b0"
],
  queryAdvance: `[
  {
    "$addFields": {
      "id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id",
      "user": "@param:_id"
    }
  },
  {
    "$addFields": {
      "full_name": {
        "$concat": [
          "$profile.first_name",
          " ",
          "$profile.last_name"
        ]
      }
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-level-mapping",
      "localField": "id",
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id"
          }
        },
        {
          "$addFields": {
            "tenant_level": {
              "$cond": {
                "if": {
                  "$and": [
                    {
                      "$ne": [
                        "$tenant_level",
                        null
                      ]
                    },
                    {
                      "$isArray": "$tenant_level"
                    }
                  ]
                },
                "then": {
                  "$map": {
                    "input": "$tenant_level",
                    "as": "u",
                    "in": {
                      "$toObjectId": "$$u"
                    }
                  }
                },
                "else": "$tenant_level"
              }
            }
          }
        },
        {
          "$lookup": {
            "from": "user-tenant-level",
            "localField": "tenant_level",
            "foreignField": "_id",
            "as": "tenant_level"
          }
        }
      ],
      "as": "role"
    }
  },
  {
    "$unwind": {
      "path": "$role",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$unwind": {
      "path": "$role.tenant_level",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$project": {
      "email": 1,
      "nickname": 1,
      "full_name": 1,
      "featured_image": "$profile.course.featured_image",
      "cover": "$profile.course.cover",
      "description": "$profile.course.description",
      "birthday": "$profile.course.birthday",
      "role": "$role.tenant_level.title"
    }
  },
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
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
  {
    "value": "_id",
    "key": "_id"
  },
  {
    "value": "skip",
    "key": "skip"
  },
  {
    "value": "limit",
    "key": "limit"
  }
],
  headers: [
  {
    "value": "x-tenant-id",
    "key": "x-tenant-id"
  }
],
  restricted: [],
  id: "",
} as const;

export type GetDetailCourseUserTenantProfileConfig = typeof GET_DETAIL_COURSE_USER_TENANT_PROFILE;