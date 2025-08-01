export const ISUSERHASFULLPERMISSION = {
  _id: "6854ea8fced3311bbefc6bd9",
  title: "is-user-has-full-permission",
  entity: [
  "6740251baefaffc3e4662e6b"
],
  data: {},
  required: [],
  queryMongodb: `{}`,
  locale: null,
  locale_id: null,
  tenant_id: "677f6b3da3131eb0d3f9906d",
  advance: `[
  {
    "$addFields": {
      "_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match": {
      "_id": "@header:x-tenant-id"
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-level-mapping",
      "localField": "course_setting.full_permission",
      "foreignField": "tenant_level",
      "as": "user_tenant_mapping"
    }
  },
  {
    "$project": {
      "user_tenant_mapping.user": 1
    }
  },
  {
    "$unwind": {
      "path": "$user_tenant_mapping",
      "preserveNullAndEmptyArrays": true
    }
  },
  {
    "$addFields": {
      "user_tenant_mapping.user": {
        "$map": {
          "input": "$user_tenant_mapping.user",
          "as": "u",
          "in": {
            "$toObjectId": "$$u"
          }
        }
      }
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "user_tenant_mapping.user",
      "foreignField": "_id",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id",
            "user": "@jwt:user.id"
          }
        }
      ],
      "as": "user_tenant_mapping"
    }
  },
  {
    "$match": {
      "user_tenant_mapping": {
        "$ne": []
      }
    }
  }
]`,
  documents: [],
  body: null,
  categories: [],
  headers: null,
  params: null,
} as const;

export type IsuserhasfullpermissionConfig = typeof ISUSERHASFULLPERMISSION;