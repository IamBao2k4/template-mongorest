export const GET_LIST_COURSE_USER_JOINED = {
  _id: "6785dc14d6d51abef2b11863",
  title: "get list course user joined",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "67529c0665017d942f7592d1"
],
  queryAdvance: `[
  {
    "$match": {
      "tenant_id": "@header:x-tenant-id"
    }
  },
  {
    "$lookup": {
      "from": "media",
      "let": { "featuredImageId": { "$arrayElemAt": ["$cover_image", 0] } },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$eq": ["$_id", { "$toObjectId": "$$featuredImageId" }]
            }
          }
        },
        {
          "$addFields": {
            "path": {
              "$concat": [
                {
                  "$cond": [
                    { "$eq": ["minio", "@app_settings:storage_type"] },
                    "@app_settings:minio.public",
                    "@app_settings:doSpace.public"
                  ]
                },
                "/",
                "$disk",
                "/",
                "$filename"
              ]
            }
          }
        }
      ],
      "as": "cover_image"
    }
  },
  {
    "$addFields": {
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-course-member",
      "localField": "_id",
      "foreignField": "course",
      "pipeline": [
        {
          "$match": {
            "user": "@jwt:user.id",
            "status": "joined"
          }
        }
      ],
      "as": "memberStatus"
    }
  },
  {
    "$match": {
      "memberStatus": { "$ne": [] }
    }
  },
  {
    "$lookup": {
      "from": "mge-course-member",
      "localField": "_id",
      "foreignField": "course",
      "pipeline": [
        {
          "$match": {
            "status": "joined"
          }
        }
      ],
      "as": "group_members"
    }
  },
  {
    "$addFields": {
      "member_count": {
        "$size": "$group_members"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-categories",
      "localField": "category",
      "foreignField": "id",
      "pipeline": [
        {
          "$project": {
            "title": 1,
            "slug": 1
          }
        }
      ],
      "as": "category"
    }
  },
  {
    "$project": {
      "group_members": 0
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
      "data": [{ "$skip": "@param:skip" }, { "$limit": "@param:limit" }]
    }
  }
]
`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [
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
  restricted: [
  {
    "key": "title",
    "value": "title"
  },
  {
    "key": "slug",
    "value": "slug"
  },
  {
    "key": "short_description",
    "value": "short_description"
  },
  {
    "key": "long_description",
    "value": "long_description"
  },
  {
    "key": "cover_image",
    "value": "cover_image"
  },
  {
    "key": "status",
    "value": "status"
  },
  {
    "key": "contains_course",
    "value": "contains_course"
  },
  {
    "key": "objectives",
    "value": "objectives"
  },
  {
    "key": "objects",
    "value": "objects"
  },
  {
    "key": "requests",
    "value": "requests"
  },
  {
    "key": "category",
    "value": "category"
  },
  {
    "key": "type",
    "value": "type"
  },
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
  id: "6785dc14d6d51abef2b11863",
} as const;

export type GetListCourseUserJoinedConfig = typeof GET_LIST_COURSE_USER_JOINED;