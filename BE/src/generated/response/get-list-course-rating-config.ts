export const GET_LIST_COURSE_RATING = {
  _id: "67a341d403679925e42bb711",
  title: "get list course rating",
  method: "get-list",
  locale: null,
  locale_id: null,
  outputEntity: [
  "6780ca7ca78c4e63fee5ab77"
],
  queryAdvance: `[
  {
    "$match": {
      "course": "@param:course_id"
    }
  },
  {
    "$addFields": {
      "course": {
        "$map": {
          "input": "$course",
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
      "from": "mge-courses",
      "localField": "course",
      "foreignField": "_id",
      "as": "course"
    }
  },
  {
    "$lookup": {
      "from": "user-tenant-profile",
      "localField": "created_by",
      "foreignField": "user",
      "pipeline": [
        {
          "$match": {
            "tenant_id": "@header:x-tenant-id"
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
          "$unwind": {
            "path": "$user",
            "preserveNullAndEmptyArrays": true
          }
        },
        {
          "$project": {
            "_id": "$user",
            "full_name": 1,
            "featured_image": "$profile.course.featured_image"
          }
        }
      ],
      "as": "user"
    }
  },
  {
    "$sort": {
      "created_at": -1
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

export type GetListCourseRatingConfig = typeof GET_LIST_COURSE_RATING;