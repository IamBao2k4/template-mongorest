export const GET_DETAIL_COURSE_TENANT_STATISTIC = {
  _id: "681b148a49a3d92b87430168",
  title: "get detail course tenant statistic",
  method: "get-detail",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6740251baefaffc3e4662e6b"
],
  queryAdvance: `[
    {
    "$addFields": {
      "tenant_id": {
        "$toString": "$_id"
      }
    }
  },
  {
    "$match":{
      "tenant_id":"@header:x-tenant-id"
    }
  },
  {
    "$lookup": {
      "from": "mge-courses",
      "localField": "tenant_id",
      "foreignField": "tenant_id",
      "as": "total_course"
    }
  },
  {
    "$addFields": {
      "total_course": {
        "$size": "$total_course"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-courses",
      "localField": "tenant_id",
      "foreignField": "tenant_id",
      "pipeline": [
        {
          "$match": {
            "status": "active"
          }
        }
      ],
      "as": "total_course_active"
    }
  },
  {
    "$addFields": {
      "total_course_active": {
        "$size": "$total_course_active"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-courses",
      "localField": "tenant_id",
      "foreignField": "tenant_id",
      "pipeline": [
        {
          "$match": {
            "status": "inactive"
          }
        }
      ],
      "as": "total_course_inactive"
    }
  },
  {
    "$addFields": {
      "total_course_inactive": {
        "$size": "$total_course_inactive"
      }
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "tenant_id",
      "foreignField": "tenant_id",
      "as": "total_tenant_user"
    }
  },
  {
    "$addFields": {
      "total_tenant_user": {
        "$size": "$total_tenant_user"
      }
    }
  },
  {
    "$lookup": {
      "from": "mge-user-learning-path",
      "localField": "tenant_id",
      "foreignField": "tenant_id",
      "as": "total_learning_path"
    }
  },
  {
    "$addFields": {
      "total_learning_path": {
        "$size": "$total_learning_path"
      }
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "tenant_id",
      "foreignField": "tenant_id",
      "pipeline":[
        {
          "$match":{
            "is_active":true
          }
        }
      ],
      "as": "user_metrics"
    }
  },
  {
    "$project": {
      "_id": 1,
      "total_course": 1,
      "total_course_active": 1,
      "total_course_inactive": 1,
      "total_tenant_user": 1,
      "total_learning_path": 1,
      "user_metrics.user":1
    }
  }
]`,
  categories: [],
  tenant_id: "677f6b3da3131eb0d3f9906d",
  documents: [],
  body: null,
  params: [],
  headers: [],
  restricted: [
  {
    "key": "total_course",
    "value": "total_course"
  },
  {
    "key": "total_course_active",
    "value": "total_course_active"
  },
  {
    "key": "total_course_inactive",
    "value": "total_course_inactive"
  },
  {
    "key": "total_tenant_user",
    "value": "total_tenant_user"
  },
  {
    "key": "total_learning_path",
    "value": "total_learning_path"
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
  id: "681b148a49a3d92b87430168",
} as const;

export type GetDetailCourseTenantStatisticConfig = typeof GET_DETAIL_COURSE_TENANT_STATISTIC;